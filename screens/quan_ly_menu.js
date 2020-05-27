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
  Alert,
} from "react-native";
import TabMenu from "../config/tabMenu";
import Background from "../assets/Backgr-Login.jpg";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

export default () => (
  <ImageBackground source={Background} style={styles.container}>
    <View style ={styles.overlayContainer}>
      <TabMenu />
    </View>
  </ImageBackground>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
  overlayContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
});
