import React, { useState, Component } from "react";
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
    TouchableHighlight,
    TouchableWithoutFeedback,
    FlatList,
    Modal,
    CheckBox,
    Picker,
    Animated,
} from "react-native";

import { MenuItem, Separator } from "../components/MenuItem";
import { List, ListItem, SearchBar,Overlay, Input } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {SERVER_ID} from "../config/properties";
import Background from "../assets/Backgr-Login.jpg";
import icon from "../assets/calendar.png";
import clock from "../assets/clock.png";
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import RowOrder from "../components/RowOrder"
export default class order extends Component{
    constructor(props){
        super(props);
        this.state={
            order:[],
            toogleMode:false,
            btWidth: new Animated.Value(0),
            width: new Animated.Value(0),
            right: new Animated.Value(0),
            overlay:false,
            dishName:"",
            tableName:"",
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            datetime:"",
            time:"",
            call_number:"",
            update:"notDone"
        }
    }
    componentDidMount(){
        axios.get(`${SERVER_ID}table_dish/all`).then(res=> {this.setState({order:res.data},()=>console.log(this.state));
                                                        })
        .catch(err=> console.log(err));
    }
    
    showDatePicker = () => {
      this.setState({ isDatePickerVisible: true });
    };
    showTimePicker = () => {
      this.setState({ isTimePickerVisible: true });
    };
  
    hideDatePicker = () => {
      this.setState({ isDatePickerVisible: false });
    };
    hideTimePicker = () => {
      this.setState({ isTimePickerVisible: false });
    };
    componentDidUpdate(prevProps, prevState){
       if(prevState.update == 'notDone' && this.state.update == 'done'){
        axios.get(`${SERVER_ID}table_dish/all`).then(res=> {this.setState({order:res.data},()=>console.log(this.state));
        }).then(this.setState({update:'notDone'}))
        .catch(err=> console.log(err));
       }
    }
    animation = new Animated.Value(0);
    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;
    
        Animated.spring(this.animation, {
          toValue,
          friction: 5,
        }).start();
    
