import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <View style={styles.member}>
          <Text>Thay đổi mật khẩu</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </View> */}
        <View style={styles.line}></View>
        <View style={styles.member}>
          <Text>Kiểm chứng đơn hàng</Text>
          <MaterialIcons name="radio-button-on" size={24} color="#FF8C00" />
        </View>
        <View style={styles.line}></View>
        <View style={styles.member}>
          <Text>Nhận hóa đơn điện tử</Text>
          <MaterialIcons name="radio-button-off" size={24} color="#FF8C00" />
        </View>
        <View style={styles.line}></View>
        <View style={styles.member}>
          <Text>Thông báo</Text>
          <MaterialIcons name="radio-button-on" size={24} color="#FF8C00" />
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
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
