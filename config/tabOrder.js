import { Ionicons } from "@expo/vector-icons";
import {
  CardStyleInterpolators, createStackNavigator
} from "@react-navigation/stack";
import * as React from "react";
import {
  Image, StyleSheet, Text,






  TouchableOpacity, View
} from "react-native";
import AddOrder from "../screens/add_order";
import Bill from "../screens/bill";
import Order from "../screens/order";

const Tab = createStackNavigator();
export default () => {
  return (
    <Tab.Navigator
      options={{
        mode: "modal",
        headerMode: "float",
      }}
    >
      <Tab.Screen
        name="Orders"
        component={Order}
        initialParams={{ action: "" }}
        options={{
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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Tab.Screen
        name="AddOrder"
        component={AddOrder}
        initialParams={{ action: "" }}
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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
  btnBack: {
    paddingLeft: 15,
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
