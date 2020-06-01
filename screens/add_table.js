import React, { useState, useEffect } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Picker,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { YellowBox } from "react-native";
import { RowTable, Separator } from "../components/RowTable";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modal-datetime-picker";
import { CommonActions } from "@react-navigation/native";
import { Input } from "react-native-elements";

import Background from "../assets/Backgr-Login.jpg";
import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
import { Ionicons } from "@expo/vector-icons";
import table from "../data/table";
import axios from "axios";

import { SERVER_ID } from "../config/properties";
const { width: WIDTH } = Dimensions.get("window");

export default class AddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chairNum: "",
      status: "reserved",
      price: "",
      fullName: "",
      datetime: "",
      time: "",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    };
  }
  componentDidMount() {
    YellowBox.ignoreWarnings([
      "Non-serializable values were found in the navigation state",
    ]);
  }
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
  // useEffect(() => {
  //   hideDatePicker();
  //   hideTimePicker();
  // }, [isDatePickerVisible, isTimePickerVisible]);
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
  addTable = () => {
    const reserve = this.state.datetime + " " + this.state.time;
    const newTable = {
      ...table,
      name: this.state.name,
      chairNum: this.state.chairNum,
      status: this.state.status,
      price: this.state.price,
      fullName: this.state.fullName,
      reserve_time: reserve,
    };
    const { navigation, route } = this.props;
    console.log(route.params);
    route.params.table.saveNewData(newTable);
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={styles.overlayContainer}>
          <View style={{ paddingTop: 15, marginLeft: 10 }}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.pop()}
            >
              <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Input
            placeholder="Name"
            label="Name"
            labelStyle={styles.labelStyle}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <Input
            placeholder="fullName"
            label="fullName"
            labelStyle={styles.labelStyle}
            onChangeText={(text) => this.setState({ fullName: text })}
          />
          <Input
            placeholder="chairNum"
            label="chairNum"
            labelStyle={styles.labelStyle}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ chairNum: text })}
          />
          <Text
            style={{ ...styles.labelStyle, marginLeft: 10, marginBottom: 5 }}
          >
            Status
          </Text>
          <Picker
            mode={"dropdown"}
            selectedValue={this.state.status}
            style={{ marginHorizontal: 10, color: "#fff" }}
            onValueChange={(text) => this.setState({ status: text })}
          >
            <Picker.Item label="reserved" value="reserved" />
            <Picker.Item label="full" value="full" />
            <Picker.Item label="empty" value="empty" />
          </Picker>
          <Input
            placeholder="price"
            label="price"
            labelStyle={styles.labelStyle}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ price: text })}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Input
              inputContainerStyle={{ width: WIDTH - 100 }}
              placeholder="date"
              label="reserved_time"
              value={this.state.datetime}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
            <TouchableWithoutFeedback onPress={this.showDatePicker}>
              <View style={{ marginLeft: -60, marginTop: 25 }}>
                <Image source={icon} style={{ width: 30, height: 30 }}></Image>
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
              placeholder="time"
              value={this.state.time}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
            <TouchableWithoutFeedback onPress={this.showTimePicker}>
              <View style={{ marginLeft: -60, marginTop: 10 }}>
                <Image source={clock} style={{ width: 30, height: 30 }}></Image>
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
              style={styles.btnSubmit}
              onPress={() => this.addTable()}
            >
              <Text>ADD</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>{JSON.stringify(tableInfo, null, 2)}</Text> */}
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  content: {
    width: WIDTH - 50,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  labelStyle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputStyle: {
    color: "#fff",
  },
  title: {
    width: "20%",
    fontSize: 18,
    fontWeight: "600",
    color: "#3a3a3a",
    marginLeft: 10,
    marginTop: 10,
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    marginTop: 2,
  },
  btnBack: {
    margin: 10,
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
