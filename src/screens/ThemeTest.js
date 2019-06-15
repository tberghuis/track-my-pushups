import React from "react";
import { Text, View, Button } from "react-native";
import { withTheme } from "react-native-elements";

function MyComponent(props) {
  // console.log("TCL: MyComponent -> props", props.updateTheme);
  const { theme, updateTheme } = props;
  return (
    <View>
      <Text style={{ backgroundColor: theme.colors.primary }}>Yo!</Text>
      <Button
        title="press me"
        onPress={() => updateTheme({ colors: { primary: "red" } })}
      />
    </View>
  );
  // return <Text style={{ color: theme.colors.primary }}>Yo!</Text>;
}

export default withTheme(MyComponent);
// export default MyComponent;
