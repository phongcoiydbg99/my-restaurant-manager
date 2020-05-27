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

const { width: WIDTH } = Dimensions.get("window");

import BackAv from "../assets/Backgr-Login.jpg";
import Avatar from "../assets/avatar.jpg";
import employee from "../assets/worker.png";
import warehouse from "../assets/factory.png";
import salary from '../assets/payment.png';

export default ({ navigation }) => (
  <View style={styles.container}>
    <View style={{ marginTop: 70 }}>
      <View style={{ ...styles.header }}>
        <Image source={Avatar} style={styles.avatar}></Image>
        <Text style={styles.text}>Name</Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderWidth: 1,
          backgroundColor: "#222121",
        }}
      >
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress = {() => navigation.push('EmployeeManager')}style={styles.part}>
          <Image source={employee} style={styles.icon}></Image>
          <Text style={styles.text}>Employee Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.part}>
          <Image source={warehouse} style={styles.icon}></Image>
          <Text style={styles.text}>Warehouse Manager</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.part}>
          <Image source={salary} style={styles.icon}></Image>
          <Text style={styles.text}>Salary Manager</Text>
        </TouchableOpacity>
        <View style={styles.part}></View>
      </View>
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#2e2e2e",
    // opacity: 0.9,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "rgba(255,255,255,0.7)",
    margin: 10,
  },
  text: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  part: {
    backgroundColor: "#222121",
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: "45%",
  },
});
