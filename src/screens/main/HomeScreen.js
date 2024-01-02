import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';

import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import color from '../../constants/color';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot, query, orderBy, } from 'firebase/firestore';
import VehicleList from '../../components/VehicleList';

export default function HomeScreen() {
  const [pickuplocate, setPickuplocate] = useState("");
  const [deliverylocate, setDeliverylocate] = useState("");
  const [vehicle, setVehicle] = useState("");
  const navigation = useNavigation();
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

  const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);

  const showAlert = () => {
    setConfirmationOverlayVisible(true);
  };

  const closeOverlay = () => {
    setConfirmationOverlayVisible(false);
  };

  const handleConfirm = () => {
    addData();
    closeOverlay();
  };

  const addData = async () => {
    try {
      if (pickuplocate && pickuplocate.length > 0 && deliverylocate && deliverylocate.length) {
        const data = {
          orderId: new Date().getTime().toString(),
          pickupAddress: pickuplocate,
          deliveryAddress: deliverylocate,
          createAt: serverTimestamp(),
          vehicle: vehicle,
          status: "Pending",
          orderIndex: new Date().getTime(),
        };

        await addDoc(colRef, data);

        setPickuplocate("");
        setDeliverylocate("");
        setVehicle(""); // Reset selected vehicle
      } else {
        alert("Vui lòng nhập địa điểm lấy hàng và giao hàng.");
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra khi thêm dữ liệu: " + error.message);
    }
  };

  const handleVehicleSelect = (vehicleName) => {
    console.log('Selected vehicle:', vehicleName);
    setVehicle(vehicleName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{ marginTop: 12, marginBottom: -6, }}>
          <Input
            placeholder="Nhập địa điểm lấy hàng"
            leftIcon={{ name: "locate", type: "ionicon", color: color.PRIMARY_COLOR }}
            value={pickuplocate}
            autoCapitalize="none"
            onChangeText={(text) => setPickuplocate(text)}
            inputContainerStyle={styles.inputField}
          />
        </View>
        <View style={{ marginTop: -6, marginBottom: -12, }}>
          <Input
            placeholder="Nhập địa điểm giao hàng"
            leftIcon={{ name: "location", type: "ionicon", color: color.PRIMARY_COLOR }}
            value={deliverylocate}
            autoCapitalize="none"
            onChangeText={(text) => setDeliverylocate(text)}
            inputContainerStyle={styles.inputField}
          />
        </View>
      </View>
      <View style={styles.availableVehicle}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Phương tiện có sẵn</Text>
      </View>
      <StatusBar style="auto" />
      <VehicleList onVehicleSelect={handleVehicleSelect} />
      <Button title="Tạo đơn hàng" buttonStyle={styles.button} onPress={showAlert} />

      <Overlay
        isVisible={confirmationOverlayVisible}
        onBackdropPress={closeOverlay}
        overlayStyle={styles.overlay}
      >
        <Text style={styles.overlayText}>Địa điểm lấy hàng: {pickuplocate}</Text>
        <Text style={styles.overlayText}>Địa điểm giao hàng: {deliverylocate}</Text>
        <Text style={styles.overlayText}>Phương tiện: {vehicle}</Text>
        <View style={styles.overlayButtons}>
          <Button title="Hủy" buttonStyle={styles.button} onPress={closeOverlay} />
          <Button title="Xác nhận" buttonStyle={styles.button} onPress={handleConfirm} />
        </View>
      </Overlay>
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
  },
  inputContainer: {
    width: deviceWidth * 0.9,
    marginHorizontal: marginSmall,
    marginVertical: 16,
    paddingHorizontal: paddingSmall,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputField: {
    width: deviceWidth * 0.8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  changeLocation: {
    paddingVertical: paddingSmall,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: paddingSmall,
  },
  availableVehicle: {
    justifyContent: 'center',
    paddingBottom: 6,
  },
  button: {
    marginBottom: 12, 
    backgroundColor: color.PRIMARY_COLOR,
    borderRadius: 8,
    padding: 12,
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