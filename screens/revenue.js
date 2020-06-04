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
  FlatList,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Background from "../assets/Backgr-Login.jpg";
import { AntDesign } from '@expo/vector-icons'; 
import { imgFavoriteFood } from "../assets/Backgr-Login.jpg";
import avatar from '../assets/avatar.png'
import Group from '../assets/Group.png'
import outline from '../assets/outline.png'
import saved from '../assets/saved.png'
import { SERVER_ID } from "../config/properties";
import axios from "axios";


export default class revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      result: [],
      table: [],
      dataRevenueDay: [],
      revenueDay: '',
    };
  }
  componentDidMount() {
    const { navigation} = this.props;
    const { route } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("focus", () => {
      // if (navigation.params != undefined ) 
      console.log(route.parmas);
    });
    axios.get(`${SERVER_ID}dayRevenue/all`).then((res) => {
      this.setState({ dataRevenueDay: res.data });
    });
  }

  

  render(){
    const {navigation} = this.props;
    //console.log(this.state.revenueDay)
    this.state.dataRevenueDay.filter((item) => {
      if(item.dayNum == 4){
        this.state.revenueDay = item.revenue;
      }
    });
    //console.log(this.state.result);
    return(
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.content}>
          <View style={styles.subContentLeft}>
              {/* custommer */}
            <View style={styles.custommer}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>Custommer</Text>
                <View style={{justifyContent: 'center',alignItems: "center", backgroundColor: '#F20000', borderWidth:1, borderRadius: 50, borderColor: '#F20000', width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                  <Image source={avatar} style={{width: 16, height: 16,}} />
                </View>
                
              </View>
            </View>
              {/* favoriteFood */}
            <TouchableOpacity activeOpacity={0.6} style={styles.favoriteFood} onPress={() => navigation.navigate('favoriteFood')}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>Favorite Food</Text>
                  <View style={{justifyContent: 'center',alignItems: "center", backgroundColor: '#3BAA9E', borderWidth:1, borderRadius: 50, borderColor: '#3BAA9E', width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                    <Image source={outline} style={{width: 16, height: 16,}} />
                  </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.subContentRight}> 
            {/* revenueStatistics */}
            <TouchableOpacity activeOpacity={0.6} style={styles.revenueStatistics} onPress={() => navigation.navigate('revenueStatistics')}>
              <View  style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>One month</Text>
                <View style={{justifyContent: 'center',alignItems: "center", backgroundColor: '#3F3CB4', borderWidth:1, borderRadius: 50, borderColor: '#3F3CB4', width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                  <Image source={saved} style={{width: 16, height: 16,}} />
                </View>
              </View>
              <Text style={styles.subTitle}>Revenue statistics</Text>
            </TouchableOpacity>
            {/* revenueInDay */}
            <View style={styles.revenueInDay}>
              <View  style={{flexDirection: 'row', marginBottom: 20,}}>
                <Text style={styles.title}>Revenue in day</Text>
                <View style={{justifyContent: 'center',alignItems: "center", backgroundColor: '#C26900', borderWidth:1, borderRadius: 50, borderColor: '#C26900', width: 26, height: 26, marginTop: 35, marginLeft: 10,}}>
                  <Image source={Group} style={{width: 16, height: 16,}} />
                </View>
              </View>
                <Text style={{marginLeft: 20, fontSize: 35, color: '#fff',}}>{JSON.stringify(this.state.revenueDay)}</Text>
                <Text style={{marginLeft: 20, fontSize: 25, color: '#fff', fontStyle: 'italic', opacity: 0.7,}}>VNĐ</Text>
            </View>
          </View>
        </View> 
      </View>
    </ImageBackground>
)}};


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
    backgroundColor: 'rgba(253, 57, 96, 0.82)',
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
    fontSize: 18, 
    color: '#fff',
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18, 
    color: '#fff',
    marginLeft: 15,
  },
});
