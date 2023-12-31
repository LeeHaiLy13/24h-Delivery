import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.member}>
        <Text>Hỗ trợ qua chat</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
      <View style={styles.line}></View>
      <View style={styles.member}>
        <Text>Hỗ trợ qua số điện thoại</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
      <View style={styles.line}></View>
      <View style={styles.member}>
        <Text>Hỗ trợ qua email</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
      <View style={styles.line}></View>
      <View style={styles.member}>
        <Text>Gửi phản hồi cho chúng tôi</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
      <View style={styles.line}></View>
    </View>

      </View>
      
  );
};

const styles = StyleSheet.create({
  container: {

  },
  content:{
    backgroundColor: "white",
    marginTop: 15,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 8,
    borderRadius: 8,
  },

});