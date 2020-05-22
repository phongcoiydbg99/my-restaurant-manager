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
import billOfTable from '../screens/billOfTable'
import Bill from "../screens/bill";
const Tab = createStackNavigator();

export default () => {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="billOfTable" 
          component={billOfTable} 
          options={{
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
                  <Text > Restaurant</Text>
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="bill" 
          component={Bill} 
          options={{
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
                  {/* <Text style={styles.GBtype}>GB</Text>
                  <Text > Restaurant</Text> */}
                </Text>
              </View>
            ),
          }}
          />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#373534', 
    opacity: .7, 
    borderWidth: 1, 
    borderColor: '#707070',
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
});

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, marginRight: 12,}}
      source={require('../assets/gb1.png')}
    />
  );
}