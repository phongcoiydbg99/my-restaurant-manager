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
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RowTable, Separator } from "../components/RowTable";

import Background from "../assets/Backgr-Login.jpg";
import { Ionicons } from "@expo/vector-icons";
import table from "../data/table";

const { width: WIDTH } = Dimensions.get("window");

export default ({ navigation,route }) => (
  <ImageBackground source={Background} style={styles.container}>
    <View style={styles.overlayContainer}>
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.pop()}>
        <Ionicons name="ios-arrow-back" size={30} color="white" />
      </TouchableOpacity>

      
    </View>
  </ImageBackground>
);
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  content: {
    width: WIDTH - 50,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3a3a3a",
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    marginTop: 2,
  },
  btnBack: {
    position: "absolute",
    top: 16,
    left: 20,
  },
});
