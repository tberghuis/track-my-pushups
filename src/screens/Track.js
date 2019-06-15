import {
  WheelPicker,
  TimePicker,
  DatePicker
} from "react-native-wheel-picker-android";
import React, { Component } from "react";
import { Image, AppRegistry, StyleSheet, View, Alert } from "react-native";
import { Button, Text } from "react-native-elements";
import _range from "lodash/range";
import Icon from "react-native-vector-icons/Octicons";
import ThemeTest from "./ThemeTest";
import Slider from "react-native-slide-to-unlock";
import { initialisedDbPromise } from "../database/index";
import settings from "../database/Settings";
import startOfDay from "date-fns/start_of_day";
import { observer } from "mobx-react";
import { scheduleNotification } from "../NotifService";
import { observable, autorun } from "mobx";

const localState = observable({
  selectedWheelItemIndex: 0,
  progress: 0
});

// TODO mobx when
autorun(() => {
  if (settings.defaultNumReps) {
    localState.selectedWheelItemIndex = settings.defaultNumReps - 1;
    // TODO don't allow defaultNumReps = 0, do this validation in settings screen
  }
});

const MenuIcon = ({ openDrawer }) => {
  return (
    <Icon
      name="three-bars"
      size={30}
      color="#000"
      onPress={openDrawer}
      style={{ marginLeft: 20 }}
    />
  );
};

// cast to string, this component is wack
// component should give error when trying to use integers
// casting error in function

// TODO use functional component

@observer
class Track extends Component {
  constructor(props) {
    super(props);

    // do i need loading state? not for now

    // TODO remove this.state, replace with mobx
    // turn into functional component

    // just write in a bad way until i naturally know better

    // TODO refactor, progress is initialised on navigation to this screen
    initialisedDbPromise.then(async db => {
      const progressQueryPromise = db.executeSql(
        `select sum(reps) as progress from sets where completed_at >= ${startOfDay(
          new Date()
        ).valueOf()}`
      );
      // const progressQueryPromise = db.executeSql(
      //   `select sum(reps) as progress from sets where completed_at >= ${startOfDay(
      //     new Date()
      //   ).valueOf()}`
      // );
      const [progressResult] = await progressQueryPromise;
      let { progress } = progressResult.rows.item(0);
      if (!progress) {
        progress = 0;
      }
      // this.setState({ progress });
      localState.progress = progress;
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Track My Pushups",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      headerLeft: MenuIcon(navigation),
      headerRight: <View />
    };
  };

  onItemSelected = selectedWheelItemIndex => {
    // this.setState({ selectedWheelItemIndex });
    localState.selectedWheelItemIndex = selectedWheelItemIndex;
  };

  onSlideRight = async wheelPickerData => {
    //perform Action on slide success.
    // const numReps = +wheelPickerData[this.state.selectedWheelItemIndex];
    const numReps = +wheelPickerData[localState.selectedWheelItemIndex];
    const db = await initialisedDbPromise;
    db.executeSql(
      `insert into sets (reps, completed_at) values (${numReps},${Date.now()})`
    );
    // this.setState(state => ({ progress: state.progress + numReps }));
    localState.progress += numReps;

    // TODO schedule reminder/notification, clear existing

    if (localState.progress >= settings.dailyRepsTarget) {
      // TODO alert some congrats and a sound
      return;
    }

    scheduleNotification(settings.dailyRepsTarget - localState.progress);
  };

  render() {
    if (!settings.initialised) {
      return null;
    }

    const wheelPickerData = _range(1, settings.dailyRepsTarget + 1).map(
      num => "" + num
    );

    return (
      <View style={styles.screenContainer}>
        <Text h3>
          Daily Progress: {localState.progress}/{settings.dailyRepsTarget}
        </Text>
        <WheelPicker
          // selectedItem={this.state.selectedWheelItemIndex}
          selectedItem={localState.selectedWheelItemIndex}
          data={wheelPickerData}
          onItemSelected={this.onItemSelected}
        />
        <Slider
          onEndReached={() => this.onSlideRight(wheelPickerData)}
          containerStyle={{
            borderWidth: 1,
            borderColor: "red",
            margin: 8,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center"
          }}
          sliderElement={
            <View
              style={{
                width: 50,
                alignItems: "center",
                borderRadius: 5,
                height: 50,
                backgroundColor: "red"
              }}
            >
              <Icon name="chevron-right" size={50} color="#000" />
            </View>
          }
        >
          <Text h4>Slide to Log Set</Text>
        </Slider>
      </View>
    );
  }
}

module.exports = Track;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
