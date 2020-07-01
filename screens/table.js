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
import Response from "../components/Response";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { authContext } from "../context/context";
import FloatingButton from "../components/FloatingButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modal-datetime-picker";
import { Input } from "react-native-elements";

import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentDateTime } from "../config/util";
import { SERVER_ID } from "../config/properties";

import Background from "../assets/Backgr-Login.jpg";
import BackgroundTable from "../assets/table.png";

const { width: WIDTH } = Dimensions.get("window");

import axios from "axios";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addmodalVisible: false,
      modalVisible: false,
      bookModalVisible: false,
      toggleMode: false,
      toggleInput: false,
      value: "",
      sort: "All",
      result: [],
      table: [],
      emptyTable: [],
      newTable: {},
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(0),
      datetime: "",
      time: "",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      pickerVisible: false,
      guestName: "",
      numeric: "",
      email: "",
      tableName: "",
      action: {},
    };
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
      this.setState({
        emptyTable: res.data.filter((table) => table.status == "empty"),
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.route.params !== this.props.route.params 
      ||
      prevState.action !== this.state.action
      //param nay chua thong tin table moi tu add_table
      //chi update neu params thay doi
    ) {
      // console.log('act:' + JSON.stringify(this.props.route.params.action));
      axios.get(`${SERVER_ID}table/all`).then((res) => {
        //  this.toggleEditMode();
        this.setState({ table: res.data });
        this.setState({ result: res.data });
        this.setState({
          emptyTable: res.data.filter((table) => table.status == "empty"),
        });
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
  // searchTable(text) {
  //   this.state.table = this.state.result.filter(
  //     (table) => table.name.split(text).length > 1
  //   );
  //   this.setState({ value: text });
  // }
  updateSearch = (search) => {
    const newData = this.state.result.filter((item) => {
      const itemData = `${item.fullName.toUpperCase()}`;
      const textData = search.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      table: newData,
      search,
    });
  };

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
  togglePicker = () => {
    this.setState({ pickerVisible: !this.state.pickerVisible });
  };
  toShortFormat = (date) => {
    var month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    date = new Date(date);
    var day = date.getDate();
    var month_index = date.getMonth();
    var year = date.getFullYear();

    return "" + day + "-" + month_names[month_index] + "-" + year;
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };
  handleConfirm = (date) => {
    const d = this.toShortFormat(date);
    this.setState({ datetime: d });
    this.setState({ isDatePickerVisible: false });
  };
  handleConfirmTime = (date) => {
    date = new Date(date);
    const t =
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    this.setState({ time: t });
    this.setState({ isTimePickerVisible: false });
  };
  bookTable = () => {
    if(this.state.email == "" || this.state.tableName == ""  || this.state.guestName == "" || this.state.reservedTime == ""
       || this.state.phoneNum == ""){
      this.setState(prevState=>({
          ...prevState,
          action:{
            ...prevState.action,
            name:'formError',
            date: getCurrentDateTime()
          }
      }));
      //this.setState({action:'formError',actionTime:getCurrentDateTime()});
      
    }else{
    const reserve = this.state.datetime + " " + this.state.time;
    let newReserver = {
      orderId: 1299,
      tableName: this.state.tableName,
      phoneNum: this.state.phoneNum,
      email: this.state.email,
      guestName: this.state.guestName,
      reservedTime: reserve,
    };
    axios
      .post(`${SERVER_ID}reserved/add`, newReserver)
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          action: {
            ...prevState.action,
            name: "postTable",
            date: getCurrentDateTime(),
            msg: "Đặt bàn thành công",
          },
        }));
      })
      .then(() => {
        this.setState({ bookModalVisible: false });
      })
      .catch((err) => console.log(err));
    }
  }
  render() {
    const {search} = this.state;
    const { navigation,route } = this.props;
    // const { authInfo } = React.useContext(authContext);
    // console.log(authInfo.user);
    const bookStyle = {
      transform: [
        {
          scale: this.animation,
        },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -260],
          }),
        },
      ],
    };
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
        <Response action={this.state.action} />
        {/* Modal chọn sort */}
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
        {/* modal chon ban */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.pickerVisible}
        >
          <TouchableHighlight style={styles.centeredView}>
            <View style={styles.modalTableView}>
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
                containerStyle={{
                  ...styles.searchBarContainer,
                  marginTop: 40,
                  backgroundColor: "#ececec",
                }}
                inputContainerStyle={styles.SearchBar}
                placeholderTextColor={"#666"}
                value={this.state.value}
              />
              {this.state.emptyTable.map((item) => (
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
        {/* Modal booktable */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.bookModalVisible}
        >
          <TouchableHighlight
            style={styles.centeredView}
            onPress={() => {
              this.setState({ bookModalVisible: false });
            }}
          >
            <View style={styles.modalView}>
              <View
                style={{
                  height: "8%",
                  width: "95%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#cececc",
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  Đặt bàn
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...styles.labelStyle, marginLeft: 10 }}>
                  Choose table:{" "}
                </Text>
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    borderBottomWidth: 1,
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
              </View>
              <Input
                placeholder="Tên khách hàng"
                label="Tên khách hàng :"
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputstyle}
                value={this.state.guestName}
                onChangeText={(text) => this.setState({ guestName: text })}
              />
              <Input
                placeholder="Số điện thoại"
                label="Số điện thoại :"
                value={this.state.phoneNum}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputstyle}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ phoneNum: text })}
              />
              <Input
                placeholder="Email"
                label="Email :"
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputstyle}
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Input
                  inputContainerStyle={{ width: WIDTH - 100 }}
                  placeholder="Ngày đặt"
                  label="Thời gian đặt :"
                  value={this.state.datetime}
                  labelStyle={styles.labelStyle}
                  inputStyle={styles.inputStyle}
                />
                <TouchableWithoutFeedback onPress={this.showDatePicker}>
                  <View style={{ marginLeft: -60, marginTop: 25 }}>
                    <Image
                      source={icon}
                      style={{ width: 30, height: 30 }}
                    ></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Input
                  inputContainerStyle={{ width: WIDTH - 100 }}
                  placeholder="Giờ đặt"
                  value={this.state.time}
                  labelStyle={styles.labelStyle}
                  inputStyle={styles.inputStyle}
                />
                <TouchableWithoutFeedback onPress={this.showTimePicker}>
                  <View style={{ marginLeft: -60, marginTop: 10 }}>
                    <Image
                      source={clock}
                      style={{ width: 30, height: 30 }}
                    ></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              <DateTimePickerModal
                isVisible={this.state.isTimePickerVisible}
                mode="time"
                onConfirm={this.handleConfirmTime}
                onCancel={this.hideTimePicker}
              />
              <View style={styles.elementForm}>
                <TouchableOpacity
                  style={{ ...styles.btnSubmit }}
                  onPress={() => this.bookTable()}
                >
                  <Text>Đặt bàn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
        {/* --------------------------------- */}
        <View style={styles.overlayContainer}>
          <Response action={route.params.action} />
          <SearchBar
            onChangeText={this.updateSearch}
            placeholder="Search"
            placeholderTextColor="#86939e"
            platform="android"
            containerStyle={{ ...styles.searchBarContainer, marginTop: 70 }}
            inputContainerStyle={styles.SearchBar}
            placeholderTextColor={"#666"}
            value={search}
          />
          <FlatList
            data={this.state.table}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => {
              return (
                <Row
                  image={BackgroundTable}
                  item={item}
                  onPress={() =>
                    navigation.navigate("AddTable", {
                      action: {
                        name: "editTable",
                        time: getCurrentDateTime(),
                      },
                      item: item,
                    })
                  }
                  width={this.state.width}
                  right={this.state.right}
                  index={index}
                  navigation={this.props.navigation}
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
            right: WIDTH / 2,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleMenu();
              this.setState({ bookModalVisible: true });
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, bookStyle, opacity]}
            >
              <AntDesign name="book" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleMenu();
              this.setState({ modalVisible: true });
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
              navigation.navigate("AddTable", {
                item: {
                  name: "",
                  fullName: "",
                  chairNum: "",
                  status: "",
                  price: "",
                  reserve_time: "",
                },
                action: { name: "addTable", time: getCurrentDateTime() },
              });
              // this.toggleEditMode();
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    height: 50,
    //opacity: .5,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  SearchBar: {
    height: 30,
  },
  modalView: {
    width: "95%",
    height: "80%",
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
  modalTableView: {
    width: "95%",
    height: "65%",
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
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputStyle: {
    color: "#000",
  },
  btnBack: {
    margin: 10,
  },
  elementForm: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    alignItems:"center",
    justifyContent:"center",
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
