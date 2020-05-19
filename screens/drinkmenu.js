import React from 'react';
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
import Background from "../assets/Backgr-Login.jpg";
import { NavigationContainer } from "@react-navigation/native";
export default () => (
    <ImageBackground
    source = {Background} style ={styles.container}
    >
      <View
      style = {styles.overlayContainer}
      ></View>
    </ImageBackground>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
})