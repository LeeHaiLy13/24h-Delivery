import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { doc, collection, onSnapshot, query, where, updateDoc } from 'firebase/firestore';
import { Button, Input, Overlay } from 'react-native-elements';
import color from '../../constants/color';

export default function PendingScreen() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

  const [reason, setReason] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Hàm chuyển đổi thời gian
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  const getPendingList = () => {
    // Create a query to get orders with status "Pending"
    const q = query(colRef, where('status', '==', 'Pending'));
    // Subscribe to the query snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let pendingOrders = [];
      querySnapshot.forEach((order) => {
        const orderData = { ...order.data(), id: order.id };
        if (orderData.createAt) {
          orderData.formattedDate = formatTimestamp(orderData.createAt);
          pendingOrders.push(orderData);
        }
        // console.log('ID:', orderData.id);
        // console.log('createdAt:', orderData.formattedDate);
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

  const showOverlay = () => {
    setOverlayVisible(true);
  };

  const cancelOrder = (orderId) => {
    showOverlay();
    // Các xử lý khác nếu cần
  };

  const handleCancelOrder = async (orderId) => {
    try {
      // Update the order status to "Canceled"
      const orderDocRef = doc(colRef, orderId);
      await updateDoc(orderDocRef, { status: 'Canceled', cancelReason: reason });
      // Optional: Fetch the updated pending list again
      getPendingList();
    } catch (error) {
      console.error('Error canceling order:', error);
    } finally {
      // Ẩn overlay sau khi xử lý xong
      setOverlayVisible(false);
    }
  };


  return (
    <View style={styles.container}>
      {pendingOrders.length > 0 ? (
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.orderItem}>
                <View style={{ paddingBottom: 12, }}>
                  <Text>ID: {item.id}</Text>
                  <Text>Ngày tạo: {item.formattedDate}</Text>
                  <Text>Phương tiện: {item.vehicle}</Text>
                  <Text>Địa điểm lấy hàng: {item.pickupAddress}</Text>
                  <Text>Địa điểm lấy hàng: {item.deliveryAddress}</Text>
                  <Text style={{ color: "#B0B0B0", fontWeight: "500" }}>Trạng thái: Đang chờ</Text>
                  {/* Hiển thị các trường dữ liệu khác nếu cần */}

                </View>
                <View style={{ alignItems: 'center', }}>
                  <Button title='Hủy đơn hàng' buttonStyle={styles.button} onPress={() => cancelOrder(item.id)} />
                </View>
              </View>
              <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)} overlayStyle={styles.overlay}>
                <View>
                  <Text>Nhập lý do hủy đơn</Text>
                  <Input
                    multiline
                    numberOfLines={4}
                    placeholder="Nhập lý do..."
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                  />
                  <View style={styles.overlayButtons}>
                    <Button title="Hủy" onPress={() => setOverlayVisible(false)} buttonStyle={{
                      marginBottom: 12,
                      backgroundColor: color.PRIMARY_COLOR,
                      borderRadius: 8,
                      padding: 12,
                    }} />
                    <Button title="Xác nhận" onPress={() => handleCancelOrder(item.id)} buttonStyle={{
                      marginBottom: 12,
                      backgroundColor: color.PRIMARY_COLOR,
                      borderRadius: 8,
                      padding: 12,
                    }} />
                  </View>
                </View>
              </Overlay>
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
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: '#FF3131',
    borderRadius: 8,
    padding: 8,
    width: 160,
  },
  overlay: {
    width: deviceWidth * 0.8,
    padding: 20,
    borderRadius: 8,
  },
  overlayText: {
    fontSize: 16,
    marginBottom: 10,
  },
  overlayButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
