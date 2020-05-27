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

export default Bill = ({navigation, route}) => {
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <SearchBar 
                onChangeText={() => {}}
                placeholder='Search'
                placeholderTextColor='#86939e'
                platform = "android"
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.SearchBar}
                placeholderTextColor={'#000'}
                />

          {/* Danh sách bàn đang live */}
          <View style={styles.contentContainer}>
          <View style={styles.content}>
          <View style={{ width: "20%" }}>
                <Text style={styles.title}>ID</Text>
              </View>
              <View style={{ width: "25%" }}>
                <Text style={styles.title}>Table</Text>
              </View>
              <View style={{ width: "25%" }}>
                <Text style={styles.title}>People</Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={styles.subtitle}>Status</Text>
              </View>
            </View>
            </View>
            <FlatList
                    data={table}
                    renderItem={({ item }) =>  <RowTable item={item} 
                    onPress = {() => navigation.navigate('bill')}/>}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={() => <Separator />}
                    ListFooterComponent={() => <Separator />}
                    keyExtractor={(item) => {
                      return `${item.id}`;} }
                   />


      </View>
    </ImageBackground>
  );
};


const { width: WIDTH} = Dimensions.get('window');
const { height: HIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    //opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    // borderColor: "#707070",
    // borderWidth: 1,
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
    height: 40,
    //opacity: .5,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
  },
  SearchBar: {
    height: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 20,
    height: 40,
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