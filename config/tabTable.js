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

import { createStackNavigator } from "@react-navigation/stack";
import Table from "../screens/table";
import EditTable from "../screens/edit_table";
import AddTable from "../screens/add_table.js";
import Background from "../assets/Backgr-Login.jpg";
const Tab = createStackNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Table"
        component={Table}
        options={{
          // headerShown: false,
          headerTitle: false,
          headerTransparent: true,
          headerStyle: {
            height: 70,
          },
          //headerStatusBarHeight: 20,
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
        name="EditTable"
        component={EditTable}
        options={{
          headerShown: false,
          headerTitle: false,
          headerTransparent: true,
          headerStyle: {
            height: 80,
            opacity: 0.9,
          },
          //headerStatusBarHeight: 20,
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
        name="AddTable"
        component={AddTable}
        options={{
          headerShown: false,
          headerTitle: false,
          headerTransparent: true,
          headerStyle: {
            height: 80,
            opacity: 0.9,
          },
          //headerStatusBarHeight: 20,
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