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
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import dataBill from "../data/bill"
import { AntDesign } from '@expo/vector-icons'; 
import { imgFavoriteFood } from "../assets/Backgr-Login.jpg";

export default ({navigation}) => (
  <ImageBackground source={Background} style={styles.container}>
    <View style={styles.overlayContainer}>
      <View style={styles.content}>
        <View style={styles.subContentLeft}>
            {/* custommer */}
          <View style={styles.custommer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.title}>Custommer</Text>
              <View style={{backgroundColor: '#FF0000', borderWidth:1, borderRadius: 50, width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                <AntDesign name="user" size={24} color="black" />
              </View>
              
            </View>
          </View>
            {/* favoriteFood */}
          <TouchableOpacity activeOpacity={0.6} style={styles.favoriteFood} onPress={() => navigation.navigate('favoriteFood')}>
            <View>
              <Text style={styles.title}>Favorite Food</Text>
              <View style={{backgroundColor: '#FF0000', borderWidth:1, borderRadius: 50, width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                <Image source={imgFavoriteFood} style={{size: 24,}}/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.subContentRight}> 
          {/* revenueStatistics */}
          <TouchableOpacity activeOpacity={0.6} style={styles.revenueStatistics} onPress={() => navigation.navigate('revenueStatistics')}>
            <View>
              <Text style={styles.title}>One month</Text>
              <Text style={styles.subTitle}>Revenue statistics</Text>
            </View>
          </TouchableOpacity>
          {/* revenueInDay */}
          <View style={styles.revenueInDay}>
            <View>
              <Text style={styles.title}>Revenue in day</Text>
            </View>
          </View>
        </View>
      </View> 
    </View>
  </ImageBackground>
);


const { width: WIDTH} = Dimensions.get('window');
const { height: HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  content: {
    flexDirection:'row',
    height: HEIGHT - 300,
    width: WIDTH - 60,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 60,
  },
  subContentLeft: {
    flexDirection: 'column',

  },
  subContentRight: {
    flexDirection: 'column',
  },
  custommer: {
    position: 'relative',
    backgroundColor: '#FF2C55',
    width: (WIDTH - 80)/2,
    height: 2*(HEIGHT - 325)/5,
    marginBottom: 25,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 20,
  },
  favoriteFood: {
    backgroundColor: '#54E0C3',
    width: (WIDTH - 80)/2,
    marginRight: 20,
    height: 3*(HEIGHT - 325)/5,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 20,
  },
  revenueInDay: {
    position: 'relative',
    backgroundColor: '#FF8B00',
    width: (WIDTH - 80)/2,
    height: 2*(HEIGHT - 325)/5,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 20,
  },
  revenueStatistics: {
    backgroundColor: '#5754D5',
    width: (WIDTH - 80)/2,
    height: 3*(HEIGHT - 325)/5,
    marginBottom: 25,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 20, 
    color: '#fff',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 20, 
    color: '#fff',
    marginLeft: 15,
  },
});
