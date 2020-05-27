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
} from "react-native";

import { AuthContext } from "../context/context";
import Backgr from "../assets/Backgr-Load.jpg";
import Logo from "../assets/gb2.png";
const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
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
  logo: {
    width: 150,
    height: 200,
  },
  Sologan: {
    color: "rgba(169,169,169,1)",
  }
});

export const Splash = () => (
  <ScreenContainer>
       <ImageBackground
    source = {Backgr} style ={styles.container1}
    >
      <View style = {styles.overlayContainer}>
      <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
          <Text style = {styles.Sologan}>Simple and easy-to-use restaurant</Text>
          <Text style={styles.Sologan}>management system</Text>
      </View>
    </ImageBackground>
  </ScreenContainer>
);
