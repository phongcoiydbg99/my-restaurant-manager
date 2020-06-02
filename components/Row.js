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
    backgroundColor: "#fff",
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
    color: "#3a3a3a",
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
    height: 4,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }
  render() {
    return (
      <TouchableOpacity onPress={console.log("h")} style={styles.container}>
        <Animated.View
          style={{
            width: this.props.width,
            // marginLeft: this.props.right,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={this.props.onPress}>
            <MaterialIcons name="edit" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ check: true });
              this.props.table.deleteTable(
                this.props.item.name,
                !this.state.check
              );
            }}
            style={{
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </Animated.View>
        <View>
          <Image source={this.props.image} style={styles.image} activeOpacity= '1' />
        </View>
        <View style={{ ...styles.content }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", width: "60%" }}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.title}> {this.props.item.fullName}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "20%" }}>
              <Text style={styles.label}>People: </Text>
              <Text style={styles.title}>{this.props.item.chairNum}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.title}>{this.props.item.price}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Time: </Text>
            <Text style={styles.title}>{this.props.item.reserve_time}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sublabel}>Status: </Text>
            <Text style={styles.title}>{this.props.item.status}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <Ionicons name="ios-arrow-forward" color="#666" size={20} />
        </View>
      </TouchableOpacity>
    );
  }
}

export const Separator = () => <View style={styles.separator} />;
