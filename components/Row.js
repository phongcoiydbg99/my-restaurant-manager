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
  Alert,
  Picker
} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SERVER_ID } from "../config/properties";
import axios from "axios";
import { getCurrentDateTime } from "../config/util";
import Axios from "axios";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
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
    paddingVertical:1,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false, 
    };
  }
 
  render() {
    const {navigation, role , item} = this.props;
    return (
      <View  style={styles.container}>
        <View>
          <Image source={this.props.image} style={styles.image} />
        </View>
        <View style={{ ...styles.content }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", width: "55%" }}>
              <Text style={styles.label}>Tên: </Text>
              <Text style={styles.title}> {item.fullName}</Text>
            </View>
            { role === 'QUANLY' &&
                 <View style={{ flexDirection: "row", width: "20%" }}>
                 <Text style={styles.label}>Số ghế: </Text>
                 <Text style={styles.title}>{item.chairNum}</Text>
               </View>
            }
           
          </View>
          {role === 'QUANLY' &&
              <View style={{ flexDirection: "row" }}>
                 <Text style={styles.label}>Giá: </Text>
              <Text style={styles.title}>{item.price}</Text>
            </View>
          }
          {role === 'QUANLY' &&
              <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Giờ đặt: </Text>
              <Text style={styles.title}>{item.reserve_time}</Text>
            </View>
          }
          {role === 'QUANLY' ? 
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sublabel}>Trạng thái: </Text>
            <Text style={styles.subtitle}>{item.status}</Text>
          </View> : 
          <View style={{flexDirection: "row",
          alignItems: "center",}}>
              
              <Text style={ styles.sublabel}>Trạng thái :</Text>
          <Picker
              mode={"dropdown"}
              selectedValue={item.status}
              style={{fontSize:17,width:'100%' }}
               onValueChange={(text) => {
                 let table={
                   name:item.name, fullName:item.fullName,chairNum:item.chairNum,
                   price:item.price,reserve_time:item.reserve_time,status:text
                 };
                 Axios.post(`${SERVER_ID}table/add`,table).then(res=>{
                  navigation.setParams({
                    action: {
                      name: "deleteTable",
                      msg: res.data,
                      time: getCurrentDateTime(),
                    },
                  });
                 });
               }}
           >
              <Picker.Item label="reserved" value="reserved" />
              <Picker.Item label="full" value="full" />
              <Picker.Item label="empty" value="empty" />
          </Picker>
          </View> 
          
          }
          
        </View>
        {role === 'QUANLY' &&
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
          <TouchableOpacity onPress={this.props.onPress}>
            <MaterialIcons name="edit" size={35} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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
                    onPress: () => {
                      this.setState({ check: true });
                      axios
                        .delete(
                          `${SERVER_ID}table/delete/${item.name}`
                        )
                        .then((res) => {
                          navigation.setParams({
                            action: {
                              name: "deleteTable",
                              msg: res.data,
                              time: getCurrentDateTime(),
                            },
                          });
                        }); //delete table
                    },
                  },
                ],
                { cancelable: false }
              );
              
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
        }
        
        <View style={styles.right}>
          <Ionicons name="ios-arrow-forward" color="#666" size={20} />
        </View>
      </View>
    );
  }
}
export const Separator = () => <View style={styles.separator} />;
