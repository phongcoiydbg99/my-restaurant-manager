import React, { Component } from 'react';
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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import axios from "axios";
export default class dessertmenu extends Component {
  constructor(props){
    super(props);
      this.state ={
        count : 0
      };
  }
  componentDidMount(){
     console.log("this.state.count");
     //document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    //document.title = `You clicked ${this.state.count} times`;
  }
    render(){
      return(
        <ImageBackground
    source = {Background} style ={styles.container}
    >
      <View style = {styles.overlayContainer}>
          <Button title="Press me" onPress = {() =>this.setState({ count: this.state.count + 1 })}></Button>
          <Text>count: {this.state.count}  </Text>     
      </View>
    </ImageBackground>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
})