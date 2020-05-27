import React, {useState} from "react";
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
import { RowTable, Separator } from "../components/RowTable";

import Background from "../assets/Backgr-Login.jpg";
import { Ionicons } from "@expo/vector-icons";
import menu from "../data/menu";

const { width: WIDTH } = Dimensions.get("window");

export default ({ navigation,route }) => {
  const menuInfo = route.params.menu;
  //const [menu, setMenu] = useState(menuInfo);
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [Species, setSpecies] = useState('');
  
  const editMenu = () => {
    const newMenu = { ...menu, menu: Name,Price:Price,Species:Species };
    settable(newMenu); // Now it works
    navigation.pop({ datamenu: newmenu });
  };

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.pop()}
        >
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            width: "90%",
            height: "90%",
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <View style={styles.elementForm}>
            <Text style={styles.title}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder={tableInfo.table}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              underLineColorAndroid="transparent"
              onChangeText={(e) => {
                setname(e);
              }}
            />
          </View>

          <View style={styles.elementForm}>
            <Text style={styles.title}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder={tableInfo.people}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              underLineColorAndroid="transparent"
              onChangeText={(text) => setpeople(text)}
            />
          </View>

          <View style={styles.elementForm}>
            <Text style={styles.title}>Species</Text>
            <TextInput
              style={styles.input}
              placeholder={tableInfo.status}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              underLineColorAndroid="transparent"
              onChangeText={(text) => setstatus(text)}
            />
          </View>
          <View style={styles.elementForm}>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => editTable()}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text>{JSON.stringify(tableInfo, null, 2)}</Text> */}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
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
    width: "20%",
    fontSize: 18,
    fontWeight: "600",
    color: "#3a3a3a",
    marginLeft: 10,
    marginTop: 10,
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    marginTop: 2,
  },
  btnBack: {
    position: "absolute",
    top: 16,
    left: 20,
  },
  input: {
    width: "60%",
    height: 45,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 1)",
    marginHorizontal: 25,
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
});
