import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';

export default function PendingScreen() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

  const getPendingList = () => {
    // Create a query to get orders with status "Pending"
    const q = query(colRef, where('status', '==', 'Pending'));

    // Subscribe to the query snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let pendingOrders = [];
      querySnapshot.forEach((order) => {
        const orderData = { ...order.data(), id: order.id };
        pendingOrders.push(orderData);
        console.log('createdAt:', orderData.createdAt);
      });
      setPendingOrders(pendingOrders);
    });

    return unsubscribe;
  };

  useEffect(() => {
    // Fetch pending orders when the component mounts
    const unsubscribe = getPendingList();

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {pendingOrders.length > 0 ? (
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>ID: {item.id}</Text>
              <Text>Ngày tạo: {item.createdAt?.toISOString()}</Text>
              <Text>Trạng thái: {item.status}</Text>
              {/* Hiển thị các trường dữ liệu khác nếu cần */}
            </View>
          )}
        />
      ) : (
        <Text>Không có đơn hàng "Pending" nào.</Text>
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
