import React, { Component } from "react";
import { Button, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { observable } from "mobx";
import { observer } from "mobx-react";

const localState = observable({
  isDateTimePickerVisible: false
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
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={localState.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}
