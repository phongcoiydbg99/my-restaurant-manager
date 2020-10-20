import React from "react";
import {
  Image,
  StyleSheet, Text,


  TouchableOpacity, View
} from "react-native";
import { SERVER_IMAGE_ID } from "../config/properties";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#ececec",
    // elevation: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlignVertical: 'center'
  },

});

export const RowFav = ({ item, month }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.container}
  >
    <View style={{ flexDirection: 'row', }}>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <Image
          source={{
            uri:
              `${SERVER_IMAGE_ID}` +
              "public/" +
              item.dishName +
              ".png",
          }}
          style={{ alignItems: "flex-start", marginTop: 5, width: 80, height: 80, borderColor: '#3BAA9E', borderRadius: 50, }}
        />
        <View style={{ marginLeft: 20, marginTop: 10, justifyContent: 'center' }}>
          <Text style={styles.title}>{item.fullName}</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 20, marginRight: 5 }}>
        <Text style={{ color: '#888888', textAlignVertical: 'bottom', }}>Order time  </Text>
        <Text style={{ fontSize: 22, textAlignVertical: 'bottom' }}>{month}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const Separator = () => <View style={styles.separator} />;
