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
import dataBill from "../data/bill"
import { SERVER_ID } from "../config/properties";
import axios from "axios";
import { RowRevenue, Separator } from '../components/RowRevenue';

export default class revenueStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      table: [],
      revenueMonth: '',
      dataRevenueMonth: [],
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
    axios.get(`${SERVER_ID}revenue/all`).then((res) => {
      this.setState({ dataRevenueMonth: res.data });
    });
  }

  render(){
    const {navigation} = this.props;
    console.log(this.state.dataRevenueMonth)
    return(
      <ImageBackground source={Background} style={styles.container}>
        <View style={styles.overlayContainer}>

            {/* hóa đơn */}
            <View style={styles.billContainer}>
              <View style={styles.billTitle}>
                <Text style={styles.textBillTitle}>One month</Text>
                <Text style={styles.textBillTitle}>Revennue Statistics</Text>
                
              </View>
              <FlatList
                      data={this.state.dataRevenueMonth}
                      renderItem={({ item }) =>  <RowRevenue item={item} 
                      />}
                      ItemSeparatorComponent={Separator}
                      ListHeaderComponent={() => <Separator />}
                      ListFooterComponent={() => <Separator />}
                      keyExtractor={(item) => {
                        return `${item.month}`;} }
                    />
            
            </View> 
        </View>
      </ImageBackground>
    )
  }
}
  

const { width: WIDTH} = Dimensions.get('window');
const { height: HIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    borderColor: "#707070",
    borderWidth: 1,
    marginTop: 70,
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  tableContainer: {
    flexDirection:'row',
    paddingTop: 10, 
    backgroundColor: "#fff",
    borderWidth: 2, 
    borderColor: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  searchBarContainer:{
    backgroundColor: "#fff",
    height: 30,
    opacity: .5,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 7,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
  },
  SearchBar: {
    height: 10,
  },
  billContainer: {
    borderColor: 'rgba(243, 242, 242, 0.60)',
    borderWidth: 3,
    borderRadius: 25,
    //height: HIGHT - 240,
    height: HIGHT - 200,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    // display: 'none'
  },
  billTitle: {
    height: (HIGHT - 260)/8,
    
  },
  billContent: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  billContentTitle: {
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textBillTitle: {
    color: '#ffffff', 
    fontSize: 22, 
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  textTableName: {
    position: "relative", 
    flex: 1, 
    textAlign: "left", 
    marginTop: 5, 
    marginLeft: 30,
    color: '#fff',
  },
  textMaHoaDon: {
    position:"relative", 
    flex: 1, 
    textAlign: 'right', 
    marginTop: 5, 
    marginRight: 30,
    color: '#fff'
  },
  billTable: {
    fontSize: 16, 
    position: 'relative', 
    textAlign:'center', 
    width: (WIDTH-120)/4, 
    color: '#fff',
  },
  totalView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 40,
  },
});

export const Order = ({ item }) => (
  <View style={{flexDirection: 'row',}}>
    <View>
      <Text style={styles.billTable}>{item.name}</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.price}$</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.Amount}</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.Total}$</Text>
    </View>
  </View>

);