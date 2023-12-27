import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, FlatList, Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const GiftScreen = () => {
  // Dữ liệu mẫu về ưu đãi với link hình ảnh

  const data = [
    {
      id: "1",
      title: "Ưu đãi 1: Giảm giá",
      image:
        "https://stc.shopiness.vn/deal/2021/07/20/1/b/d/2/1626770741770_540.png",
    },
    {
      id: "2",
      title: "Ưu đãi 2: Miễn phí vận chuyển",
      image: "https://img-s3.ws.mms.shopee.sg/vn-11134141-7r98o-lkyy3u65aea3db",
    },
    {
      id: "3",
      title: "Ưu đãi 3: Cho phái nữ nhân ngày 20/10",
      image:
        "https://sobanhang.com/wp-content/uploads/2023/10/khuyen-mai-20-10-1024x429.jpg",
    },
    {
      id: "4",
      title: "Ưu đãi 4: Khi thanh toán qua Vietel Pay",
      image:
        "https://viettelmoney.vn/wp-content/uploads/2022/10/doi-voucher.jpg",
    },
    {
      id: "5",
      title: "Ưu đãi 5: Khi thanh toán qua Momo",
      image:
        "https://jetpay.vn/wp-content/uploads/2023/05/imgpsh_fullsize_anim-58-1-1024x683.png",
    },
    // ...Thêm các ưu đãi khác nếu cần
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Thành viên</Text>
        <Text style={styles.label}>0 điểm</Text>
        <FontAwesome
          name="user-circle"
          size={35}
          color="white"
          style={styles.icon}
        />
      </View>
      <View style={styles.member}>
        <FontAwesome name="gift" size={30} color="#FF8C00" />
        <Text>Thông tin hạng thành viên</Text>
        <MaterialIcons name="navigate-next" size={24} color="black" />
      </View>
      <View style={styles.line}></View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerItem}>
            <Image style={styles.offerImage} source={{ uri: item.image }} />
            <Text style={styles.offerText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 10,
    color: "white",
  },
  label: {
    fontSize: 16,
    marginHorizontal: 15,
    color: "white",
  },
  header: {
    backgroundColor: "#FF8C00",
    width: "100%",
    height: "15%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 10, // Adjust top value as needed
    right: 10, // Adjust right value as needed
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
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  memberInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  offerItem: {
    backgroundColor: "#eee",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  offerImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  offerText: {
    fontSize: 16,
  },
});

export default GiftScreen;
