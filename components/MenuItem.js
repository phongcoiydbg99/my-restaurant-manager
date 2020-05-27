import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    width: WIDTH - 40,
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
  separator: {
    backgroundColor: "#ececec",
    height: 1,
  },
  right: {
    alignItems: "flex-end",
    flex: 1,
  },
});

export const MenuItem = ({ item, onPress, width, right }) => (
         <View style={styles.container} onPress={onPress}>
           <View style={styles.content}>
             <View style={{ width: "10%" }}>
               <Text style={styles.title}>{item.id}</Text>
             </View>
             <View style={{ width: "30%" }}>
               <Text style={styles.title}>{item.Name}</Text>
             </View>
             <View style={{ width: "15%", paddingHorizontal: "5%" }}>
               <Text style={styles.title}>{item.Price}</Text>
             </View>
             <Animated.View
               style={{
                 width: width,
                 marginRight: right,
                 flexDirection: "row",
                 alignItems: "flex-start",
                 justifyContent: "space-between",
               }}
             >
               <TouchableOpacity onPress={onPress}>
                 <MaterialIcons name="edit" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity>
                 <MaterialCommunityIcons
                   name="delete-forever"
                   size={24}
                   color="black"
                 />
               </TouchableOpacity>
             </Animated.View>
           </View>
         </View>
       );

export const Separator = () => <View style={styles.separator} />;
