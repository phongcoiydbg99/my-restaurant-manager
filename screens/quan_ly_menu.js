import React from 'react';
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
  Alert,
} from "react-native";
import backGroundApp from "../assets/Backgr-app.png";
import TabMenu from "../config/tabMenu";

const { width: WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
    btn: {
      width: WIDTH - 290,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5DD1F9",
        borderRadius: 20, 
      },
    btn1: {
      width: WIDTH - 290,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9FDD4E",
        borderRadius: 20,
      },
    btn2: {
      width: WIDTH - 290,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,102,0,1)",
        borderRadius: 20,     
      },
    text: {
        color: "rgba(255,255,255,1)",
        fontSize: 13,
      },
    fixToText: {
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
         borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.00,
      },
    sh1:{
      shadowColor: "#FFFFFF",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,     
      //elevation: 11,
    },
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    overlayContainer: {
      flex: 1,
      backgroundColor: "#313131",
      opacity: 0.945,
    }, 
})
export default () => (
     <TabMenu/>  
);