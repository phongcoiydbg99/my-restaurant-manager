
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React from "react";
import {
  Dimensions, Image, ImageBackground,






  Picker,
  ScrollView, StyleSheet, Text,






  TouchableOpacity,
  TouchableWithoutFeedback, View, YellowBox
} from "react-native";
import { Input } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Background from "../assets/Backgr-Login.jpg";
import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
import Response from "../components/Response";
import { SERVER_ID } from "../config/properties";
import { getCurrentDateTime } from "../config/util";
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
      action: {},
      mode: "",
    };
  }
  componentDidMount() {
    YellowBox.ignoreWarnings([
      "Non-serializable values were found in the navigation state",
    ]);
    console.log(this.props.route.params.action);
    let act = this.props.route.params.action;
    let item = this.props.route.params.item;
    //ca 2 th add va edit deu gui thong tin table qua param (vs th add thi ttin table null)
    console.log(item);
    console.log(act);
    this.setState(
      {
        mode: act.name,
        name: item.name,
        fullName: item.fullName,
        chairNum: item.chairNum.toString(),
        status: item.status,
        price: item.price.toString(),
        reserve_time: item.reserve_time,
      },
      () => console.log(this.state)
    );
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
    //kiem tra xem cac input co null hay k, neu k null thi moi post data
    if (
      this.state.name == "" ||
      this.state.fullName == "" ||
      this.state.price == "" ||
      this.state.status == "" ||
      this.state.chairNum == ""
    ) {
      this.setState(
        (prevState) => ({
          ...prevState,
          action: {
            ...prevState.action,
            name: "formError",
            date: getCurrentDateTime(),
          },
        }),
        () => console.log(this.state)
      );
      //this.setState({action:'formError',actionTime:getCurrentDateTime()});
    } else {
      const reserve = this.state.datetime + " " + this.state.time;
      let newTable = {
        name: this.state.name,
        chairNum: this.state.chairNum,
        status: this.state.status,
        price: this.state.price,
        fullName: this.state.fullName,
        reserve_time: reserve,
      };
      let newData = {};
      const { navigation, route } = this.props;
      if (this.state.mode == "addTable") {
        //thuc hien post data
        axios
          .post(`${SERVER_ID}table/add`, newTable)
          .then((res) => {
            newData = {
              ...newTable,
              action: {
                name: "postTable",
                date: getCurrentDateTime(),
                msg: res.data,
              },
            };
          })
          .then(() => {
            //post xong data ms navigate ve table , mang theo 1 param
            navigation.navigate("Table", newData); //navigate ve table voi param
          })
          .catch((err) => console.log(err));
      } else if (this.state.mode == "editTable") {
        //modify data
        axios
          .put(`${SERVER_ID}table/modify/${this.state.name}`, newTable)
          .then((res) => {
            newData = {
              ...newTable,
              action: {
                name: "putTable",
                date: getCurrentDateTime(),
                msg: res.data,
              },
            };
          })
          .then(() => {
            //post xong data ms navigate ve table , mang theo 1 param
            navigation.navigate("Table", newData); //navigate ve table voi param
          })
          .catch((err) => console.log(err));
      }
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <ScrollView>
          <Response action={this.state.action} />
          <View style={styles.overlayContainer}>
            <View>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => navigation.navigate("Table")}
              >
                <Ionicons name="ios-arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </View>
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
              placeholder="chairNum"
              label="chairNum"
              value={this.state.chairNum}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputstyle}
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
              value={this.state.price}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputstyle}
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
                placeholder="time"
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
                style={styles.btnSubmit}
                onPress={() => this.addTable()}
              >
                <Text>ADD</Text>
              </TouchableOpacity>
            </View>
            {/* <Text>{JSON.stringify(tableInfo, null, 2)}</Text> */}
          </View>
        </ScrollView>
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
    padding: 15,
    width: 50,
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
