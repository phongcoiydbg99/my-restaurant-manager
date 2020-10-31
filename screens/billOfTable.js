import axios from "axios";
import React, { Component } from "react";
import {
  Dimensions,

  FlatList, ImageBackground, StyleSheet, View
} from "react-native";
import { SearchBar } from "react-native-elements";
import Background from "../assets/Backgr-Login.jpg";
import { RowBill, Separator } from "../components/RowBill";
import { SERVER_ID } from "../config/properties";

export default class BillOfTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      table: [],
      totalPrice: [],
      newTable: [],
      totalBill: [],
      onUpdate: false,
      search: "",
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { route } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("focus", () => {
      if (navigation.params != undefined) console.log(route.parmas);
    });
    axios.get(`${SERVER_ID}table/all`).then((res) => {
      this.setState({ result: res.data });
      this.setState({ table: res.data });
    });
    axios.get(`${SERVER_ID}table_dish/all`).then((res) => {
      this.setState({ totalPrice: res.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    this.state.totalBill = [];
    if (
      prevProps.route.params !== this.props.route.params
      //param nay chua thong tin table moi tu add_table
      //chi update neu params thay doi
    ) {
      axios.get(`${SERVER_ID}table/all`).then((res) => {
        this.setState({ table: res.data });
        this.setState({ result: res.data });
      });
    } //chi  update lai UI khi newTable nhan value moi (sau moi lan them do an moi)
  }

  updateSearch = (search) => {
    const newData = this.state.table.filter((item) => {
      const itemData = `${item.fullName.toUpperCase()}`;
      const textData = search.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      result: newData,
      search,
    });
    if (search == "")
      this.state.result = this.state.table.filter(
        (item) => item.status == "full"
      );
    else this.state.result = this.state.data;
  };

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    this.state.result = this.state.result.filter(
      (item) => item.status == "full"
    );
    this.state.result.filter((item) => {
      const temp = item.name;
      var t_price = item.price;
      this.state.totalPrice.filter((item1) => {
        if (item1.id.table.name == temp) {
          t_price = t_price + item1.id.dish.price * item1.call_number;
        }
      });
      // let dem = {
      //   name: item.name,
      //   chairNum: item.chairNum,
      //   status: item.status,
      //   price: item.price,
      //   fullName: item.fullName,
      //   reserve_time: item.reserve_time,
      //   totalPrice: t_price,
      // };
      // console.log(dem);
      if (t_price > item.price)
        this.state.totalBill.push({
          name: item.name,
          chairNum: item.chairNum,
          status: item.status,
          price: item.price,
          fullName: item.fullName,
          reserve_time: item.reserve_time,
          totalPrice: t_price,
        });
      console.log(this.state.totalBill);
    });

    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={{ ...styles.overlayContainer }}>
          <SearchBar
            onChangeText={this.updateSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor="#86939e"
            platform="android"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.SearchBar}
            placeholderTextColor={"#666"}
          />

          <FlatList
            data={this.state.totalBill}
            renderItem={({ item }) => (
              <RowBill
                item={item}
                onPress={() => navigation.navigate("bill", { table: item })}
              />
            )}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={() => <Separator />}
            ListFooterComponent={() => <Separator />}
            keyExtractor={(item) => {
              return `${item.name}`;
            }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

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
    height: 50,
    //opacity: .5,
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
    marginTop: 70,
  },
  SearchBar: {
    height: 27,
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
