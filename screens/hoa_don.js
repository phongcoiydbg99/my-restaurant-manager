import React from "react";
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
import Background from "../assets/Backgr-Login.jpg";
import { overlay } from "react-native-paper";
import { List, ListItem, SearchBar } from 'react-native-elements';

export default Bill = () => {
  
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

        {/* <FlatList
          data={ListTables}
          renderItem={({ item }) => <Table name={item.name} />}
          keyExtractor={item=> '${item.id}'} 
          /> */}

          <View style={styles.billContainer}>
            <View style={styles.billTitle}>
              <Text style={styles.textBillTitle}>GB Restaurant</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTableName}>name</Text>
                <Text style={styles.textMaHoaDon}>ma hoa don</Text>
              </View>       
            </View>

            <View style={styles.billContent}>

            </View>
          </View>
      </View>
    </ImageBackground>
  );
};

const ListTables = [{ id: 1, name: "Table1", },
                    { id: 2, name: "Table2", },
                    { id: 3, name: "Table3", },
                    { id: 4, name: "Table4", }
                  ];

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
    // justifyContent: "center",
    // alignItems: "center",
    //backgroundColor: "#313131",
    //opacity: .9,
    borderColor: "#707070",
    borderWidth: 1,
    marginTop: 80,
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  tableContainer: {
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
  },
  billTitle: {
    height: (HIGHT - 240)/8,
    borderBottomColor: 'rgba(243, 242, 242, 0.60)',
    borderBottomWidth: 3,
    
  },
  billContent: {

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
    flex: 1, textAlign: "left", 
    marginTop: 10, 
    marginLeft: 30,
    color: '#fff'
  },
  textMaHoaDon: {
    position:"relative", 
    flex: 1, 
    textAlign: 'right', 
    marginTop: 10, 
    marginRight: 30,
    color: '#fff'
  },
});


function Table({ name }) {
  return (
    <View style={styles.tableContainer}>
      <Text style={{fontSize: 32}}>{name}</Text>
    </View>
  );
}