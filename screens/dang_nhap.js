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
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Background from "../assets/Backgr-Load.jpg";
import Logo from "../assets/gb2.png";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const { width: WIDTH } = Dimensions.get("window");

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

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
    backgroundColor: "rgba(255,255,255,0.9)",
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
  text: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  underline: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  textMsg: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
});

export default ({ error, authInfo, setInfo }) => {
  const navigation = useNavigation();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  // const { authInfo } = React.useContext(authContext);
  // console.log(authContext);
  const onChangeUser = (text) => {
    setusername(text);
  };
  React.useEffect(() => {
    if (authInfo.status === "Logged" && authInfo.logged === true) {
      // console.log(authInfo.user);
      setusername("");
      setpassword("");
      if (authInfo.user.quyen_han == "NHANVIEN")
        navigation.navigate("AppDrawerNVScreen");
      else navigation.navigate("AppDrawerScreen");
    }
  }, [authInfo.status]);
  const onChangePassword = (text) => {
    setpassword(text);
  };

  const checkLogin = () => {
    setInfo({
      ...authInfo,
      user: { username: username, password: password },
      status: "Logging",
    });
  };

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Username"}
            value={username}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underLineColorAndroid="transparent"
            onChangeText={(text) => onChangeUser(text)}
          />
          <FontAwesome
            name="user-o"
            size={24}
            color="rgba(0, 0, 0, 2)"
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            value={password}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underLineColorAndroid="transparent"
            secureTextEntry={true}
            onChangeText={(text) => onChangePassword(text)}
          />
          <FontAwesome5
            name="lock"
            size={24}
            color="rgba(0, 0, 0, 2)"
            style={styles.inputIcon}
          />
        </View>

        {/* <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => navigation.push("DangKi")}
        >
          <Text style={styles.underline}>Create account </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btn} onPress={() => checkLogin()}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.textMsg}>{error}</Text>
      </View>
    </ImageBackground>
  );
};
