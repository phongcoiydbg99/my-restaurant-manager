import React, { Component } from "react";
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
  Animated,
} from "react-native";
import Background from "../assets/Backgr-Login.jpg";
import { overlay, Dialog } from "react-native-paper";
import { List, ListItem, SearchBar } from 'react-native-elements';
import table from "../data/table";
import { RowTable, Separator } from "../components/RowTable";
import { and } from "react-native-reanimated";
import { SERVER_ID } from "../config/properties";
import axios from "axios";

export default class BillOfTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      table: [],
      search: '',
      toggleInput: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { route } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("focus", () => {
      // if (navigation.params != undefined ) 
      console.log(route.parmas);
    });
    axios.get(`${SERVER_ID}table/all`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ table: res.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.newTable !== this.state.newTable) {
      axios.get(`${SERVER_ID}table/all`).then((res) => {
        this.setState({ table: res.data });
        this.setState({ result: res.data });
      });
    } //chi  update lai UI khi newTable nhan value moi (sau moi lan them do an moi)
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener
  }
  saveNewData(data) {
    //ham nay se duoc invoke khi save du lieu moi
    axios
      .post(`${SERVER_ID}table/add`, data)
      .then((res) => console.log(res))
      .then(this.setState({ newTable: data }));
    //sau khi thuc hien post thanh cong va tra ve response, set lai state cua NewTable
    //luc nay componentDidUpdate se so sanh state moi va state cu, dong thoi thuc hien call api nhu tren
  }

  updateSearch = search => {
    const newData = this.state.table.filter((item) => {
      const itemData = `${item.fullName.toUpperCase()}`;
      const textData = search.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      result: newData,
      search,
    });
    if(search == '') this.state.result = this.state.table.filter((item) => item.status == "full");
    else this.state.result = this.state.data;

  };


  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    this.state.result = this.state.result.filter((item) => item.status == "full")
    console.log(this.state.result.filter((item) => item.status == "full"));
    console.log(search);
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={{...styles.overlayContainer}}>
          <SearchBar 
                  onChangeText={this.updateSearch}
                  value={search}
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
            <View style={{ width: "25%" }}>
                  <Text style={styles.title}>Name</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.title}>Seats</Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text style={styles.title}>price</Text>
                </View>
                <View style={{ width: "15%" }}>
                  <Text style={styles.subtitle}>Status</Text>
                </View>
              </View>
              </View>
              <FlatList
                      data={this.state.result}
                      renderItem={({ item }) =>  <RowTable item={item} 
                      onPress = {() => navigation.navigate('bill', {table: item})}/>}
                      ItemSeparatorComponent={Separator}
                      ListHeaderComponent={() => <Separator />}
                      ListFooterComponent={() => <Separator />}
                      keyExtractor={(item) => {
                        return `${item.name}`;} }
                    />


        </View>
      </ImageBackground>
    );
  }
};


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
  tableContainer: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    marginLeft: 10,
    marginRight: 10,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    height: 40,
    //opacity: .5,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 85,
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
