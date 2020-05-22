import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleSheetRegistry,
  Button,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Background from "../assets/Backgr-Login.jpg";
import { overlay, Dialog } from "react-native-paper";
import { List, ListItem, SearchBar } from 'react-native-elements';
import table from "../data/table";
import { RowTable, Separator } from "../components/RowTable";

export default Bill = ({navigation}) => {
  
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <SearchBar 
                onChangeText={() => {}}
                placeholder='Search'
                platform = "android"
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.SearchBar}
                placeholderTextColor={'#000'}
                />

          {/* Danh sách bàn đang live */}
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <View>
                <Text style={styles.title}>ID</Text>
              </View>
              <View>
                <Text style={styles.title}>Table</Text>
              </View>
              <View>
                <Text style={styles.title}>People</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Status</Text>
              </View>
            </View>
            </View>
            <FlatList
                    data={table}
                    renderItem={({ item }) =>  <RowTable item={item} 
                    onPress = {() => navigation.navigate('bill')}/>}
                    keyExtractor={(item) => {
                      return `${item.id}`;} }
                   />


          {/* hóa đơn */}
          {/* <View style={styles.billContainer}>
            <View style={styles.billTitle}>
              <Text style={styles.textBillTitle}>GB Restaurant</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTableName}>name</Text>
                <Text style={styles.textMaHoaDon}>ma hoa don</Text>
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

              <View style={{height: ((HIGHT - 280)/2),}}>
                <FlatList
                  data={ListOrder}
                  renderItem={({ item }) => <Order item={item} />}
                  keyExtractor={item=> '${item.id}'} 
                />
              </View>

              <View style={styles.totalView}>
                <Text style={{fontSize: 25, color: '#fff'}}>Total</Text>
              </View>
            </View>
          </View>  */}
      </View>
    </ImageBackground>
  );
};

// const ListTables = [{ id: 1, name: "Table1", },
//                     { id: 2, name: "Table2", },
//                     { id: 3, name: "Table3", },
//                     { id: 4, name: "Table4", }
//                   ];
            
// const ListOrder = [{id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 2, name: 'Salad', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},
//                   {id: 1, name: 'Chicken', price: '5', Amount: '01', Total: '5'},

//                   ];

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
    marginTop: 80,
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
  // billContainer: {
  //   borderColor: 'rgba(243, 242, 242, 0.60)',
  //   borderWidth: 3,
  //   borderRadius: 25,
  //   //height: HIGHT - 240,
  //   height: HIGHT - 260,
  //   marginLeft: 40,
  //   marginRight: 40,
  //   marginTop: 40,
  //   display: 'none'
  // },
  // billTitle: {
  //   height: (HIGHT - 260)/8,
  //   borderBottomColor: 'rgba(243, 242, 242, 0.60)',
  //   borderBottomWidth: 3,
    
  // },
  // billContent: {
  //   marginTop: 5,
  //   marginLeft: 20,
  //   marginRight: 20,
  // },
  // billContentTitle: {
  //   flexDirection: 'row',
  //   alignItems: "flex-start",
  //   justifyContent: "space-between",
  // },
  // textBillTitle: {
  //   color: '#ffffff', 
  //   fontSize: 22, 
  //   fontStyle: 'italic',
  //   textAlign: 'center',
  //   marginTop: 5,
  // },
  // textTableName: {
  //   position: "relative", 
  //   flex: 1, 
  //   textAlign: "left", 
  //   marginTop: 5, 
  //   marginLeft: 30,
  //   color: '#fff',
  // },
  // textMaHoaDon: {
  //   position:"relative", 
  //   flex: 1, 
  //   textAlign: 'right', 
  //   marginTop: 5, 
  //   marginRight: 30,
  //   color: '#fff'
  // },
  // billTable: {
  //   fontSize: 16, 
  //   position: 'relative', 
  //   textAlign:'center', 
  //   width: (WIDTH-120)/4, 
  //   color: '#fff',
  // },
  // totalView: {
  //   flex: 1, 
  //   alignItems: 'center', 
  //   justifyContent: 'center', 
  //   marginTop: 40,
  // },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  content: {
    width: WIDTH - 50,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
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
});


// export const Order = ({ item }) => (
//     <View style={{flexDirection: 'row',}}>
//       <View>
//         <Text style={styles.billTable}>{item.name}</Text>
//       </View>
//       <View>
//         <Text style={styles.billTable}>{item.price}$</Text>
//       </View>
//       <View>
//         <Text style={styles.billTable}>{item.Amount}</Text>
//       </View>
//       <View>
//         <Text style={styles.billTable}>{item.Total}$</Text>
//       </View>
//     </View>

// );

// export const Table = ({ item, onPress }) => (
//   <View style={{flexDirection: 'row',}}>
//     <TouchableOpacity onPress={
//       onPress}>
//       <View style={styles.tableContainer}>
//         <Text style={styles.billTable}>{item.name}</Text>
//       </View>
//     </TouchableOpacity>
//     </View>

// );
