import React from "react";
import SQLite from "react-native-sqlite-storage";
import {scheduleDailyReminder} from '../NotifService'

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

var database_name = "trackmypushups.db";
var database_version = "1.0";
// what is the database_displayname used for?
var database_displayname = "db";
var database_size = 200000;

let resolveInitialisedDb;

SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
).then(async db => {
  console.log("TCL: db", db);

  // create tables if not exist
  await initialiseFreshDb(db);

  // TODO migration logic

  resolveInitialisedDb(db);
});

// i don't think i need to reject as not passing in any new data
export const initialisedDbPromise = new Promise(function(resolve) {
  resolveInitialisedDb = resolve;
});

// ok so this is where i create a db

async function initialiseFreshDb(db) {
  // check if not fresh db
  const [result] = await db.executeSql(
    `SELECT * FROM sqlite_master WHERE type='table' AND name='sets'`
  );
  if (result.rows.length !== 0) {
    // assume db has been initialised
    return;
  }

  // TODO start the reminder from tomorrow
  // probably not the best place to kick this off
  // is there some fresh install hook provided by react native
  scheduleDailyReminder(new Date(1561064400000));
  

  // TODO proper migrations strategy


  // do i even need transactions... not at this stage

  const sql1 = `CREATE TABLE IF NOT EXISTS sets(
    set_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reps INTEGER,
    completed_at INTEGER)`;

  const sql2 = `CREATE TABLE IF NOT EXISTS settings(
    daily_reps_target INTEGER,
    default_num_reps INTEGER,
    notification_delay_mins INTEGER,
    daily_reminder_time INTEGER)`;

  const sql3 = `INSERT INTO settings (
    daily_reps_target,
    default_num_reps,
    notification_delay_mins,
    daily_reminder_time)
    VALUES (100, 10, 15, 1561064400000)`;

  const prom1 = db.executeSql(sql1);
  const prom2 = (async () => {
    await db.executeSql(sql2);
    return db.executeSql(sql3);
  })();

  await Promise.all([prom1, prom2]);
}
