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
import dessertMenu from '../screens/dessertmenu';
import mainCourseMenu from '../screens/maincoursemenu';
import drinkMenu from '../screens/drinkmenu';
import Background from "../assets/Backgr-Login.jpg";
const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
      <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 13, fontWeight: 'bold' },
        //tabStyle: { width: 100 },
        style: { 
          backgroundColor: '#FFFFFF' ,
          marginTop: 80,
        },
        
      }}
     >
        <Tab.Screen name="MainCourse" component={mainCourseMenu} />
        <Tab.Screen name="Dessert" component={dessertMenu} />
        <Tab.Screen name="Drink" component={drinkMenu} />
      </Tab.Navigator>
  );
}
