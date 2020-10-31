import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from "react";
import {
  Image, StyleSheet, Text,






  TouchableOpacity, View
} from "react-native";
import Bill from "../screens/bill";
import billOfTable from '../screens/billOfTable';


const Tab = createStackNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="billOfTable"
        component={billOfTable}
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
        name="bill"
        component={Bill}
        options={({ navigation }) => ({
          headerTitle: false,
          headerTransparent: true,
          headerStyle: {
            height: 70,
          },
          //headerStatusBarHeight: 20,
          headerRight: (props) => <LogoTitle {...props} />,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.pop()}
            >
              <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View style={styles.header}>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

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
  btnBack: {
    padding: 15,
    width: 30,
    height: 30,
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