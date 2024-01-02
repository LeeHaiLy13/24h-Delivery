import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';

export default function DeliveredScreen() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
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

  const getDeliveredList = () => {
    // Create a query to get orders with status "Delivered"
    const q = query(colRef, where('status', '==', 'Delivered'));

    // Subscribe to the query snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let deliveredOrders = [];
      querySnapshot.forEach((order) => {
        const orderData = { ...order.data(), id: order.id };
        if (orderData.createAt) {
          orderData.formattedDate = formatTimestamp(orderData.createAt);
          deliveredOrders.push(orderData);
        }
        // console.log('createdAt:', orderData.createdAt);
      });
      setDeliveredOrders(deliveredOrders);
    });

    return unsubscribe;
  };

  useEffect(() => {
    // Fetch delivered orders when the component mounts
    const unsubscribe = getDeliveredList();

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {deliveredOrders.length > 0 ? (
        <FlatList
          data={deliveredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>ID: {item.id}</Text>
              <Text>Ngày tạo: {item.formattedDate}</Text>
              <Text style={{color: "#32CD32"}}>Trạng thái: Đã giao</Text>
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