        this.open = !this.open;
      };
      addOrder=() =>{
        let newOrder = {
           call_time: this.state.datetime + " " + this.state.time,
           call_number: this.state.call_number
        }
        axios.post(`${SERVER_ID}table_dish/add/${this.state.tableName}/${this.state.dishName}`,newOrder).then(this.setState({overlay:false, update:'done'}))
        .catch(err=>console.log(err));
      }
    toggleEditMode() {
        if (!this.state.toggleMode) {
          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.width, { toValue: 60, duration: 0 }),
              Animated.timing(this.state.right, { toValue: 30, duration: 0 }),
            ]),
          ]).start();
        } else {
          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.width, { toValue: 0, duration: 0 }),
              Animated.timing(this.state.right, { toValue: 0, duration: 0 }),
            ]),
          ]).start();
        }
        this.state.toggleMode = !this.state.toggleMode;
      }
    render(){
        const sortStyle = {
            transform: [
              {
                scale: this.animation,
              },
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
          };
          const {navigation} = this.props;
          const editStyle = {
            transform: [
              {
                scale: this.animation,
              },
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -140],
                }),
              },
            ],
          };
          const addStyle = {
            transform: [
              {
                scale: this.animation,
              },
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -80],
                }),
              },
            ],
          };
          const rotation = {
            transform: [
              {
                rotate: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "45deg"],
                }),
              },
            ],
          };
          const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          });
        return(
            <ImageBackground source={Background} style={styles.container}>
              <Overlay isVisible={this.state.overlay} onBackdropPress={()=> this.setState({overlay:false})}>
                   <View style={styles.modalView}>
                       <Input
                           placeholder="TableName"
                           label="TableName"
                           labelStyle={styles.labelStyle}
                             inputStyle={styles.inputstyle}
                         value={this.state.tableName}
                        onChangeText={(text) => this.setState({ tableName: text })}
                        />
                     <Input
                        placeholder="DishName"
                        label="DishName"
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputstyle}
                        value={this.state.dishName}
                        onChangeText={(text) => this.setState({ dishName: text })}
                      />
                        
                       <Input
                            placeholder="CallNum"
                             label="CallNum"
                            value={this.state.call_number}
                             labelStyle={styles.labelStyle}
                            inputStyle={styles.inputstyle}
                             keyboardType="numeric"
                            onChangeText={(text) => this.setState({ call_number: text })}
                        />
                        <Input
              inputContainerStyle={{ width: WIDTH - 100 }}
              placeholder="date"
              label="reserved_time"
              value={this.state.datetime}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
            <TouchableWithoutFeedback onPress={this.showDatePicker}>
              <View style={{ marginLeft: -60, marginTop: 25 }}>
                <Image source={icon} style={{ width: 30, height: 30 }}></Image>
              </View>
            </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Input
              inputContainerStyle={{ width: WIDTH - 100 }}
              placeholder="time"
              value={this.state.time}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
            <TouchableWithoutFeedback onPress={this.showTimePicker}>
              <View style={{ marginLeft: -60, marginTop: 10 }}>
                <Image source={clock} style={{ width: 30, height: 30 }}></Image>
              </View>
            </TouchableWithoutFeedback>
                        
                        
                        <DateTimePickerModal
                              isVisible={this.state.isDatePickerVisible}
                              mode="date"
                              onConfirm={this.handleConfirm}
                              onCancel={this.hideDatePicker}
                            />
                        <DateTimePickerModal
                              isVisible={this.state.isTimePickerVisible}
                              mode="time"
                              onConfirm={this.handleConfirmTime}
                              onCancel={this.hideTimePicker
                              }
                          />
                          <View style={styles.elementForm}>
                              <TouchableOpacity
                                style={styles.btnSubmit}
                                onPress={() => this.addOrder()}
                              >
                                <Text>ADD</Text>
                              </TouchableOpacity>
          </View>
                   </View>
          </View>

              </Overlay>
                 <View style={{flex:1}}></View>
                 <View style={styles.overlayContainer}>
                     <FlatList data={this.state.order}
                               keyExtractor={item=>{return `${item.id.table.name}` + `${item.id.dish.name}`}}
                               renderItem={({item, index}) =>{return(
                                  <RowOrder item={item} width={this.state.width}
                                  right={this.state.right} index={index} navigation={this.props.navigation}/>);
                               }} />
                 </View>
        <View
          style={{
            ...styles.floatinContainer,
            bottom: 70,
            right: 40,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ modalVisible: true });
              this.toggleMenu();
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, sortStyle, opacity]}
            >
              <MaterialIcons name="sort" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleEditMode();
              
              
              this.toggleMenu();
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, editStyle, opacity]}
            >
              <FontAwesome5 name="edit" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleMenu();
              this.setState({overlay:true});
              this.toggleEditMode();
              // this.setState({ addmodalVisible: true });
              
            }}
          >
            <Animated.View
              style={[styles.button, styles.floating, addStyle, opacity]}
            >
              <AntDesign name="plus" size={20} color="#f02a4b" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.toggleMenu()}>
            <Animated.View style={[styles.button, styles.menu, rotation]}>
              <AntDesign name="plus" size={24} color="#fff" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>


            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
      },
      overlayContainer: {
        flex: 5,
        backgroundColor: "rgba(60,50,41,0.59)",
      },
      label: {
        margin: 8,
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
      logo: {
        width: 150,
        height: 200,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      searchBarContainer: {
        backgroundColor: "#fff",
        height: 50,
        borderRadius: 5,
        //opacity: .5,
        marginTop: 70,
      },
      SearchBar: {
        height: 30,
      },
      modalView: {
        width:300, 
        
        justifyContent: "center",
         
        backgroundColor: "white",
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        // borderRadius: 5,
      },
      modalContent: {
        width: WIDTH - 50,
        justifyContent: "center",
        padding: 15,
        fontSize: 16,
        // borderBottomWidth: 0.5,
      },
      inputClose: {
        position: "absolute",
        top: 8,
        right: 5,
      },
      floatinContainer: {
        alignItems: "center",
        position: "absolute",
      },
      button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#f02a4b",
        shadowOpacity: 1,
        shadowOffset: { height: 10 },
        elevation: 3,
      },
      menu: {
        backgroundColor: "#f02a4b",
      },
      floating: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
      },
      labelStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      inputStyle: {
        color: "#fff",
      },
      btnBack: {
        margin: 10,
      },
      elementForm: {
        marginTop: 10,
        flexDirection: "row",
      },
      btnSubmit: {
        marginTop: 10,
        width: "60%",
        backgroundColor: "#ff1",
        height: 40,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
      },
})