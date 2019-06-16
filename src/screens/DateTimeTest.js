import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { observable } from "mobx";
import { observer } from "mobx-react";

import setMinutes from "date-fns/set_minutes";
import setHours from "date-fns/set_hours";
// import getMinutes from "date-fns/get_minutes";
// import getHours from "date-fns/get_hours";
import format from "date-fns/format";

var tmpdate = new Date();
tmpdate = setHours(tmpdate, 7);
tmpdate = setMinutes(tmpdate, 0);

const localState = observable({
  isDateTimePickerVisible: false,
  // do it wrong
  dailyNotificationDate: tmpdate
});

export default
@observer
class DateTimePickerTester extends Component {
  showDateTimePicker = () => {
    localState.isDateTimePickerVisible = true;
  };

  hideDateTimePicker = () => {
    localState.isDateTimePickerVisible = false;
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);

    // localState.dailyNotificationTimeHours = getHours(date);
    // localState.dailyNotificationTimeMinutes = getMinutes(date);

    localState.dailyNotificationDate = date;

    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        
        <Text>Daily reminder time: {format(localState.dailyNotificationDate, "HH:mm")}</Text>
        <Button title="Set reminder time" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={localState.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          // datePickerModeAndroid="spinner"
          mode="time"
          date={localState.dailyNotificationDate}
        />
      </View>
    );
  }
}
