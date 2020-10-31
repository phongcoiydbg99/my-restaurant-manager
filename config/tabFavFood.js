import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import dessertFav from "../screens/dessertFav";
import drinkFav from "../screens/drinkFav";
import mainCourseFav from "../screens/mainCourseFav";

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
