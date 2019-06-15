this is a react native app i built in order to track my daily pushups

goals of this app:
complete an app to add to my portfolio
improve strength by doing daily pushups

instructions how to build apk

have a generated keystore
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native

generate apk:

cd android
KEYSTORE=my-release-key.keystore KEY_ALIAS=my-key-alias KEYSTORE_PASSWORD=somepassword KEY_PASSWORD=somepassword ./gradlew assembleRelease

apk will be in android/app/build/outputs/apk/release/app-release.apk

TODO, add gifs of screenshots to this readme
