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
import { SERVER_ID } from "../config/properties";
import axios from "axios";

export default class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      detail: [],
      table: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { route } = this.props;
    const tableInfo = route.params.table;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("focus", () => {
      // if (navigation.params != undefined ) 
      console.log(route.parmas);
    });
    axios.get(`${SERVER_ID}table_dish/table/${tableInfo.name}`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ table: res.data });
    });
  }
  
  

  //thanh toan
  paid = () =>{
    const { navigation, route } = this.props;
    const tableInfo = route.params.table;
    const newTable = tableInfo;
    // newTable.status = 'empty'
    // axios
    //   .put(`${SERVER_ID}table/modify/${newTable.name}`, newTable);

    navigation.navigate('billOfTable', newTable);

  }

  render() {
    const { navigation, route} = this.props;
    const tableInfo = route.params.table;
    // var total = '';
    // this.state.result.filter((item) => {
    //   total = parseInt(total + item.id.dish.pirce * item.call_number);
    // });

   
    return(
      <ImageBackground source={Background} style={styles.container}>
        <View style={styles.overlayContainer}>

            {/* hóa đơn */}
            <View style={styles.billContainer}>
              <View style={styles.billTitle}>
                <Text style={styles.textBillTitle}>GB Restaurant</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textTableName}>{tableInfo.fullName}</Text>
                  <Text style={styles.textMaHoaDon}>{tableInfo.reserve_time}</Text>
                </View>       
              </View>

              <View style={styles.billContent}>
                <View style={styles.billContentTitle}>
                  <View>
                    <Text style={styles.billTable}>Name</Text>
                  </View>
                  <View>
                    <Text style={styles.billTable}>Price</Text>
                  </View>
                  <View>
                    <Text style={styles.billTable}>Amount</Text>
                  </View>
                  <View>
                    <Text style={styles.billTable}>Total</Text>
                  </View>
                </View>

                <View style={{height: ((HIGHT - 280)/2), borderBottomColor: 'rgba(243, 242, 242, 0.60)', borderBottomWidth: 3, }}>
                  <FlatList
                    data={this.state.result}
                    renderItem={({ item }) => <Order item={item} />}
                    keyExtractor={(item) => {
                      return `${item.id.dish.name}`;} }
                  />
                </View>

                <View style={{paddingTop: 15, height: ((HIGHT - 280)/6 ), flexDirection: 'row', borderBottomColor: 'rgba(243, 242, 242, 0.60)', borderBottomWidth: 3,}}>
                  <Text style={{marginLeft: 10, fontSize: 20, color: '#fff', flex: 1, textAlign: 'left',}}>Price Table</Text>
                  <Text style={{marginRight: 30, fontSize: 20, color: '#fff', flex: 1, textAlign: 'right',}}>{tableInfo.price}đ</Text>
                </View>

                <View style={styles.totalView}>
                  <Text style={{fontSize: 25, color: '#fff', paddingBottom: 10,}}>Total Bill: {tableInfo.totalPrice}đ</Text>
                  <TouchableOpacity onPress={() => this.paid()}>
                    <Text style={{fontSize: 25, color: '#fff'}}>Done!</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View> 
        </View>
      </ImageBackground>
    );
}};

const { width: WIDTH} = Dimensions.get('window');
const { height: HIGHT} = Dimensions.get('window');

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
    height: HIGHT - 260,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    // display: 'none'
  },
  billTitle: {
    height: (HIGHT - 280)/6,
    borderBottomColor: 'rgba(243, 242, 242, 0.60)',
    borderBottomWidth: 3,
    
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
    //flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    height: (HIGHT - 280)/6,
    paddingTop: 20,
  },
});

export const Order = ({ item }) => (
  <View style={{flexDirection: 'row',}}>
    <View>
      <Text style={styles.billTable}>{item.id.dish.fullName}</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.id.dish.pirce}đ</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.call_number}</Text>
    </View>
    <View>
      <Text style={styles.billTable}>{item.id.dish.pirce * item.call_number}đ</Text>
    </View>
  </View>

);