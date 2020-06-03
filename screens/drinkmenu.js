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
import { MenuItem, Separator } from "../components/MenuItem";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import {SERVER_ID} from "../config/properties";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

import axios from "axios";

export default class drinkmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      toggleMode: false,
      toggleInput: false,
      value: "",
      sort: "All",
      result: [],
      newDrink: {},
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(-30),
      height: new Animated.Value(-30),
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_ID}dish/category/Drink`)
      .then((res) => {
        this.setState({ result: res.data});
      });
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params !== this.props.route.params) {
      axios
        .get(`${SERVER_ID}dish/category/Drink`)
        .then((res) => this.setState({ result: res.data }));
    } //chi  update lai UI khi newDrink nhan value moi (sau moi lan them do an moi)
  }

  
  toggleInputmode(text) {
    console.log(text);
    this.setState({ value: text });
    if (text) {
      this.state.toggleInput = true;
    } else this.state.toggleInput = false;
    if (this.state.toggleInput) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.btWidth, {
            toValue: 24,
            duration: 0,
          }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.btWidth, {
            toValue: 0,
            duration: 0,
          }),
        ]),
      ]).start();
    }
  }
  // chuyen doi giua cac che do
  toggleEditMode() {
    if (!this.state.toggleMode) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, {
            toValue: 40,
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
            toValue: -30,
            duration: 0,
          }),
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

  // edit
  edit() {
    this.state.result.push(route.params.table);
  }
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={{ ...styles.overlayContainer, marginTop: 130 }}>
          <SearchBar
            onChangeText={(text) => this.searchTable(text)}
            placeholder="Search"
            placeholderTextColor="#86939e"
            platform="android"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.SearchBar}
            placeholderTextColor={"#666"}
            value={this.state.value}
          />
          {/* <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.toggleEditMode();
              }}
              style={{
                height: 40,
                borderRadius: 10,
                width: 40,
                marginLeft: 350,
                backgroundColor: "blue",
              }}
            >
              <FontAwesome5
                name="edit"
                size={24}
                color="white"
                style={{
                  paddingTop: 5,
                  paddingLeft: 10,
                  paddingRight: 5,
                }}
              />
            </TouchableOpacity>
          </View> */}
          <FlatList
            data={this.state.result}
            keyExtractor={item=> item.name}
            renderItem={({ item }) => {
              return (
                <MenuItem
                  image={Background}
                  item={item}
                  //onPress={() => navigation.push("EditTable", { table: item })}
                  width={this.state.width}
                  right={this.state.right}
                  //height={this.state.height}
                />
              );
            }}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={() => <Separator />}
            ListFooterComponent={() => <Separator />}
          />
        </View>
      </ImageBackground>
    );
  }
};

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
    height: HEIGHT,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 10,
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