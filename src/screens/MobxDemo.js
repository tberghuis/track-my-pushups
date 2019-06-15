import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

import { observable } from "mobx";
import { observer } from "mobx-react";

// class Todo {
//   id = Math.random();
//   @observable title = "";
//   @observable finished = false;
// }

class Count {
  @observable count = 0;
}
// const obj = {
//   @observable count = 0;
// }

const countObj = new Count();

export default observer(
  (MobxDemo = () => {
    return (
      <View>
        <Text>count {countObj.count}</Text>
        <Button
          title="update count"
          onPress={() => {
            console.log("hello world");
            countObj.count++;
          }}
        />
      </View>
    );
  })
);
