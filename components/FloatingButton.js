import React, { useState, Component } from "react";
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
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  CheckBox,
  Picker,
  Animated,
} from "react-native";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default class FloatingButton extends React.Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
    }).start();

    this.open = !this.open;
  };
  render() {
    const sortStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200],
          }),
        },
      ],
    };
    const editStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };
    const addStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };
    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"],
          }),
        },
      ],
    };
    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });
    return (
      <View
        style={{
          ...styles.floatinContainer,
          bottom: 70,
          right: 40,
        }}
      >
        <TouchableWithoutFeedback onPress={() => alert("sds")}>
          <Animated.View
            style={[styles.button, styles.floating, sortStyle, opacity]}
          >
            <MaterialIcons name="sort" size={20} color="#f02a4b" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => alert("sds")}>
          <Animated.View
            style={[styles.button, styles.floating, editStyle, opacity]}
          >
            <FontAwesome5 name="edit" size={20} color="#f02a4b" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            this.props.add();
            this.toggleMenu();
          }}
        >
          <Animated.View
            style={[styles.button, styles.floating, addStyle, opacity]}
          >
            <AntDesign name="plus" size={20} color="#f02a4b" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => this.toggleMenu()}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="plus" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatinContainer: {
    alignItems: "center",
    position: "absolute",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#f02a4b",
    shadowOpacity: 1,
    shadowOffset: { height: 10 },
    elevation: 3,
  },
  menu: {
    backgroundColor: "#f02a4b",
  },
  floating: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
});
