import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';

export default function DeliveringScreen() {
  const [deliveringOrders, setDeliveringOrders] = useState([]);
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

  const getDeliveringList = () => {
    // Create a query to get orders with status "Delivering"
    const q = query(colRef, where('status', '==', 'Delivering'));

    // Subscribe to the query snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let deliveringOrders = [];
      querySnapshot.forEach((order) => {
        deliveringOrders.push({ ...order.data(), id: order.id });
      });
      setDeliveringOrders(deliveringOrders);
    });

    return unsubscribe;
  };

  useEffect(() => {
    // Fetch delivering orders when the component mounts
    const unsubscribe = getDeliveringList();

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      {deliveringOrders.length > 0 ? (
        <FlatList
          data={deliveringOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>ID: {item.id}</Text>
              {/* <Text>Ngày tạo: {item.createdAt?.toISOString()}</Text> */}
              <Text style={{color: "#FFB800"}}>Trạng thái: Đang giao</Text>
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
};

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
