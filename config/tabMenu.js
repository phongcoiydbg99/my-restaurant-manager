import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import dessertMenu from '../screens/dessertmenu';
import mainCourseMenu from '../screens/maincoursemenu';
import drinkMenu from '../screens/drinkmenu';
const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="MainCourse" component={mainCourseMenu} />
        <Tab.Screen name="Dessert" component={dessertMenu} />
        <Tab.Screen name="Drink" component={drinkMenu} />
      </Tab.Navigator>
  );
}
