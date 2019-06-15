import React from "react";
import { View } from "react-native";
import { Text, Input } from "react-native-elements";
import settings from "../database/Settings";
import { observer } from "mobx-react";
import { observable, when } from "mobx";

// i need to rewrite with localState

const localState = observable({
  notificationDelayMins: null,
  dailyRepsTarget: null,
  defaultNumReps: null
});

// const initialiseLocalState = async

async function initialiseLocalState() {
  await when(() => settings.initialised);
  localState.notificationDelayMins = settings.notificationDelayMins;
  localState.dailyRepsTarget = settings.dailyRepsTarget;
  localState.defaultNumReps = settings.defaultNumReps;
}
initialiseLocalState();

// autorun sql update in db class after change from onblur

@observer
export default class Settings extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  onChangedNotificationDelayMins = text => {
    text = text.replace(/[^0-9]/g, "");
    if (+text > 1440) {
      // alert max delay 1440
      // this is all future details
      return;
    }
    localState.notificationDelayMins = +text;
  };
  onBlurNotificationDelayMins = () => {
    settings.notificationDelayMins = localState.notificationDelayMins;
  };

  onChangedDailyRepsTarget = text => {
    text = text.replace(/[^0-9]/g, "");
    localState.dailyRepsTarget = +text;
  };
  onBlurDailyRepsTarget = () => {
    settings.dailyRepsTarget = localState.dailyRepsTarget;
  };

  onChangedDefaultNumReps = text => {
    text = text.replace(/[^0-9]/g, "");
    localState.defaultNumReps = +text;
  };
  onBlurDefaultNumReps = () => {
    // only update if > 1
    settings.defaultNumReps = localState.defaultNumReps;
  };

  render() {
    return (
      <View>
        <View>
          <Text h4>Functionality Coming Soon...</Text>
          <Text h4 />
          <Text h4>Daily Reps Target</Text>
          <Input
            keyboardType="numeric"
            value={"" + localState.dailyRepsTarget}
            onChangeText={this.onChangedDailyRepsTarget}
            onBlur={this.onBlurDailyRepsTarget}
          />
          <Text h4>default num reps</Text>
          <Input
            keyboardType="numeric"
            value={"" + localState.defaultNumReps}
            onChangeText={this.onChangedDefaultNumReps}
            onBlur={this.onBlurDefaultNumReps}
          />
          <Text h4>notification delay minutes</Text>
          <Input
            keyboardType="numeric"
            value={"" + localState.notificationDelayMins}
            onChangeText={this.onChangedNotificationDelayMins}
            onBlur={this.onBlurNotificationDelayMins}
          />
          <Text h4>daily notification time</Text>
        </View>
      </View>
    );
  }
}
