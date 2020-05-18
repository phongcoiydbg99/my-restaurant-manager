import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import dessertMenu from '../screens/menuscreens/dessertmenu';
import mainCourseMenu from '../screens/menuscreens/maincoursemenu';
import drinkMenu from '../screens/menuscreens/drinkmenu';
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

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
