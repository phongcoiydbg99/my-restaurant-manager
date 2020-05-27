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
import { TableItem, Separator } from "../components/TableItem";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Background from "../assets/Backgr-Login.jpg";
import table from "../data/table";

const { width: WIDTH } = Dimensions.get("window");
// const [modalVisible, setModalVisible] = useState(false);
// const [isEdit, setEdit] = useState(false);
// const [left, setleft] = useState(0);
// const [right, setright] = useState(0);
// const navigation = useNavigation();

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      toggleMode: false,
      toggleInput: false,
      value: "",
      sort: "All",
      result: table,
      btWidth: new Animated.Value(0),
      width: new Animated.Value(0),
      right: new Animated.Value(-30),
    };
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
    if (this.state.sort == "All") this.state.result = table;
    else if (this.state.sort == "Ready")
      this.state.result = table.filter((table) => table.status == "Ready");
    else this.state.result = table.filter((table) => table.status == "Empty");
  }
  // edit
  edit() {
    this.state.result.push(route.params.table);
  }
  render() {
    const { navigation } = this.props;

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
                  this.state.sort = "All";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "Ready";
                  this.changeTable();
                }}
                style={styles.modalContent}
              >
                <Text>Ready</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.state.sort = "Empty";
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
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              justifyContent: "space-around",
            }}
          >
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
                style={{ ...styles.inputClose, width: this.state.btWidth }}
              >
                <TouchableOpacity onPress={() => this.deleteText()}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={{ marginLeft: 5 }}>
              <TouchableOpacity
                onPress={() => navigation.push("AddTable")}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: "#00cfff",
                }}
              >
                <MaterialIcons
                  name="add"
                  size={30}
                  color="white"
                  style={{
                    padding: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleEditMode();
                }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: "#00ccff",
                }}
              >
                <FontAwesome5
                  name="edit"
                  size={24}
                  color="white"
                  style={{
                    paddingVertical: 5,
                    paddingLeft: 10,
                    paddingRight: 5,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: "yellow",
                }}
              >
                <MaterialIcons
                  name="sort"
                  size={30}
                  color="black"
                  style={{
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 480,
            }}
          >
            <View style={{ ...styles.contentContainer, height: 40 }}>
              <View style={styles.content}>
                <View style={{ width: "20%" }}>
                  <Text style={styles.title}>ID</Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={styles.title}>Table</Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={styles.title}>People</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.subtitle}>Status</Text>
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
            <FlatList
              data={this.state.result}
              keyExtractor={(item) => {
                return `${item.id}`;
              }}
              renderItem={({ item }) => {
                return (
                  <TableItem
                    item={item}
                    onPress={() =>
                      navigation.push("EditTable", { table: item })
                    }
                    width={this.state.width}
                    right={this.state.right}
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 20,
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
    // width: WIDTH - 110,
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
