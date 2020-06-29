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
import dessertFav from "../screens/dessertFav";
import mainCourseFav from "../screens/mainCourseFav";
import drinkFav from "../screens/drinkFav";
const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 13, fontWeight: "bold", color: "white" },
        style: {
          backgroundColor: "transparent",
          marginTop: 80,
        },
      }}
    >
      <Tab.Screen name="MainCourse" component={mainCourseFav} /> 
      <Tab.Screen name="Dessert" component={dessertFav} /> 
      <Tab.Screen name="Drink" component={drinkFav} />
      
    </Tab.Navigator>
  );
};
