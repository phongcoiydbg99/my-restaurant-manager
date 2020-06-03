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
import { Separator } from "../components/Row";
import Row from "../components/Row";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import FloatingButton from "../components/FloatingButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modal-datetime-picker";
import { Input } from "react-native-elements";

import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
import Response from "../components/Response"
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {getCurrentDateTime} from "../config/util"
import { SERVER_ID } from "../config/properties";

import Background from "../assets/Backgr-Login.jpg";

const { width: WIDTH } = Dimensions.get("window");

import axios from "axios";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addmodalVisible: false,
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
      right: new Animated.Value(0),
      
    };
  }
  editTable = (data) => {
    
  };
  deleteTable(name, check) {
    if (check)
      axios
        .delete(`${SERVER_ID}table/delete/${name}`)
        .then(this.setState({ delete: name }))
        .then(console.log(name));
  }
  componentDidMount() {
    const { navigation, route } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    // this.focusListener = navigation.addListener("focus", () => {
    //   // if (navigation.params != undefined )
    //   console.log(route.parmas);
    // });
    
    axios.get(`${SERVER_ID}table/all`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ table: res.data });
    
    });
  }
  componentDidUpdate(prevProps, prevState) {
    
    if (
      prevProps.route.params !== this.props.route.params
      //param nay chua thong tin table moi tu add_table
      //chi update neu params thay doi
    ) {
       
      
      axios.get(`${SERVER_ID}table/all`).then((res) => {
        
        //  this.toggleEditMode();
        this.setState({ table: res.data });
        this.setState({ result: res.data });
        
      });
    } //chi  update lai UI khi props.route.param nhan value moi (sau moi lan them do an moi)
  }
 
  toggleEditMode() {
    if (!this.state.toggleMode) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, { toValue: 60, duration: 0 }),
          Animated.timing(this.state.right, { toValue: 30, duration: 0 }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, { toValue: 0, duration: 0 }),
          Animated.timing(this.state.right, { toValue: 0, duration: 0 }),
        ]),
      ]).start();
    }
    this.state.toggleMode = !this.state.toggleMode;
  }
  // doi bang
  changeTable() {
    if (this.state.sort == "all") this.state.table = this.state.result;
    else if (this.state.sort == "reserved")
      this.state.table = this.state.result.filter(
        (table) => table.status == "reserved"
      );
    else if (this.state.sort == "full")
      this.state.table = this.state.result.filter(
        (table) => table.status == "full"
      );
    else
      this.state.table = this.state.result.filter(
        (table) => table.status == "empty"
      );
  }
  // search table
  searchTable(text) {
    this.state.table = this.state.result.filter(
      (table) => table.name.split(text).length > 1
    );
    this.setState({ value: text });
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
    const { navigation,route } = this.props;
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
        <Response action={JSON.stringify(route.params.action)} />
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
        <View style={styles.overlayContainer}>
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
          <FlatList
            data={this.state.table}
            keyExtractor={item=> item.name}
            renderItem={({ item, index }) => {
              return (
                <Row
                  image={Background}
                  item={item}
                  onPress={() =>
                    navigation.navigate("EditTable", {
                      editTable: this.editTable,
                      item: item,
                    })
                  }
                  width={this.state.width}
                  right={this.state.right}
                  index={index}
                  table={this}
                />
              );
            }}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={() => <Separator />}
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
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ modalVisible: true });
              this.toggleMenu();
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, sortStyle, opacity]}
            >
              <MaterialIcons name="sort" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleEditMode();
              this.toggleMenu();
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, editStyle, opacity]}
            >
              <FontAwesome5 name="edit" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleMenu();
              navigation.navigate("AddTable", { table: this });
              this.toggleEditMode();
              // this.setState({ addmodalVisible: true });
              
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
  logo: {
    width: 150,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
    //opacity: .5,
    marginTop: 70,
  },
  SearchBar: {
    height: 30,
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
  labelStyle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputStyle: {
    color: "#fff",
  },
  btnBack: {
    margin: 10,
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
});
