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
  FlatList,
  Modal,
  CheckBox,
  Picker,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import { SeparatorMenu } from "../components/MenuItem";
import { Input } from "react-native-elements";
import MenuItem from "../components/MenuItem";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Response from "../components/Response";
import { getCurrentDateTime } from "../config/util";
import { SERVER_ID } from "../config/properties";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

import axios from "axios";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalHeader: "",
      toggleMode: false,
      value: "",
      result: [],
      menu: [],
      newMain: {},
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(-40),
      height: new Animated.Value(-30),
      name: "",
      fullName: "",
      price: "",
      action: {},
      model: "",
    };
  }
  componentDidMount() {
    axios.get(`${SERVER_ID}dish/category/${this.props.category}`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ menu: res.data });
    }).catch(err => console.log('Dish error : ' + err));
  }
  componentDidUpdate(prevProps, prevState) {
    if ("" != this.state.model) {
      axios.get(`${SERVER_ID}dish/category/${this.props.category}`).then((res) => {
        this.setState({ result: res.data });
        this.setState({ menu: res.data });
        this.setState({ model: "" });
        this.setState({ modalHeader: "" });
      }).catch(err => console.log('Dish error : ' + err));
    } //chi  update lai UI khi newDrink nhan value moi (sau moi lan them do an moi)
  }

  saveNewData(data) {
    //ham nay se duoc invoke khi save du lieu moi
    axios
      .post(`${SERVER_ID}dish/add`, data)
      .then((res) => console.log(res))
      .then(this.setState({ newDrink: data }));
    //sau khi thuc hien post thanh cong va tra ve response, set lai state cua NewDrink
    //luc nay componentDidUpdate se so sanh state moi va state cu, dong thoi thuc hien call api nhu tren
  }
  // chuyen doi giua cac che do
  toggleEditMode() {
    if (!this.state.toggleMode) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, {
            toValue: 80,
            duration: 0,
          }),
          Animated.timing(this.state.right, {
            toValue: 0,
            duration: 0,
          }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(this.state.right, {
            toValue: -40,
            duration: 0,
          }),
        ]),
      ]).start();
    }
    this.state.toggleMode = !this.state.toggleMode;
  }
  searchMenu(text) {
    this.state.menu = this.state.result.filter(
      (menu) => menu.name.split(text).length > 1
    );
    console.log(this.state.result);
    this.setState({ value: text });
  }
  changeMenu() {
    if (
      this.state.name == "" ||
      this.state.fullName == "" ||
      this.state.price == ""
    ) {
      this.setState(
        (prevState) => ({
          ...prevState,
          model: "change",
          action: {
            ...prevState.action,
            name: "formError",
            date: getCurrentDateTime(),
          },
        }),
        () => console.log(this.state.action)
      );
    } else {
      let newMenu = {
        name: this.state.name,
        pirce: this.state.price,
        fullName: this.state.fullName,
        foodCategory: this.props.category,
      };
      let newData = {};
      if (this.state.modalHeader == "ADD") {
        //thuc hien post data
        axios
          .post(`${SERVER_ID}dish/add`, newMenu)
          .then((res) => {
            this.setState(
              (prevState) => ({
                ...prevState,
                model: "change",
                action: {
                  ...prevState.action,
                  name: "postTable",
                  date: getCurrentDateTime(),
                  msg: "Add menu",
                },
              }),
              () => console.log(this.state.action)
            );
          })
          .then(() => {
            //post xong data
            this.setState({ modalVisible: false });
          })
          .catch((err) => console.log(err));
      } else if (this.state.modalHeader == "EDIT") {
        //modify data
        axios
          .put(`${SERVER_ID}dish/modify/${this.state.name}`, newMenu)
          .then((res) => {
            this.setState(
              (prevState) => ({
                ...prevState,
                model: "change",
                action: {
                  ...prevState.action,
                  name: "postTable",
                  date: getCurrentDateTime(),
                  msg: "Edit menu",
                },
              }),
              () => console.log(this.state.action)
            );
          })
          .then(() => {
            //post xong data
            this.setState({ modalVisible: false });
          })
          .catch((err) => console.log(err));
      }
    }
    // this.setState({ modalVisible: false });
  }
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <Response action={this.state.action} />
        <View style={{ ...styles.overlayContainer, marginTop: 130 }}>
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
                <View
                  style={{
                    ...styles.modalHeader,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ececec",
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.labelStyle}>
                    {this.state.modalHeader}
                  </Text>
                </View>
                <View style={styles.modalBody}>
                  <Input
                    placeholder="Name"
                    label="Name"
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                  />
                  <Input
                    placeholder="fullName"
                    label="fullName"
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    value={this.state.fullName}
                    onChangeText={(text) => this.setState({ fullName: text })}
                  />
                  <Input
                    placeholder="price"
                    label="price"
                    value={this.state.price}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ price: text })}
                  />
                  <View style={styles.elementForm}>
                    <TouchableOpacity
                      style={styles.btnSubmit}
                      onPress={() => this.changeMenu()}
                    >
                      <Text>{this.state.modalHeader}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Modal>
          <SearchBar
            onChangeText={(text) => this.searchMenu(text)}
            placeholder="Search"
            placeholderTextColor="#86939e"
            platform="android"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.SearchBar}
            placeholderTextColor={"#666"}
            value={this.state.value}
          />
          <View
            style={{
              marginVertical: 10,
              marginLeft: 10,
              flexDirection: "row-reverse",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.toggleEditMode();
              }}
              style={{
                height: 40,
                borderRadius: 10,
                width: 40,
                marginLeft: 10,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="edit" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: true });
                this.setState({ modalHeader: "ADD" });
              }}
              style={{
                height: 40,
                borderRadius: 10,
                width: 40,
                marginLeft: 10,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="plus" size={24} color="#f02a4b" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <FlatList
              data={this.state.menu}
              keyExtractor={(item) => {
                return `${item.name}`;
              }}
              renderItem={({ item }) => {
                return (
                  <MenuItem
                    image={Background}
                    item={item}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                      this.setState({ modalHeader: "EDIT" });
                      this.setState({ name: item.name });
                      this.setState({ fullName: item.fullName });
                      this.setState({ price: item.pirce.toString() });
                    }}
                    delete={() => {
                      axios
                        .delete(`${SERVER_ID}dish/delete/${item.name}`)
                        .then((res) => {
                          this.setState(
                            (prevState) => ({
                              ...prevState,
                              model: "change",
                              action: {
                                ...prevState.action,
                                name: "deleteTable",
                                date: getCurrentDateTime(),
                                msg: "Delete Menu",
                              },
                            }),
                            () => console.log(this.state.action)
                          );
                        });
                    }}
                    width={this.state.width}
                    right={this.state.right}
                  />
                );
              }}
              ItemSeparatorComponent={SeparatorMenu}
              ListHeaderComponent={() => <SeparatorMenu />}
              ListFooterComponent={() => <SeparatorMenu />}
            />
            <View style={{ marginBottom: 10 }}></View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    bottom: 130,
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    // opacity: 0.9,
  },
  overlayContainer: {
    width: WIDTH,
    marginBottom: 90,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  contentContainer: {
    width: WIDTH,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
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
  inputContainer: {
    width: WIDTH - 110,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  logo: {
    width: 150,
    height: 200,
  },
  input: {
    width: "60%",
    height: 45,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 1)",
    marginHorizontal: 25,
  },
  elementForm: {
    marginTop: 10,
    flexDirection: "row",
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  inputStyle: {
    color: "#fff",
  },
  btnSubmit: {
    marginTop: 10,
    width: "60%",
    backgroundColor: "#ff6600",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    width: WIDTH - 50,
    justifyContent: "center",
    padding: 15,
    fontSize: 16,
    // borderBottomWidth: 0.5,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
    //opacity: .5,
  },
  SearchBar: {
    height: 30,
  },
});
