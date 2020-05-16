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
  SafeAreaView,
} from "react-native";
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
    } 
})
export default Table = () => (
  <View>
    <View style ={styles.fixToText}>
    <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Menu chinh')}>
          <Text style={styles.text}>MainCourses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1 } onPress={() => Alert.alert('Diem Tam')}>
          <Text style={styles.text}>Desert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn2} onPress={() => Alert.alert('do uong')}>
          <Text style={styles.text}>Drink</Text>
      </TouchableOpacity>
      </View>
    <View>

    </View>
  </View>
);