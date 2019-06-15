import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StatusBar,
  StyleProp,
  TextStyle
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  createDrawerNavigator,
  createStackNavigator,
  SafeAreaView,
  createAppContainer
} from "react-navigation";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Track from "./screens/Track";
import Settings from "./screens/Settings";
import DevUtils from "./screens/DevUtils";
import MobxDemo from "./screens/MobxDemo";
import Graphs from "./screens/Graphs";
import withThemeProvider from "./withThemeProvider";

const TrackStackNavigator = createStackNavigator({
  Track: {
    screen: Track
  }
});

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: Settings
  }
});

const DrawerExample = createDrawerNavigator({
  Track: {
    screen: TrackStackNavigator
  },
  Settings: {
    screen: SettingsStackNavigator
  },
  Graphs: {
    screen: Graphs
  },
  DevUtils: {
    screen: DevUtils
  },
  MobxDemo: {
    screen: MobxDemo
  }
});

const MyApp = createAppContainer(DrawerExample);

// export default class App extends React.Component {
//   render() {
//     return <MyApp />;
//   }
// }

export default withThemeProvider(MyApp);
