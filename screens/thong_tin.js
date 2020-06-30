import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import TabProfile from '../config/tabProfile'

import { AuthContext } from "../context/context";
import { authContext } from "../context/context";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation }) => {
  // let { authInfo, setInfo } = React.useContext(authContext);
  return (
    <TabProfile />
  );
};
