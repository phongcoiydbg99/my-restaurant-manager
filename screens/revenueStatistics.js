import axios from "axios";
import React, { Component } from 'react';
import {
  Dimensions,

  FlatList, ImageBackground, StyleSheet, Text, View
} from "react-native";
import {
  LineChart
} from 'react-native-chart-kit';
import Background from "../assets/Backgr-Login.jpg";
import { RowRevenue, Separator } from '../components/RowRevenue';
import { SERVER_ID } from "../config/properties";


export default class revenueStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [' '],
      data: [0],
      revenueMonth: '',
      dataRevenueMonth: [],
      revenueStatistics: {},
    };
    this.data = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data,
        },
      ], 
    }
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
    axios.get(`${SERVER_ID}revenue/all`).then((res) => {
      this.setState({ dataRevenueMonth: res.data });
    });
  }

  render() {
    const { navigation } = this.props;
    this.state.dataRevenueMonth.filter((item) => {
      this.state.labels.push(item.month.toString().substr(0, 3));
      this.state.data.push(item.money / 1000000);
    });
    console.log(this.state.labels);
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View style={styles.overlayContainer}>

          <View style={styles.billTitle}>
            <Text style={styles.textBillTitle}>Overview</Text>
          </View>
          <LineChart
            data={this.data}
            width={WIDTH} // from react-native
            height={220}
            yAxisSuffix={'m'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 62, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.9,
              propsForDots: {
                r: "6",
                // strokeWidth: "2",
                // stroke: "#ffa726",
                fill: `rgba(0, 62, 255, 1)`,
              },
              propsForBackgroundLines: {
                stroke: "#000",
                strokeLinejoin: 'bevel',
                fillRule: 'evenodd',
                strokeDasharray: [0, WIDTH],
              },
            }}
            // verticalLabelRotation={30}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 0,
            }}
          />
          <View style={{ width: WIDTH, height: HEIGHT - 320, marginTop: 10 }}>
            <Text style={styles.textBillTitle}>Revenue Statistics</Text>
            <FlatList
              data={this.state.dataRevenueMonth}
              renderItem={({ item }) => <RowRevenue item={item}
              />}
              ItemSeparatorComponent={Separator}
              ListHeaderComponent={() => <Separator />}
              ListFooterComponent={() => <Separator />}
              keyExtractor={(item) => {
                return `${item.month}`;
              }}
            />
          </View>

        </View>
      </ImageBackground>
    )
  }
}


const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    //opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    marginTop: 70,
    // backgroundColor: "rgba(60,50,41,0.59)",
    backgroundColor: '#fff',
  },
  tableContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  searchBarContainer: {
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
  textBillTitle: {
    color: '#000',
    fontSize: 28,
    textAlign: 'left',
    marginTop: 5,
    paddingLeft: 10,
  },
});

export const Order = ({ item }) => (
  <View style={{ flexDirection: 'row', }}>
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