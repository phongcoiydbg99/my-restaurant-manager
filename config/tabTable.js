import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListTable from "../screens/list_table";
import ListOrder from "../screens/list_order";
import Background from "../assets/Backgr-Login.jpg";
const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 13, fontWeight: "bold" },
        //tabStyle: { width: 100 },
        style: {
          backgroundColor: "#FFFFFF",
          marginTop: 80,
        },
      }}
    >
      <Tab.Screen name="ListTable" component={ListTable} />
      <Tab.Screen name="ListOrder" component={ListOrder} />
    </Tab.Navigator>
  );
};
