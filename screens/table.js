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
import { Row, Separator } from "../components/Row";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import FloatingButton from "../components/FloatingButton";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { SERVER_ID } from "../config/properties";

import Background from "../assets/Backgr-Login.jpg";

const { width: WIDTH } = Dimensions.get("window");

import axios from "axios";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      toggleMode: false,
      toggleInput: false,
      value: "",
      sort: "All",
      result: [],
      table: [],
      newTable: {},
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(-30),
    };
  }

  componentDidMount() {
    axios.get(`${SERVER_ID}table/all`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ table: res.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newTable !== this.state.newTable) {
      axios.get(`${SERVER_ID}table/all`).then((res) => {
        this.setState({ table: res.data });
        this.setState({ result: res.data });
      });
    } //chi  update lai UI khi newTable nhan value moi (sau moi lan them do an moi)
  }

  saveNewData() {
    //ham nay se duoc invoke khi save du lieu moi
    axios
      .post(`${SERVER_ID}table/add`, data)
      .then((res) => console.log(res))
      .then(this.setState({ newTable: data }));
    //sau khi thuc hien post thanh cong va tra ve response, set lai state cua NewTable
    //luc nay componentDidUpdate se so sanh state moi va state cu, dong thoi thuc hien call api nhu tren
  }
  // chuyen doi che do nhap
  toggleInputmode(text) {
    console.log(text);
    this.setState({ value: text });
    if (text) {
      this.state.toggleInput = true;
    } else this.state.toggleInput = false;
    if (this.state.toggleInput) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.btWidth, { toValue: 24, duration: 0 }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.btWidth, { toValue: 0, duration: 0 }),
        ]),
      ]).start();
    }
  }
  // chuyen doi giua cac che do
  toggleEditMode() {
    if (!this.state.toggleMode) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, { toValue: 40, duration: 0 }),
          Animated.timing(this.state.right, { toValue: 0, duration: 0 }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, { toValue: 0, duration: 0 }),
          Animated.timing(this.state.right, { toValue: -30, duration: 0 }),
        ]),
      ]).start();
    }
    this.state.toggleMode = !this.state.toggleMode;
  }
  // Xoa Text
  deleteText() {
    this.setState({ value: "" });
    this.toggleInputmode("");
  }
  // doi bang
  changeTable() {
    if (this.state.sort == "all") this.state.table = this.state.result;
    else if (this.state.sort == "Ready")
      this.state.table = this.state.result.filter(
        (table) => table.status == "Ready"
      );
    else
      this.state.table = this.state.result.filter(
        (table) => table.status == "empty"
      );
  }
  // floating button
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
    const { navigation } = this.props;

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
      <ImageBackground source={Background} style={styles.container}>
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
                  this.state.sort = "ready";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>Ready</Text>
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
            </View>
          </TouchableHighlight>
        </Modal>
        <View style={styles.overlayContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Search"}
              value={this.state.value}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              underLineColorAndroid="transparent"
              onChangeText={(text) => this.toggleInputmode(text)}
            />
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={styles.inputIcon}
            />
            <Animated.View
              style={{
                ...styles.inputClose,
                width: this.state.btWidth,
              }}
            >
              <TouchableOpacity onPress={() => this.deleteText()}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <FlatList
            data={this.state.table}
            keyExtractor={(item) => {
              return `${item.name}`;
            }}
            renderItem={({ item }) => {
              return (
                <Row
                  image={Background}
                  item={item}
                  onPress={() => navigation.push("EditTable", { table: item })}
                  width={this.state.width}
                  right={this.state.right}
                />
              );
            }}
            ItemSeparatorComponent={Separator}
            // ListHeaderComponent={() => <Separator />}
            ListFooterComponent={() => <Separator />}
          />
        </View>
        <View
          style={{
            ...styles.floatinContainer,
            bottom: 70,
            right: 40,
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            this.setState({ modalVisible: true });
             this.toggleMenu();
          }}>
            <Animated.View
              style={[styles.button, styles.floating, sortStyle, opacity]}
            >
              <MaterialIcons name="sort" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.toggleEditMode()}>
            <Animated.View
              style={[styles.button, styles.floating, editStyle, opacity]}
            >
              <FontAwesome5 name="edit" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.push("AddTable");
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
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(60,50,41,0.59)",
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
    // width: WIDTH - 110,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 70,
  },
  logo: {
    width: 150,
    height: 200,
  },
  input: {
    width: WIDTH - 140,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 1)",
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
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
  inputClose: {
    position: "absolute",
    top: 8,
    right: 5,
  },
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
