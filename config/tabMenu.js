import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import dessertMenu from "../screens/dessertmenu";
import drinkMenu from "../screens/drinkmenu";
import mainCourseMenu from "../screens/maincoursemenu";

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
      <Tab.Screen name="MainCourse" component={mainCourseMenu} />
      <Tab.Screen name="Dessert" component={dessertMenu} />
      <Tab.Screen name="Drink" component={drinkMenu} />

    </Tab.Navigator>
  );
};
