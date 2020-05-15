import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "../context/context";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { MaterialIcons } from "@expo/vector-icons"; 
import { FontAwesome5 } from "@expo/vector-icons";
import { Splash } from '../components/Splash';

import DangNhap from "../screens/dang_nhap";
import DangKi from "../screens/dang_ky";
import Welcome from "../screens/Welcome";
import QuanLyBan from "../screens/quan_ly_ban";
import QuanLyMenu from "../screens/quan_ly_menu";
import ThongKe from "../screens/thong_ke";
import HoaDon from "../screens/hoa_don";
import ThongTin from "../screens/thong_tin";

const QuanLyBanStack = createStackNavigator();
const QuanLyBanStackScreen = () => (
  <QuanLyBanStack.Navigator>
    <QuanLyBanStack.Screen
      name="QuanLyBan"
      component={QuanLyBan}
      options={{
        headerTitle: "Tables",
      }}
    />
  </QuanLyBanStack.Navigator>
);

const QuanLyMenuStack = createStackNavigator();
const QuanLyMenuStackScreen = () => (
  <QuanLyMenuStack.Navigator>
    <QuanLyMenuStack.Screen name="QuanLyMenu" component={QuanLyBan} />
  </QuanLyMenuStack.Navigator>
);

const ThongKeStack = createStackNavigator();
const ThongKeStackScreen = () => (
  <ThongKeStack.Navigator>
    <ThongKeStack.Screen name="ThongKe" component={QuanLyBan} />
  </ThongKeStack.Navigator>
);

const HoaDonStack = createStackNavigator();
const HoaDonStackScreen = () => (
  <HoaDonStack.Navigator>
    <HoaDonStack.Screen name="HoaDon" component={QuanLyBan} />
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
      name="ThongKe"
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

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator >
    <AppDrawer.Screen name="Home" component={AppTabsScreen} />
    <AppDrawer.Screen name="Profile" component={ThongTinStackScreen} />
  </AppDrawer.Navigator>
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
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, [])

  React.useEffect(() => {
    setTimeout(
      () => {
        setIsLoading(false);
      }, 1000)
  },[])

  if (isLoading) {
    return <Splash/>
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!userToken ? <AuthStackScreen /> : <AppDrawerScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
