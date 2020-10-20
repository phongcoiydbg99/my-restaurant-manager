import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import {
  Dimensions, Image, ImageBackground, StyleSheet, Text,






  TouchableOpacity, View
} from "react-native";
import { Input } from "react-native-elements";
import Avatar from "../assets/avatar.jpg";
import Background from "../assets/Backgr-Login.jpg";
import Response from "../components/Response";
import { getCurrentDateTime } from "../config/util";

const { width: WIDTH } = Dimensions.get("window");


export default ({ navigation }) => {
  const [user, setuser] = useState({ emp: {} });
  const [dis, setdis] = useState(true);
  const [check, setcheck] = useState(true)
  const [edit, setedit] = useState(false);
  const [action, setaction] = useState({});
  if (check)
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        AsyncStorage.getItem("user").then((u) => {
          // setuser(user);
          setuser(JSON.parse(u));
          setcheck(false);
        });
      }
    });
  React.useEffect(() => {
    if (edit) {
      setdis(true);
      setedit(false);
    }
  });
  editProfile = () => {
    if (
      user.emp.fullName == "" ||
      user.emp.phone == "" ||
      user.emp.email == "" ||
      user.emp.diachi == ""
    ) {
      setaction({
        ...action,
        name: "formError",
        date: getCurrentDateTime(),
      });
      //this.setState({action:'formError',actionTime:getCurrentDateTime()});
    } else {
      setedit(true);
      console.log(user);
      setaction({
        ...action,
        name: "postTable",
        date: getCurrentDateTime(),
        msg: "Sửa thông tin thành công",
      });
    }
  };
  let edtBtn;
  if (!dis)
    edtBtn = (
      <View style={styles.elementForm}>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={editProfile}
        >
          <Text>Sửa</Text>
        </TouchableOpacity>
      </View>
    );
  else edtBtn = <View />;
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.overlayContainer}>
        {/* <View style={{ marginTop: 70 }}> */}
        <Response action={action} />
        <View style={{ ...styles.header }}>
          <Image source={Avatar} style={styles.avatar}></Image>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setdis(false)}
            style={{
              height: 40,
              borderRadius: 10,
              width: 40,
              marginLeft: WIDTH - 50,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="edit" size={24} color="orange" />
          </TouchableOpacity>
          <Input
            placeholder="Họ tên"
            label="Họ tên :"
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputstyle}
            value={user.emp.fullName}
            onChangeText={(text) =>
              setuser({ emp: { ...user.emp, fullName: text } })
            }
            disabled={dis}
          />
          <Input
            placeholder="Số điện thoại"
            label="Số điện thoại :"
            value={String(user.emp.phone)}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputstyle}
            keyboardType="numeric"
            onChangeText={(text) =>
              setuser({ emp: { ...user.emp, phone: text } })
            }
            disabled={dis}
          />
          <Input
            placeholder="Email"
            label="Email :"
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputstyle}
            value={user.emp.email}
            onChangeText={(text) =>
              setuser({ emp: { ...user.emp, email: text } })
            }
            disabled={dis}
          />
          <Input
            placeholder="Địa chỉ"
            label="Địa chỉ :"
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputstyle}
            value={user.emp.diachi}
            onChangeText={(text) =>
              setuser({ emp: { ...user.emp, diachi: text } })
            }
            disabled={dis}
          />
        </View>
        {edtBtn}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    // opacity: 0.9,
  },
  overlayContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60,50,41,0.59)",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 70,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.7)",
    margin: 10,
  },
  text: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  part: {
    backgroundColor: "#222121",
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: "45%",
  },
  labelStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    width: WIDTH - 50,
  },
  inputstyle: {
    color: "#fff",
  },
  elementForm: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSubmit: {
    marginTop: 10,
    width: "60%",
    backgroundColor: "#ff6600",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
