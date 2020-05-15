import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { AuthContext } from "../context/context";

export default ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Text>Thong tin</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="SignOut" onPress={() => signOut()} />
    </View>
  );
};
