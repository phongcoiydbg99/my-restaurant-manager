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
import { SERVER_IMAGE_ID } from "../config/properties";
import axios from "axios";


export default class revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      table: [],
      dataRevenueDay: [],
      revenueDay: '',
      dataRevenueMonth: [],
      rank1: '',
      allDish: [],
      favoriteFood: '',
    };
  }
  componentDidMount() {
    const { navigation} = this.props;
    const { route } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("focus", () => {
      axios.get(`${SERVER_ID}dayRevenue/all`).then((res) => {
        this.setState({ dataRevenueDay: res.data });
      });
      axios.get(`${SERVER_ID}revenue/all`).then((res) => {
        this.setState({ dataRevenueMonth: res.data });
      });
      axios.get(`${SERVER_ID}dish/all`).then((res) => {
        this.setState({ allDish: res.data });
      });
    });
    axios.get(`${SERVER_ID}dayRevenue/all`).then((res) => {
      this.setState({ dataRevenueDay: res.data });
    });
    axios.get(`${SERVER_ID}revenue/all`).then((res) => {
      this.setState({ dataRevenueMonth: res.data });
    });
    axios.get(`${SERVER_ID}dish/all`).then((res) => {
      this.setState({ allDish: res.data });
    });
  }

  compare_money(a, b){
    if(a.money < b.money) return 1;
    else if(a.money > b.money) return -1;
    else return 0;
  }

  compare_orderTime(a, b){
    if(a.orderTime < b.orderTime) return 1;
    else if(a.orderTime > b.orderTime) return -1;
    else return 0;
  }

  render(){
    const {navigation} = this.props;
    var date = new Date().getDate();
    var month = new Date().getMonth();

    // get revenue theo ngay
    this.state.dataRevenueDay.filter((item) => {
      if(item.dayNum == date){
        this.state.revenueDay = item.revenue;
      }
    });

    // get revenue cao nhat trong cac thang
    this.state.dataRevenueMonth.sort(this.compare_money);
    var dem = 0;
    this.state.dataRevenueMonth.filter((item) => {
      if(dem == 0) this.state.rank1 = item;
      dem++;
    })

    // get mon an duoc goi nhieu nhat
    this.state.allDish.sort(this.compare_orderTime);
    dem = 0;
    this.state.allDish.filter((item) => {
      if(dem == 0) this.state.favoriteFood = item;
      dem++;
    })
    //console.log(this.state.favoriteFood);
    return(
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.content}>
          <View style={styles.subContentLeft}>
              {/* custommer */}
            <View style={styles.custommer}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>Custommer</Text>
                <View style={styles.iconCustomer}>
                  <Image source={avatar} style={{width: 16, height: 16,}} />
                </View>
                
              </View>
            </View>
              {/* favoriteFood */}
            <TouchableOpacity activeOpacity={0.6} style={styles.favoriteFood} onPress={() => navigation.navigate('favoriteFood')}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>Favorite Food</Text>
                  <View style={styles.iconFav}>
                    <Image source={outline} style={{width: 16, height: 16,}} />
                  </View>
              </View>
              <View>
                <Text style={styles.nameFav}>{this.state.favoriteFood.fullName}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                    source={{
                      uri:
                        `${SERVER_IMAGE_ID}` +
                        "public/" +
                        this.state.favoriteFood.name +
                        ".png",
                    }}
                    style={{alignItems: "center", marginTop: 15, width: 150, height: 150, borderColor: '#3BAA9E', borderRadius: 10, }}
                  />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.subContentRight}> 
            {/* revenueStatistics */}
            <TouchableOpacity activeOpacity={0.6} style={styles.revenueStatistics} onPress={() => navigation.navigate('revenueStatistics')}>
              <View  style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.title}>One month</Text>
                <View style={styles.iconRev}>
                  <Image source={saved} style={{width: 16, height: 16,}} />
                </View>
              </View>
              <Text style={styles.subTitle}>Revenue statistics</Text>
              <View style={{}}>
                <Text style={{fontSize: 32, color: "#fff", paddingTop: 20, marginLeft: 30, fontWeight: 'bold', textShadowColor: '#000', textShadowRadius: 10}}>#1. {this.state.rank1.month}</Text>
                <Text style={{fontSize: 28, color: "#fff", paddingTop: 20, marginLeft: 30,}}>{this.state.rank1.money}</Text>
                <Text style={{marginLeft: 30, fontSize: 25, color: '#fff', fontStyle: 'italic', opacity: 0.7,}}>VNĐ</Text>
              </View>
            </TouchableOpacity>
            {/* revenueInDay */}
            <View style={styles.revenueInDay}>
              <View  style={{flexDirection: 'row', marginBottom: 20,}}>
                <Text style={styles.title}>Revenue in day</Text>
                <View style={styles.iconRevDay}>
                  <Image source={Group} style={{width: 16, height: 16,}} />
                </View>
              </View>
                <Text style={{marginLeft: 20, fontSize: 35, color: '#fff', textShadowColor: '#000', textShadowRadius: 10,}}>{JSON.stringify(this.state.revenueDay)}</Text>
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
    flexDirection: "row",
    height: HEIGHT - 200,
    width: WIDTH - 20,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 60,
  },
  subContentLeft: {
    flexDirection: "column",
  },
  subContentRight: {
    flexDirection: "column",
  },
  custommer: {
    position: "relative",
    backgroundColor: "rgba(253, 57, 96, 0.82)",
    width: (WIDTH - 40) / 2,
    height: (2 * (HEIGHT - 200)) / 5,
    marginBottom: 25,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 20,
  },
  iconCustomer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F20000",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#F20000",
    width: 26,
    height: 26,
    marginTop: 35,
    marginLeft: 10,
  },
  favoriteFood: {
    backgroundColor: "#54E0C3",
    width: (WIDTH - 40) / 2,
    marginRight: 20,
    height: (3 * (HEIGHT - 200)) / 5,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 20,
  },
  iconFav: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3BAA9E",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#3BAA9E",
    width: 26,
    height: 26,
    marginTop: 35,
    marginLeft: 10,
  },
  nameFav: {
    textAlign: "center",
    fontSize: 32,
    color: "#fff",
    paddingTop: 20,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 10,
  },
  revenueInDay: {
    position: "relative",
    backgroundColor: "#FF8B00",
    width: (WIDTH - 40) / 2,
    height: (2 * (HEIGHT - 200)) / 5,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 20,
  },
  iconRevDay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C26900",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#C26900",
    width: 26,
    height: 26,
    marginTop: 35,
    marginLeft: 10,
  },
  revenueStatistics: {
    backgroundColor: "#5754D5",
    width: (WIDTH - 40) / 2,
    height: (3 * (HEIGHT - 200)) / 5,
    marginBottom: 25,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 20,
  },
  iconRev: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F3CB4",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#3F3CB4",
    width: 26,
    height: 26,
    marginTop: 35,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 15,
  },
});
