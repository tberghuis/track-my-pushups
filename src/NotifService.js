import PushNotification from "react-native-push-notification";
// import settings from "./database/Settings";
import { toJS } from "mobx";

const DAILY_REMINDER_ID = "1";
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

  // PushNotification.cancelAllLocalNotifications();
  PushNotification.cancelLocalNotifications({ id: DELAYED_NOTIFICATION_ID });

  // grab latest delay setting from mobx

  // settings.notificationDelayMins is it not null, how to ensure.... await when settings.initialised ???

  // or i could just disable the UI until initialised is true. what is the common pattern?

  PushNotification.localNotificationSchedule({
    // TODO change to mins
    date: new Date(Date.now() + settings.notificationDelayMins * 60 * 1000),

    id: DELAYED_NOTIFICATION_ID, // this is for the id for delayed notif
    autoCancel: true,

    title: "Track My Pushups reminder",
    message: `${num_pushups_remaining} pushups until daily target`, // (required)
    playSound: true,
    soundName: "default"
  });
}

// TODO call after DB first created, await initialisation
// call from settings screen after change
export function scheduleDailyReminder(reminderDate) {
  // cancel current scheduled reminders
  PushNotification.cancelLocalNotifications({ id: DAILY_REMINDER_ID });

  // schedule recurring reminders
  PushNotification.localNotificationSchedule({
    // TODO test if several days in the past, only one reminder notification pushed
    date: reminderDate,
    id: DAILY_REMINDER_ID, // this is for the id for delayed notif
    title: "Track My Pushups reminder",
    message: `daily reminder. finish what you started ${reminderDate.getTime()}`, // (required)
    playSound: true,
    soundName: "default",
    repeatType: "day"
  });
}
