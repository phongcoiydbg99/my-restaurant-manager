import React from "react";
import {
  Dimensions, ImageBackground, StyleSheet, View
} from "react-native";
import Background from "../assets/Backgr-Login.jpg";
import TabMenu from "../config/tabMenu";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

export default () => (
  <ImageBackground source={Background} style={styles.container}>
    <View style={styles.overlayContainer}>
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
