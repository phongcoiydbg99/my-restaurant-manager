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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_ID } from "../config/properties";
import axios from "axios";
import { getCurrentDateTime } from "../config/util";
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: "center",
      backgroundColor: "#fff",
      // borderBottomWidth: 2,
      // borderBottomColor: "#ececec",
      // elevation: 1,
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
    separator: {
      backgroundColor: "#ececec",
      height: 2,
    },
    right: {
      alignItems: "flex-end",
      flex: 1,
    },
  });

  export default class RowOrder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        check: false,
      };
    }
    componentDidMount(){
        console.log('haha');
    }
    render() {
      const {navigation} = this.props;
      return (
        <TouchableOpacity  style={styles.container}>
          
          <View style={{ ...styles.content }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", width: "55%" }}>
                <Text style={styles.label}>TableName </Text>
                <Text style={styles.title}> {this.props.item.id.table.name}</Text>
              </View>
              <View style={{ flexDirection: "row", width: "20%" }}>
                <Text style={styles.label}>DishName </Text>
                <Text style={styles.title}>{this.props.item.id.dish.name}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>CallNum </Text>
              <Text style={styles.title}>{this.props.item.call_number}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Time: </Text>
              <Text style={styles.title}>{this.props.item.call_time}</Text>
            </View>
            
          </View>
          <Animated.View
            style={{
              width: this.props.width,
              marginLeft: -20,
              marginRight: this.props.right,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity >
              <MaterialIcons name="edit" size={35} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                
                axios.delete(`${SERVER_ID}table/delete/${this.props.item.name}`).then(res=>{
                  navigation.setParams({action:{name: 'deleteTable',msg:res.data,time:getCurrentDateTime() }});
                })//delete table
              }}
              style={{
                marginLeft: 10,
                marginRight: 20,
              }}
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={35}
                color="red"
              />
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.right}>
            <Ionicons name="ios-arrow-forward" color="#666" size={20} />
          </View>
        </TouchableOpacity>
      );
    }
  }