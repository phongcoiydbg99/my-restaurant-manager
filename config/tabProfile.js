import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {
  Image, StyleSheet, Text, View
} from "react-native";
import EmployeeManager from "../screens/employee_manager";
import Profile from "../screens/profile";

const Tab = createStackNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerStyle: {
            height: 70,
          },
          headerRight: (props) => <LogoTitle {...props} />,
          headerBackground: () => (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                <Text style={styles.GBtype}>GB</Text>
                <Text> Restaurant</Text>
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="EmployeeManager"
        component={EmployeeManager}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#373534",
    opacity: 0.7,
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 25,
    marginTop: 35,
    marginBottom: 15,
    marginLeft: 12,
    fontStyle: "italic",
  },
  GBtype: {
    fontWeight: "bold",
  },
});

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35, marginRight: 12 }}
      source={require("../assets/gb1.png")}
    />
  );
}
