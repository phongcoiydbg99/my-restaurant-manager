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
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import { SeparatorMenu } from "../components/MenuItem";
import { Input } from "react-native-elements";
import MenuItem from "../components/MenuItem";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Response from "../components/Response";
import { getCurrentDateTime } from "../config/util";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { SERVER_ID } from "../config/properties";
import { SERVER_IMAGE_ID } from "../config/properties";
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
      image: null,
      randNum: new Date().getTime(),
      role: "",
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_ID}dish/category/${this.props.category}`)
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          result: res.data,
          menu: res.data,
        }));
      }).finally(()=>{
      AsyncStorage.getItem('user').then(user=>{
        let user1 = JSON.parse(user);
        this.setState({role:user1.quyen_han});
      });
    });
      // .catch((err) => console.log("Dish error : " + err))
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.model);
    if ("" != this.state.model) {
      axios.get(`${SERVER_ID}dish/category/${this.props.category}`).then((res) => {
        this.setState(
        (prevState) => ({
          ...prevState,
          result: res.data ,
          menu: res.data ,
           model: "",
           modalHeader: "" ,
        }));
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
  // searchMenu(text) {
  //   this.state.menu = this.state.result.filter(
  //     (menu) => menu.name.split(text).length > 1
  //   );
  //   console.log(this.state.result);
  //   this.setState({ value: text });
  // }
  updateSearch = (search) => {
    const newData = this.state.result.filter((item) => {
      const itemData = `${item.fullName.toUpperCase()}`;
      const textData = search.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      menu: newData,
      search,
    });
  };
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
        price: this.state.price,
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
            fetch(`${SERVER_IMAGE_ID}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              // send our base64 string as POST request
              body: JSON.stringify({
                imgsource: this.state.image.base64,
                name: newMenu.name,
              }),
            });
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
            fetch(`${SERVER_IMAGE_ID}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              // send our base64 string as POST request
              body: JSON.stringify({
                imgsource: this.state.image.base64,
                name: newMenu.name,
              }),
            });
            this.setState({ modalVisible: false , randNum: new Date().getTime()});
          })
          .catch((err) => console.log(err));
      }
    }
    // this.setState({ modalVisible: false });
  }

  pickImageLibrary = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!results.cancelled) {
      this.setState({ image: results });
    }
  };
  askForPermission = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== "granted") {
      Alert.alert("no permissions to access camera!", [{ text: "ok" }]);
      return false;
    }
    return true;
  };
  pickImageCamera = async () => {
    // make sure that we have the permission
    const hasPermission = await this.askForPermission();
    if (!hasPermission) {
      return;
    } else {
      // launch the camera with the following settings
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // make sure a image was taken:
      if (!image.cancelled) {
        this.setState({ image: image });
      }
    }
  };

  render() {
    const {search} = this.state;
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
                    {this.state.modalHeader == "EDIT" ? "Sửa" : "Thêm"} Menu
                  </Text>
                </View>
                <View style={styles.modalBody}>
                  <Input
                    placeholder="Mã món ăn"
                    label="Mã món ăn :"
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                  />
                  <Input
                    placeholder="Tên món ăn"
                    label="Tên món ăn :"
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    value={this.state.fullName}
                    onChangeText={(text) => this.setState({ fullName: text })}
                  />
                  <Input
                    placeholder="Giá"
                    label="Giá :"
                    value={this.state.price}
                    labelStyle={styles.labelStyle}
                    inputStyle={styles.inputstyle}
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ price: text })}
                  />
                  <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <View
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "#ececec",
                      }}
                    >
                      {this.state.image && (
                        <Image
                          source={{ uri: this.state.image.uri }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                      {!this.state.image && this.state.modalHeader == "EDIT" && (
                        <Image
                          source={{
                            uri:
                              `${SERVER_IMAGE_ID}` +
                              "public/" +
                              this.state.name +
                              ".png",
                          }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <TouchableOpacity
                        onPress={this.pickImageCamera}
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
                        <AntDesign name="camera" size={24} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.pickImageLibrary}
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
                        <MaterialIcons
                          name="photo-library"
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.elementForm}>
                    <TouchableOpacity
                      style={styles.btnSubmit}
                      onPress={() => this.changeMenu()}
                    >
                      <Text>
                        {this.state.modalHeader == "EDIT" ? "Sửa" : "Thêm"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </Modal>
          <SearchBar
            onChangeText={this.updateSearch}
            placeholder="Search"
            placeholderTextColor="#86939e"
            platform="android"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.SearchBar}
            placeholderTextColor={"#666"}
            value={search}
          />
          {this.state.role === "QUANLY" && (
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
          )}

          <View
            style={
              this.state.role === "QUANLY"
                ? styles.contentContainer
                : { ...styles.contentContainer, height: HEIGHT+90 }
            }
          >
            <FlatList
              data={this.state.menu}
              keyExtractor={(item) => {
                return `${item.name}`;
              }}
              renderItem={({ item }) => {
                const imageURI =
                  `${SERVER_IMAGE_ID}` +
                  "public/" +
                  item.name +
                  ".png" +
                  "?random_number=" +
                  this.state.randNum;
                return (
                  <MenuItem
                    image={imageURI}
                    item={item}
                    base64={this.state.base64}
                    onPress={() => {
                      this.setState({
                        modalVisible: true,
                        modalHeader: "EDIT",
                        name: item.name,
                        fullName: item.fullName,
                        price: item.price.toString(),
                      });
                      // this.setState({ modalHeader: "EDIT" });
                      // this.setState({ name: item.name });
                      // this.setState({ fullName: item.fullName });
                      // this.setState({ price: item.price.toString() });
                    }}
                    delete={() => {
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
                            onPress: () =>
                              axios
                                .delete(`${SERVER_ID}dish/delete/${item.name}`)
                                .then((res) => {
                                  this.setState(
                                    (prevState) => ({
                                      ...prevState,
                                      model: "delete",
                                      action: {
                                        ...prevState.action,
                                        name: "deleteTable",
                                        date: getCurrentDateTime(),
                                        msg: "Delete Menu",
                                      },
                                    }),
                                    () => console.log(this.state.action)
                                  );
                                }),
                          },
                        ],
                        { cancelable: false }
                      );
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    // alignItems: "center",
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
