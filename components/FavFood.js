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
import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import { SeparatorMenu } from "../components/MenuItem";
import { Input } from "react-native-elements";
import MenuItem from "../components/MenuItem";
import { List, ListItem, SearchBar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { RowFav, Separator } from '../components/RowFav';
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");


import axios from "axios";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      result: [],
      menu: [],
      name: "",
      fullName: "",
      price: "",
      action: {},
      model: "",
      monthRecently: new Date().getMonth() + 1,
      yearRecently: new Date().getFullYear(),
      selectedValue: (new Date().getMonth() + 1).toString() ,
      favFood: [],
      fav: [],
    };
  }
  componentDidMount() {
    axios.get(`${SERVER_ID}dish/category/${this.props.category}`).then((res) => {
      this.setState(
        (prevState) => ({
          ...prevState,
          result: res.data ,
          menu: res.data,
        }));
    }).catch(err => console.log('Dish error : ' + err));
    axios.get(`${SERVER_ID}dishdata/all`).then((res) => {
      this.setState(
        (prevState) => ({
          ...prevState,
          favFood: res.data ,
        }));
    }).catch(err => console.log('Dish error : ' + err));
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(this.state.model);
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


  selMonth(month, item){
    if(month == this.state.monthRecently){
      let temp;
      this.state.result.filter((item1) => {
        if(item1.name == item.dishName) temp = item1.orderTime;
      })
      return temp;
    }else{
      if(month == 1) return item.january;
      else if(month == 2) return item.february;
      else if(month == 3) return item.march;
      else if(month == 4) return item.april;
      else if(month == 5) return item.may;
      else if(month == 6) return item.june;
      else if(month == 7) return item.july;
      else if(month == 8) return item.august;
      else if(month == 9) return item.september;
      else if(month == 10) return item.october;
      else if(month == 11) return item.november;
      else if(month == 12) return item.december;
    }
  }

  render() {
    const { navigation } = this.props;
    console.log(this.state.selectedValue);
    this.state.favFood.filter((item) => {
      this.state.result.filter((item1) => {
        if(item.dishName === item1.name && this.state.fav.length < this.state.favFood.length) 
          this.state.fav.push({...item, fullName: item1.fullName})
      })
    });
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={{...styles.overlayContainer, marginTop: 130,}}>
          <View style={{backgroundColor: '#fff', flexDirection: "row"}}>
            <Text style={{fontSize: 25, color: '#000', marginLeft: 10, textAlignVertical: 'center'}}>Order Statistics</Text>
            <Picker
              selectedValue={this.state.selectedValue}
              style={{height: 50, width: 120, position: 'relative', left: WIDTH -  300}}
              onValueChange={(itemValue) => {
                this.setState({selectedValue:itemValue})
                
              }}
              mode = {'dropdown'}
            >
              <Picker.Item label="1/2020" value='1' />
              <Picker.Item label="2/2020" value='2' />
              <Picker.Item label="3/2020" value='3' />
              <Picker.Item label="4/2020" value='4' />
              <Picker.Item label="5/2020" value='5' />
              <Picker.Item label="6/2020" value='6' />
              <Picker.Item label="7/2020" value='7' />
              <Picker.Item label="8/2020" value='8' />
              <Picker.Item label="9/2020" value='9' />
              <Picker.Item label="10/2020" value='10' />
              <Picker.Item label="11/2020" value='11' />
              <Picker.Item label="12/2020" value='12' />
            </Picker>
          </View>
          <View style={{height: HEIGHT - 230}}>
            <FlatList
              data={this.state.fav}
              renderItem={({ item }) =>  <RowFav item={item} 
              month = {this.selMonth(this.state.selectedValue, item)}
              />}
              ItemSeparatorComponent={Separator}
              ListHeaderComponent={() => <Separator />}
              ListFooterComponent={() => <Separator />}
              keyExtractor={(item) => {
                return `${item.dishName}`;} }
            />
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
    height: HEIGHT,
    marginBottom: 90,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  
});
