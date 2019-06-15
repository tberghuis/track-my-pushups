import { observable, autorun } from "mobx";
import { initialisedDbPromise } from "./index";

// TODO input validation on settings screen

class Settings {
  @observable dailyRepsTarget = null;
  @observable defaultNumReps = null;
  @observable notificationDelayMins = null;

  @observable initialised = false;

  // do it wrong
  // have an update method for each column

  // i am not doing everything purely the correct mobx way where the view is entirely reactive.
  // UI events like onblur directly alter state


}

const settings = new Settings();


// TODO i should probably export initialisedSettingsPromise
// that way i do not have to worry about nulls in other places
export default settings;

async function initialiseFromDb() {
  const db = await initialisedDbPromise;

  const [settingsResult] = await db.executeSql(
    `select daily_reps_target, default_num_reps, notification_delay_mins from settings`
  );

  const {
    daily_reps_target,
    default_num_reps,
    notification_delay_mins
  } = settingsResult.rows.item(0);

  settings.dailyRepsTarget = daily_reps_target;
  settings.defaultNumReps = default_num_reps;
  settings.notificationDelayMins = notification_delay_mins;

  settings.initialised = true;

  // TODO here call autorun update function
  autorun(updateDbOnChange);
}

initialiseFromDb();

// basically when anything change, autorun insert into db

let firstRun = true;
async function updateDbOnChange() {
  let dailyRepsTarget = settings.dailyRepsTarget;
  let defaultNumReps = settings.defaultNumReps;
  let notificationDelayMins = settings.notificationDelayMins;
  if (firstRun) {
    firstRun = false;
    return;
  }
  // update db
  const db = await initialisedDbPromise;
  const updateResult = await db.executeSql(
    `UPDATE settings SET 
      daily_reps_target = ${dailyRepsTarget},
      default_num_reps = ${defaultNumReps},
      notification_delay_mins = ${notificationDelayMins}`
  );
}
