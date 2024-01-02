import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';

export default function CanceledScreen() {
  const [canceledOrders, setCanceledOrders] = useState([]);
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

  // Hàm chuyển đổi thời gian
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getCanceledList = () => {
    // Create a query to get orders with status "Canceled"
    const q = query(colRef, where('status', '==', 'Canceled'));

    // Subscribe to the query snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let canceledOrders = [];
      querySnapshot.forEach((order) => {
        const orderData = { ...order.data(), id: order.id };
        if (orderData.createAt) {
          orderData.formattedDate = formatTimestamp(orderData.createAt);
          canceledOrders.push(orderData);
        }
        // console.log('createdAt:', orderData.createdAt);
      });
      setCanceledOrders(canceledOrders);
    });

    return unsubscribe;
  };

  useEffect(() => {
    // Fetch canceled orders when the component mounts
    const unsubscribe = getCanceledList();

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {canceledOrders.length > 0 ? (
        <FlatList
          data={canceledOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>ID: {item.id}</Text>
              <Text>Ngày tạo: {item.formattedDate}</Text>
              <Text style={{color: "#FF0000"}}>Trạng thái: Đã hủy</Text>
              {/* Hiển thị các trường dữ liệu khác nếu cần */}
            </View>
          )}
        />
      ) : (
        <Text>Không có đơn hàng nào.</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    width: deviceWidth * 0.9,
    backgroundColor: "#fff"
  },
});
