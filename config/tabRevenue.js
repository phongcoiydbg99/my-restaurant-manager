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

import {createStackNavigator} from '@react-navigation/stack'
import Revenue from '../screens/revenue'
import RevenueStatistics from '../screens/revenueStatistics'
import FavoriteFood from '../screens/favoriteFood'
import { Ionicons } from "@expo/vector-icons";

const Tab = createStackNavigator();

export default () => {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="revenue" 
          component={Revenue} 
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
          name="revenueStatistics" 
          component={RevenueStatistics} 
          options={({navigation}) => ({
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
                  onPress = {() => navigation.pop()}
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
          <Tab.Screen 
          name="favoriteFood" 
          component={FavoriteFood} 
          options={({navigation}) => ({
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
                  onPress = {() => navigation.pop()}
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
    color: '#ffffff', 
    fontSize: 25, 
    marginTop: 35, 
    marginBottom: 15, 
    marginLeft: 12, 
    fontStyle: 'italic'
  },
  GBtype: {
    fontWeight: 'bold',
  },
  btnBack: {
    marginLeft: 15,
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