import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React from "react";
import {
  Animated, Image,
  StyleSheet, Text,


  TouchableOpacity, View
} from "react-native";
import Avatar from '../assets/avaa.png';
import { SERVER_ID } from "../config/properties";
import { getCurrentDateTime } from "../config/util";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    padding: 20,
    borderBottomColor: "#ececec",
    // elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    backgroundColor: "#ececec",
    paddingVertical: 10,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export default class RowCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }
  render() {
    const { navigation, item } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={{ ...styles.content }}>
          {/* <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", width: "55%" }}>
                <Text style={styles.label}>Khách hàng: </Text>
                <Text style={styles.title}> {item.guestName}</Text>
              </View>
              <View style={{ flexDirection: "row", width: "40%" }}>
                <Text style={styles.label}>Số điện thoại: </Text>
                <Text style={styles.title}>{item.phoneNum}</Text>
              </View>
            </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image source={Avatar} style={styles.image} />
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Khách hàng: </Text>
                <Text style={styles.title}> {item.guestName}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Số điện thoại: </Text>
                <Text style={styles.title}>{item.phoneNum}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.title}>
                  {item.email === null ? "null" : item.email}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Thời gian: </Text>
                <Text style={styles.title}>{item.reservedTime}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Bàn: </Text>
                <Text style={styles.title}>{item.tableName}</Text>
              </View>
            </View>
          </View>
        </View>
        <Animated.View
          style={{
            width: this.props.width,
            marginLeft: -20,
            marginRight: this.props.right,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={this.props.onEdit}>
            <MaterialIcons name="edit" size={35} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ check: true });
              axios
                .delete(`${SERVER_ID}table/delete/${this.props.item.name}`)
                .then((res) => {
                  navigation.setParams({
                    action: {
                      name: "deleteTable",
                      msg: res.data,
                      time: getCurrentDateTime(),
                    },
                  });
                }); //delete table
            }}
            style={{
              marginLeft: 10,
              marginRight: 20,
            }}
          >
            <MaterialCommunityIcons
              name="delete-forever"
              size={35}
              color="red"
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.right}>
          <Ionicons name="ios-arrow-forward" color="#666" size={20} />
        </View>
      </TouchableOpacity>
    );
  }
}