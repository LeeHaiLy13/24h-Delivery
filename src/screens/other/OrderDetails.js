// Import thêm các thư viện cần thiết
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function OrderDetailScreen() {
  const [orderDetails, setOrderDetails] = useState(null);
  const route = useRoute();
  const orderId = route.params.order.id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDocRef = doc(FIREBASE_DB, 'users', FIREBASE_AUTH?.currentUser?.uid, 'orderList', orderId);
      const orderDocSnapshot = await getDoc(orderDocRef);

      if (orderDocSnapshot.exists()) {
        setOrderDetails({ ...orderDocSnapshot.data(), id: orderId });
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <View style={styles.container}>
      {orderDetails ? (
        <View>
          <Text>ID: {orderDetails.id}</Text>
          <Text>Ngày tạo: {orderDetails.formattedDate}</Text>
          {/* Hiển thị các trường dữ liệu khác nếu cần */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
