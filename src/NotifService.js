import PushNotification from "react-native-push-notification";
import settings from "./database/Settings";
import { toJS } from "mobx";

const DELAYED_NOTIFICATION_ID = "2";

// TODO launch icon

// do i even really need this?
const onNotification = data => {
  console.log("TCL: data", data);
};

PushNotification.configure({
  onNotification
});

// TODO testing will it work on reboot

export function scheduleNotification(num_pushups_remaining) {
  console.log("scheduleNotification");

  // cancel all existing notifications
  PushNotification.cancelAllLocalNotifications();

  // grab latest delay setting from mobx

  // settings.notificationDelayMins is it not null, how to ensure.... await when settings.initialised ???

  // or i could just disable the UI until initialised is true. what is the common pattern?

  

  PushNotification.localNotificationSchedule({
    // TODO change to mins
    date: new Date(
      Date.now() + settings.notificationDelayMins * 60 * 1000
    ),

    id: DELAYED_NOTIFICATION_ID, // this is for the id for delayed notif
    autoCancel: true,

    title: "Track My Pushups reminder",
    message: `${num_pushups_remaining} pushups until daily target`, // (required)
    playSound: true,
    soundName: "default"
  });
}


export function scheduleDailyNotification() {
  
}
