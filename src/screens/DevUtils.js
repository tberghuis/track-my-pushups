import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import SQLite from "react-native-sqlite-storage";

import { initialisedDbPromise } from "../database/index";

// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

export default (DevUtils = () => {
  return (
    <View>
      <Button
        title="delete database"
        onPress={() => {
          console.log("hello world");
          SQLite.deleteDatabase("trackmypushups.db");
        }}
      />

      <Button
        title="table exist"
        onPress={async () => {
          console.log("table exist");
          const db = await initialisedDbPromise;

          try {
            const result = await db.executeSql("select * from notexist");
            console.log("TCL: default -> result", result);
          } catch (error) {
            console.log("error", error);
          }
          console.log("will it blend");
        }}
      />

      <Button
        title="table exist sqlite_master"
        onPress={async () => {
          console.log("table exist");
          const db = await initialisedDbPromise;

          try {
            // const result = await db.executeSql(
            //   `SELECT name FROM sqlite_master WHERE type='table' AND name='notexist'`
            // );
            const [result] = await db.executeSql(
              `SELECT * FROM sqlite_master WHERE type='table' AND name='table_name'`
            );
            console.log("result.rows.length", result.rows.length);
            // console.log("result1", result1);
          } catch (error) {
            console.log("error", error);
          }
          console.log("will it blend");
        }}
      />
    </View>
  );
});
