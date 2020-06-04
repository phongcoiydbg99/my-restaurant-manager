import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_ID } from "../config/properties";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    //backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#ececec",
    // elevation: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    marginTop: 2,
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
  separator: {
    backgroundColor: "#fff",
    height: 2,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export const RowRevenue = ({ item , onPress}) => (
  
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
        <View style={{ ...styles.content }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", width: "82%" }}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}> {item.month}</Text>
            </View>
            
          </View>
          <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#9966FF', width: 60, height: 22,}}>
            <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>Money</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{item.money}đ</Text>
          </View>
          </View>
      </TouchableOpacity>
);

export const Separator = () => <View style={styles.separator} />;
