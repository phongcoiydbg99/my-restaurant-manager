import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SERVER_ID } from "../config/properties";
import axios from "axios";
import { getCurrentDateTime } from "../config/util";
export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      order: {},
      count: this.props.item.call_number,
      show: false,
    };
  }
  componentDidMount() {
    console.log("haha");
  }
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible });
  };
  upCount = () => {
    this.setState({ count: this.state.count + 1 });
    this.props.addOrder({
      name: this.props.item.name,
      call_number: this.state.count +1,
    });
  };
  downCount = () => {
    if (this.state.count == 0) this.setState({ count: 0 });
    else {
      this.setState({ count: this.state.count - 1 });
      this.props.addOrder({
      name: this.props.item.name,
      call_number: this.state.count -1,
    });
    }
  };
  render() {
    const { navigation } = this.props;
    let button;
    if (this.state.show && this.state.count > 0) {
      button = (
        <View>
          <TouchableOpacity onPress={this.upCount}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
          <Text>{this.state.count}</Text>
          <TouchableOpacity onPress={this.downCount}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else button = <View />;

    return (
      <TouchableOpacity onPress={this.toggleOverlay} style={styles.container}>
        <View>
          <Image source={this.props.image} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.item.name}</Text>
          <Text style={styles.subtitle}>{this.state.count}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={this.upCount}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
          <Text>{this.state.count}</Text>
          <TouchableOpacity onPress={this.downCount}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
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
  separator: {
    backgroundColor: "#ececec",
    height: 2,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopStartRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 9,
    // borderRadius: 5,
  },
});
