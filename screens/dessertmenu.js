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

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
import { SERVER_ID } from "../config/properties";
import axios from "axios";

export default class dessertmenu extends Component {
  constructor(props){
    super(props);
    this.state ={
      modalVisible: false,
      toggleMode: false,
      toggleInput: false,
      value: "",
      sort: "All",
      result: [],
      newDessert: {},
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(-30),
      height: new Animated.Value(-30),
    };
  }
  componentDidMount() {
    axios.get(`${SERVER_ID}dish/category/Dessert`).then((res) => {
      this.setState({ result: res.data });
    });
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newDessert !== this.state.newDessert) {
      axios
        .get(`${SERVER_ID}dish/category/Dessert`)
        .then((res) => this.setState({ result: res }));
    } //chi  update lai UI khi newDrink nhan value moi (sau moi lan them do an moi)
  }

  saveNewData() {
    //ham nay se duoc invoke khi save du lieu moi
    axios
      .post(`${SERVER_ID}dish/add`, data)
      .then((res) => console.log(res))
      .then(this.setState({ newDessert: data }));
    //sau khi thuc hien post thanh cong va tra ve response, set lai state cua NewDrink
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
  // changeTable() {
  //   if(this.state.sort == 'All') this.state.result = table
  //   else if (this.state.sort == 'Ready') this.state.result = table.filter((table) => table.status == "Ready");
  //   else this.state.result = table.filter((table) => table.status == "Empty");
  // }
  // edit
  edit(){
    this.state.result.push(route.params.table);
  }
  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={{ ...styles.overlayContainer, marginTop: 130 }}>
          <View style={{ marginTop: 10 }}>
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
          </View>
          <View style={{ ...styles.contentContainer, height: 40 }}>
            <View style={styles.content}>
              <View style={{ width: "10%" }}>
                <Text style={styles.title}>ID</Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text style={styles.title}>Name</Text>
              </View>
              <View style={{ width: "15%" }}>
                <Text style={styles.title}>Price</Text>
              </View>
              <Animated.View
                style={{
                  width: this.state.width,
                  marginRight: this.state.right,
                }}
              >
                <Text style={styles.subtitle}>Edit</Text>
              </Animated.View>
            </View>
          </View>
          <View
            style={{
              height: 400,
            }}
          >
            <FlatList
              data={this.state.result}
              keyExtractor={(item) => {
                return `${item.name}`;
              }}
              renderItem={({ item }) => {
                return (
                  <MenuItem
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
});