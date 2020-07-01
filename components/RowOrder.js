import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
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
import { SERVER_IMAGE_ID } from "../config/properties";
const { width: WIDTH } = Dimensions.get("window");
import axios from "axios";
import { getCurrentDateTime } from "../config/util";

export default class RowOrder extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.item.call_number);
    this.state = {
      visible: false,
      order: {},
      count:
        this.props.item.call_number != undefined
          ? this.props.item.call_number
          : this.props.number,
      show: false,
    };
  }
  componentDidMount() {
   
  }
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible });
  };
  upCount = () => {
    this.setState({ count: this.state.count + 1 }, ()=> this.props.addOrder({
      name: this.props.item.name,
      call_number: this.state.count,
     
    }));
   
  };
  downCount = () => {
    this.setState({count: this.state.count -1}, ()=>{
      this.props.addOrder({
        name: this.props.item.name,
        call_number: this.state.count
        
      });
      if(this.state.count == 0){
        this.props.deleteOrder(0);
      } 
    });
   
  };
  render() {
    const { navigation } = this.props;
    let modalview;
    if (this.props.modal != undefined) {
      modalview = (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visible}
          presentationStyle={"overFullScreen"}
        >
          <TouchableHighlight style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={{uri: this.props.image}} style={styles.image1} />
              <View style={{ ...styles.content, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 25, fontWeight: "bold", color: "#3a3a3a" }}
                >
                  {this.props.item.name}
                </Text>
                <Text style={styles.subtitle}>{this.props.item.price}</Text>
              </View>
              <View
                style={{ ...styles.right, alignItems: "center", marginTop: 10 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={this.downCount}>
                    <AntDesign name="minuscircle" size={24} color="black" />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {this.state.count}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={this.upCount}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ show: true });
                    this.toggleOverlay();
                  }}
                  style={styles.btnSubmit}
                >
                  <Text>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
      );
    }
    let button;
    let price;
    let view;
    if (this.state.count > 0) {
      button = (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={this.downCount}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.state.count}
            </Text>
          </View>
          <TouchableOpacity onPress={this.upCount}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else button = <View />;
    if (this.props.buttonView != undefined) {
      button = (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={this.downCount}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.state.count}
            </Text>
          </View>
          <TouchableOpacity onPress={this.upCount}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={this.toggleOverlay} style={styles.container}>
        {modalview}
        <View>
          <Image source={{ uri: this.props.image }} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.item.name}</Text>
          <Text style={styles.subtitle}>{this.props.item.price}</Text>
        </View>
        <View style={styles.right}>{button}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius:5,
    marginLeft: 10,
    marginBottom:2,
    width: "95%"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  image1: {
    width: WIDTH - 20,
    margin: 10,
    height: 300,
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3a3a3a",
  },
  subtitle: {
    color: "#666",
    fontSize: 18,
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
  btnSubmit: {
    marginTop: 10,
    marginBottom: 10,
    width: "60%",
    backgroundColor: "#ff6600",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    height: "60%",
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
