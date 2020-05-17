import React from "react";
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
import Background from "../assets/Backgr-app.png";
import { overlay } from "react-native-paper";

export default () => {
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
       
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
    opacity: .9,
    borderColor: "#707070",
    borderWidth: 1,
    marginTop: 80,
  },
 
});