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
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
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
  separator: {
    backgroundColor: "#ececec",
    height: 2,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export default class Row extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }
  render(){
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <View>
          <Image source={this.props.image} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.item.fullName}</Text>
          <Text style={styles.title}>{this.props.item.chairNum}</Text>
          <Text style={styles.title}>{this.props.item.reserve_time}</Text>
          <Text style={styles.subtitle}>{this.props.item.status}</Text>
        </View>
        <Animated.View
          style={{
            width: this.props.width,
            marginRight: this.props.right,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={this.props.onPress}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => {
                this.setState({check : true});
                this.props.table.deleteTable(this.props.item.name, !this.state.check);
              }
            }
          >
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.right}>
          <Ionicons name="ios-arrow-forward" color="#666" size={20} />
        </View>
      </TouchableOpacity>
    );
  }
};

export const Separator = () => <View style={styles.separator} />;
