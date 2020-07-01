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
  Alert,
  Picker,
  Modal,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_ID } from "../config/properties";
import axios from "axios";
import { getCurrentDateTime } from "../config/util";
const { width: WIDTH } = Dimensions.get("window");
import Axios from "axios";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
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
    paddingVertical: 1,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "95%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopStartRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  modalContent: {
    width: WIDTH - 50,
    justifyContent: "center",
    padding: 15,
    fontSize: 16,
    // borderBottomWidth: 0.5,
  },
});

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      modalVisible: false,
      sort: "All",
    };
  }
  changeTable = () => {
    let table = {
      name: this.props.item.name,
      fullName: this.props.item.fullName,
      chairNum: this.props.item.chairNum,
      price: this.props.item.price,
      reserve_time: this.props.item.reserve_time,
      status: this.state.sort,
    };
    Axios.post(`${SERVER_ID}table/add`, table).then((res) => {
      this.props.navigation.setParams({
        action: {
          name: "deleteTable",
          msg: res.data,
          time: getCurrentDateTime(),
        },
      });
    });
  };
  render() {
    const { navigation, role, item } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableHighlight
            style={styles.centeredView}
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "all";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "reserved";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>Reserved</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "empty";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>Empty</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "full";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>Full</Text>
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        </Modal>
        <View>
          <Image source={this.props.image} style={styles.image} />
        </View>
        <TouchableOpacity
          style={{ ...styles.content }}
          onPress={(text) => {
            this.setState({ modalVisible: true });
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", width: "55%" }}>
              <Text style={styles.label}>Tên: </Text>
              <Text style={styles.title}> {item.fullName}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "20%" }}>
              <Text style={styles.label}>Số ghế: </Text>
              <Text style={styles.title}>{item.chairNum}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Giá: </Text>
            <Text style={styles.title}>{item.price}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Giờ đặt: </Text>
            <Text style={styles.title}>{item.reserve_time}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sublabel}>Trạng thái: </Text>
            <Text style={styles.subtitle}>{item.status}</Text>
          </View>
        </TouchableOpacity>
        {role === "QUANLY" && (
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
            <TouchableOpacity onPress={this.props.onPress}>
              <MaterialIcons name="edit" size={35} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Thông báo",
                  "Bạn chắc chắn muốn xóa không ?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        this.setState({ check: true });
                        axios
                          .delete(`${SERVER_ID}table/delete/${item.name}`)
                          .then((res) => {
                            navigation.setParams({
                              action: {
                                name: "deleteTable",
                                msg: res.data,
                                time: getCurrentDateTime(),
                              },
                            });
                          }); //delete table
                      },
                    },
                  ],
                  { cancelable: false }
                );
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
        )}
        {/* 
        <View style={styles.right}>
          <Ionicons name="ios-arrow-forward" color="#666" size={20} />
        </View> */}
      </View>
    );
  }
}
export const Separator = () => <View style={styles.separator} />;
