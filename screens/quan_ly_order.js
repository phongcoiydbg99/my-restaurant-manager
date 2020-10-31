import React from "react";
import {
  StyleSheet
} from "react-native";
import TabOrder from "../config/tabOrder";
export default () => <TabOrder />;
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
    backgroundColor: "rgba(60,50,41,0.59)",
  },
});
