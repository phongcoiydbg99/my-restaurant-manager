import React, { useState } from "react";
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
  SafeAreaView,
} from "react-native";

import { AuthContext } from "../context/context";
import Background from "../assets/Backgr-Login.jpg";
import Logo from "../assets/gb2.png";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(85,85,85,0.5)",
  },
  logoContainer: {
    top: -50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 200,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(255,255,255,0.7)",
    color: "rgba(0, 0, 0, 1)",
    marginHorizontal: 25,
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37,
  },
  btn: {
    width: WIDTH - 100,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,102,0,1)",
    borderRadius: 25,
  },
  btnBack: {
    position: "absolute",
    top: 16,
    left: 20,
  },
  text: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  underline: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);

  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);

  const onChangeUser = (text) => {
    setusername(text);
  };

  const onChangePassword = (text) => {
    setpassword(text);
  };

  const onChangeConfirmPassword = (text) => {
    setconfirmPassword(text);
  };

  const checkSignUp = () => {
    if (confirmPassword == password) {
      var user = {
        username: username ,
        password: password ,
      };
      signUp(user);
    } else alert("Sai");
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

        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="user-o"
            size={24}
            color="rgba(0, 0, 0, 2)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"Username"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underLineColorAndroid="transparent"
            onChangeText={(text) => onChangeUser(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5
            name="lock"
            size={24}
            color="rgba(0, 0, 0, 2)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underLineColorAndroid="transparent"
            secureTextEntry={true}
            onChangeText={(text) => onChangePassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="lock"
            size={24}
            color="rgba(0, 0, 0, 2)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"Confirm Password"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underLineColorAndroid="transparent"
            secureTextEntry={true}
            onChangeText={(text) => onChangeConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => checkSignUp()}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};