import React from "react";
import { Button, View } from "react-native";

export default ({ navigation }) => (
  <View>
    <Button title="SignIn" onPress={() => navigation.push("SignIn")} />
    <Button title="SignUp" onPress={() => navigation.push("SignUp")} />
  </View>
);
