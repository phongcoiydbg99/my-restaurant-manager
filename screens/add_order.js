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
  SectionList,
} from "react-native";

import { MenuItem, Separator } from "../components/MenuItem";
import {
  List,
  ListItem,
  SearchBar,
  Overlay,
  Input,
} from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SERVER_ID } from "../config/properties";
import { SERVER_IMAGE_ID } from "../config/properties";
import Background from "../assets/Backgr-Login.jpg";
import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
import Response from "../components/Response";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getCurrentDateTime } from "../config/util";
import RowOrder from "../components/RowOrder";
import OrderItem from "../components/OrderItem";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      list_order:
        this.props.route.params.list_order != undefined
          ? this.props.route.params.list_order
          : [],
      table_dish: [],
      result: [],
      maincoursemenu: [],
      drinkmenu: [],
      dessertmenu: [],
      cmaincoursemenu: [],
      cdrinkmenu: [],
      cdessertmenu: [],
      menu: [],
      toogleMode: false,
      overlay: false,
      dishName: "",
      tableName:
        this.props.route.params.name != undefined
          ? this.props.route.params.name
          : "",
      visible: false,
      pickerVisible: false,
      update: "notDone",
      refresh: false,
      action: {},
      randNum: new Date().getTime(),
    };
  }
  componentDidMount() {
    
    axios.get(`${SERVER_ID}table/all`).then((res) => {
      this.setState({ result: res.data });
    });
    axios.get(`${SERVER_ID}dish/category/MainCourse`).then((res) => {
      this.setState({ maincoursemenu: res.data });
      this.setState({ cmaincoursemenu: res.data });
    });
    axios.get(`${SERVER_ID}dish/category/Drink`).then((res) => {
      this.setState({ drinkmenu: res.data });
      this.setState({ cdrinkmenu: res.data });
    });
    axios.get(`${SERVER_ID}dish/category/Dessert`).then((res) => {
      this.setState({ dessertmenu: res.data });
      this.setState({ cdessertmenu: res.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    
    
  }
  onRefresh = () => {
    this.setState({ refresh: !this.state.refresh });
  };
  order = () => {
    let check = 0;
    const { navigation } = this.props;
    if (this.state.tableName == "" || this.state.list_order.length == 0) {
      this.setState(
        (prevState) => ({
          ...prevState,
          action: {
            ...prevState.action,
            name: "formError",
            date: getCurrentDateTime(),
          },
        })
      );
    } else {
      this.state.list_order.forEach((item) => {
        let newOrder = {
          call_time: item.call_time != undefined ? item.call_time : getCurrentDateTime(),
          call_number: item.call_number,
        };
        axios
          .post(
            `${SERVER_ID}table_dish/add/${this.state.tableName}/${item.name}`,
            newOrder
          )
          .then(check++)
          .catch((err) => console.log(err));
      });
      if (check == this.state.list_order.length) {
        navigation.navigate("Orders",{action:{
          name: "postTable",
          date: getCurrentDateTime(),
          msg: "Order successful!",}})
       
        
        // var cloneTable = {};
        // axios
        //   .get(`${SERVER_ID}table/${this.state.tableName}`)
        //   .then((res) => {
        //     cloneTable = res.data;
        //     console.log(res.data);
        //     cloneTable.status = "full";
        //     if (cloneTable.reserve_time == null)
        //       cloneTable.reserve_time = getCurrentDateTime();
        //     console.log(cloneTable);
        //     console.log(cloneTable);
        //     axios.put(
        //       `${SERVER_ID}table/modify/${this.state.tableName}`,
        //       cloneTable
        //     );
        //   })
        //   .then(() => navigation.navigate("Orders", check));
      }
    }
  };
  addOrder = (data) => {
    let check = false;
    this.state.list_order.forEach((item) => {
      if (item.name == data.name) {
        check = true;
        item.call_number = data.call_number;
        console.log(this.state.list_order);
      }
    });
    if (!check) {
      this.state.list_order.push(data);
    }
  };
  deleteOrder = (k) => {
    this.state.list_order = this.state.list_order.filter(
      (item) => item.call_number > k
    );
    this.onRefresh();
    console.log(this.state.list_order);
  };
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible });
  };
  togglePicker = () => {
    this.setState({ pickerVisible: !this.state.pickerVisible });
  };
  searchTable(text) {
    this.state.maincoursemenu = this.state.cmaincoursemenu.filter(
      (table) => table.name.split(text).length > 1
    );
    this.state.drinkmenu = this.state.cdrinkmenu.filter(
      (table) => table.name.split(text).length > 1
    );
    this.state.dessertmenu = this.state.cdessertmenu.filter(
      (table) => table.name.split(text).length > 1
    );
    this.setState({ value: text });
  }
  render() {
    const { navigation, route } = this.props;
    
    this.state.menu = [
      {
        title: "Maincoure",
        data: this.state.maincoursemenu,
      },
      {
        title: "Drink",
        data: this.state.drinkmenu,
      },
      {
        title: "Dessert",
        data: this.state.dessertmenu,
      },
    ];
    this.state.result = this.state.result.filter(
      (item) => item.status != "full"
    );
    return (
      <ImageBackground source={Background} style={styles.container}>
        <Response action={this.state.action} />
        <View style={styles.overlayContainer}>
          <View>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.labelStyle}>Choose table: </Text>
            <View
              style={{
                backgroundColor: "#fff",
                width: 100,
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {this.state.tableName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.order}
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
            <TouchableOpacity
              onPress={this.togglePicker}
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
              <MaterialCommunityIcons
                name="table-plus"
                size={24}
                color="#f02a4b"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleOverlay}
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
              <MaterialIcons name="border-color" size={24} color="#f02a4b" />
            </TouchableOpacity>
          </View>
          {/* // Chon ban */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.pickerVisible}
          >
            <TouchableHighlight style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.inputClose}
                  onPress={() => {
                    this.togglePicker();
                  }}
                >
                  <Ionicons
                    name="md-close-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
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
                {this.state.result.map((item) => (
                  <View key={item.name}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: "center",
                        backgroundColor: "#fff",
                      }}
                      onPress={() => {
                        this.setState({ tableName: item.name });
                        this.togglePicker();
                      }}
                    >
                      <View>
                        <Image source={Background} style={styles.image} />
                      </View>
                      <View style={{ ...styles.content }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "55%" }}>
                            <Text style={styles.label}>Name: </Text>
                            <Text style={styles.title}>{item.fullName}</Text>
                          </View>
                          <View style={{ flexDirection: "row", width: "50%" }}>
                            <Text style={styles.label}>People: </Text>
                            <Text style={styles.title}>{item.chairNum}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.label}>Price: </Text>
                          <Text style={styles.title}>{item.price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </TouchableHighlight>
          </Modal>
          {/* // chon menu */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.visible}
          >
            <TouchableHighlight style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.inputClose}
                  onPress={() => {
                    this.toggleOverlay();
                    this.onRefresh();
                  }}
                >
                  <Ionicons
                    name="md-close-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
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
                <SectionList
                  sections={this.state.menu}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => {
                    var number = 0;
                    this.state.list_order.find((order) => {
                      if (order.name == item.name) {
                        number = order.call_number;
                      }
                    });
                    const imageURI =
                      `${SERVER_IMAGE_ID}` +
                      "public/" +
                      item.name +
                      ".png" +
                      "?random_number=" +
                      this.state.randNum;
                    return (
                      <RowOrder
                        image={imageURI}
                        item={item}
                        addOrder={this.addOrder}
                        deleteOrder={this.deleteOrder}
                        modal={true}
                        number={number}
                      />
                    );
                  }}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                  )}
                />
              </View>
            </TouchableHighlight>
          </Modal>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ ...styles.labelStyle, marginBottom: 10, marginTop: 10 }}
            >
              Order:{" "}
            </Text>
            <FlatList
              data={this.state.list_order}
              extraData={this.state}
              key={this.state.list_order.length}
              keyExtractor={(item) => {
                return `${item.name}` + `${item.call_number}`;
              }}
              renderItem={({ item, index }) => {
                const imageURI =
                  `${SERVER_IMAGE_ID}` +
                  "public/" +
                  item.name +
                  ".png" +
                  "?random_number=" +
                  this.state.randNum;
                return (
                  <RowOrder
                    image={imageURI}
                    item={item}
                    addOrder={this.addOrder}
                    deleteOrder={this.deleteOrder}
                    buttonView={true}
                  />
                );
              }}
            />
          </View>
          {/* <Text>{JSON.stringify(this.state.list_order, null, 2)}</Text> */}
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
    flex: 5,
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  label: {
    margin: 8,
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
  logo: {
    width: 150,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // borderRadius: 5,
  },
  searchBarContainer: {
    backgroundColor: "#ececec",
    height: 50,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    margin: 5,
  },
  SearchBar: {
    height: 30,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  modalView: {
    width: "100%",
    height: "70%",
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
  inputClose: {
    alignItems: "flex-end",
    padding: 10,
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
  labelStyle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
  },
  inputStyle: {
    color: "#fff",
  },
  btnBack: {
    margin: 10,
    padding: 15,
    width: 50,
  },
  elementForm: {
    marginTop: 10,
    flexDirection: "row",
  },
  btnSubmit: {
    marginTop: 10,
    width: "60%",
    backgroundColor: "#ff1",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
});
