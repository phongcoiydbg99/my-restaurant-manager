import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 400,
    height: 300,
    borderRadius: 15,
    shadowColor: "red",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 9,
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  content: {
    width: WIDTH - 40,
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
  separator: {
    // backgroundColor: "#ececec",
    // height: 1,
    padding: 5,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
  label: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3a3a3a",
  },
  sublabel: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 17,
    marginTop: 2,
  },
});

export const MenuItem = ({ image, item, onPress, width, right }) => (
         <TouchableOpacity style={styles.container} onPress={onPress}>
           <View>
             <Image source={image} style={styles.image} />
           </View>
           <View style={{ flexDirection: "row" }}>
             <Text style={styles.label}>Name: </Text>
             <Text style={styles.title}>{item.fullName}</Text>
           </View>
           <View style={{ flexDirection: "row" }}>
             <Text style={styles.label}>Price: </Text>
             <Text style={styles.title}>{item.price}</Text>
           </View>
         </TouchableOpacity>
       );

export const Separator = () => <View style={styles.separator} />;
