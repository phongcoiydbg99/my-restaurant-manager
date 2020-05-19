import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    width: WIDTH-50,
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

export const RowTable = ({ item }) => (
         <TouchableOpacity style={styles.container}>
           <View style={styles.content}>
             <View>
               <Text style={styles.title}>{item.id}</Text>
             </View>
             <View>
               <Text style={styles.title}>{item.table}</Text>
             </View>
             <View>
               <Text style={styles.title}>{item.people}</Text>
             </View>
             <View>
               <Text style={styles.subtitle}>{item.status}</Text>
             </View>
           </View>
         </TouchableOpacity>
       );

export const Separator = () => <View style={styles.separator} />;
