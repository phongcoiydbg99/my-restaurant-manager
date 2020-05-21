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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Splash } from "../components/Splash";

import DangNhap from "../screens/dang_nhap";
import DangKi from "../screens/dang_ky";
import Welcome from "../screens/Welcome";
import QuanLyBan from "../screens/quan_ly_ban";
import QuanLyMenu from "../screens/quan_ly_menu";
import ThongKe from "../screens/thong_ke";
import HoaDon from "../screens/hoa_don";
import ThongTin from "../screens/thong_tin";
import Logo from "../assets/gb2.png";
import BackAv from "../assets/Backgr-Login.jpg";
import Avatar from "../assets/avatar.jpg";

const QuanLyBanStack = createStackNavigator();
const QuanLyBanStackScreen = () => (
  <QuanLyBanStack.Navigator>
    <QuanLyBanStack.Screen
      name="QuanLyBan"
      component={QuanLyBan}
      options={{
        headerTitle: false,
        headerTransparent: true,
        headerStyle: {
          height: 80,
          opacity: 0.9,
        },
        //headerStatusBarHeight: 20,
        headerRight: (props) => <LogoTitle {...props} />,
        headerBackground: () => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              <Text style={styles.GBtype}>GB</Text>
              <Text > Restaurant</Text>
            </Text>
          </View>
        ),
      }}
    />
  </QuanLyBanStack.Navigator>
);

const QuanLyMenuStack = createStackNavigator();
const QuanLyMenuStackScreen = () => (
  <QuanLyMenuStack.Navigator>
    <QuanLyMenuStack.Screen 
    name="QuanLyMenu" 
    component={QuanLyMenu}
    options={{
      headerTitle: false,
      headerTransparent: true,
      headerStyle: {
        height: 80,
        opacity: .9,
      },
      //headerStatusBarHeight: 20,
      headerRight: 
        props => (<LogoTitle {...props} />
        )
      ,
      headerBackground: () =>(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
              <Text style={styles.GBtype}>GB</Text>
              <Text > Restaurant</Text>
            </Text>
          </View>
      ),
    }}
    />
  </QuanLyMenuStack.Navigator>
);

const ThongKeStack = createStackNavigator();
const ThongKeStackScreen = () => (
  <ThongKeStack.Navigator>
    <ThongKeStack.Screen name="ThongKe" component={ThongKe} />
  </ThongKeStack.Navigator>
);

const HoaDonStack = createStackNavigator();
const HoaDonStackScreen = () => (
  <HoaDonStack.Navigator>
    <HoaDonStack.Screen
      name="HoaDon"
      component={HoaDon} 
      options={{
        headerTitle: false,
        headerTransparent: true,
        headerStyle: {
          height: 80,
          opacity: .9,
        },
        //headerStatusBarHeight: 20,
        headerRight: 
          props => (<LogoTitle {...props} />
          )
        ,
        headerBackground: () =>(
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              <Text style={styles.GBtype}>GB</Text>
              <Text > Restaurant</Text>
            </Text>
          </View>
        ),
      }}
    />
  </HoaDonStack.Navigator>
);

const ThongTinStack = createStackNavigator();
const ThongTinStackScreen = () => (
  <ThongTinStack.Navigator>
    <ThongTinStack.Screen name="ThongTin" component={ThongTin} />
  </ThongTinStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Table"
      component={QuanLyBanStackScreen}
      options={{
        tabBarLabel: "Table",
        showLabel: false,
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="tablet-dashboard"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Menu"
      component={QuanLyMenuStackScreen}
      options={{
        tabBarLabel: "Menu",
        tabBarIcon: (props) => (
          <MaterialIcons
            name="restaurant-menu"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Statistical"
      component={ThongKeStackScreen}
      options={{
        tabBarLabel: "ThongKe",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="chart-areaspline"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Bill"
      component={HoaDonStackScreen}
      options={{
        tabBarLabel: "Bill",
        tabBarIcon: (props) => (
          <FontAwesome5
            name="money-bill-alt"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
  </AppTabs.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="DangNhap"
      component={DangNhap}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="DangKi"
      component={DangKi}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground source={BackAv} style={styles.container}>
        <View style={styles.overlayContainer}>
          <Image source={Avatar} style={styles.avatar}></Image>
          <Text style={styles.text}>Name</Text>
        </View>
      </ImageBackground>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator drawerContent={props => <CustomDrawerContent {...props} /> }>
      <AppDrawer.Screen name="Home" component={AppTabsScreen} />
      <AppDrawer.Screen name="Profile" component={ThongTinStackScreen} />
    </AppDrawer.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{ animationEnabled: false }}
    mode="modal"
    initialRouteName="AuthStackScreen"
  >
    <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
    <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: (u) => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* {!userToken ? <RootStackScreen /> : <AppDrawerScreen />} */}
        <AppDrawerScreen />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  container1: {
    //flex: 1,
    width: "100%",
    height: "100%",
    //justifyContent: "center",
    //alignItems: "center",
    //marginBottom: 20,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(85,85,85,0.7)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "rgba(255,255,255,0.7)",
  },
  text: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#373534', 
    opacity: .7, 
    borderWidth: 1, 
    borderColor: '#707070',
  },
  headerTitle: {
    color: '#ffffff', 
    fontSize: 25, 
    marginTop: 35, 
    marginBottom: 15, 
    marginLeft: 12, 
    fontStyle: 'italic'
  },
  GBtype: {
    fontWeight: 'bold',
  },
});


function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, marginRight: 12,}}
      source={require('../assets/gb1.png')}
    />
  );
}