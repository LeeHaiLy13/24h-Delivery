import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';
import SeperatorLine from "../../components/SeperatorLine";
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import color from '../../constants/color';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot, query, orderBy, } from 'firebase/firestore';
import VehicleList from '../../components/VehicleList';

export default function HomeScreen() {
  const [pickupLocation, setPickupLocation] = useState("Lấy vị trí hiện tại");
  const [deliveryLocation, setDeliveryLocation] = useState("");
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
      if (pickupLocation && pickupLocation.length > 0 && deliveryLocation && deliveryLocation.length) {
        const data = {
          orderId: new Date().getTime().toString(),
          pickupAddress: pickupLocation,
          deliveryAddress: deliveryLocation,
          createAt: serverTimestamp(),
          vehicle: vehicle,
          status: "Pending",
          orderIndex: new Date().getTime(),
        };

        await addDoc(colRef, data);

        setPickupLocation("Lấy vị trí hiện tại");
        setDeliveryLocation("");
        setVehicle(""); // Reset selected vehicle
      } else {
        Alert.alert(null, "Vui lòng nhập thông tin đơn hàng");
      }
    } catch (error) {
      Alert.alert(null, "Đã có lỗi xảy ra khi thêm dữ liệu: " + error.message);
    }
  };
  const handleConfirmLocation = (selectedLocation) => {
    setPickupLocation(selectedLocation);
  };

  const handleVehicleSelect = (vehicleName) => {
    console.log('Selected vehicle:', vehicleName);
    setVehicle(vehicleName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.changeLocation}
          onPress={() =>
            navigation.navigate("SearchLocate", {
              onConfirmLocation: handleConfirmLocation,
            })
          }>
          <Ionicons name="locate" size={20} color={color.PRIMARY_COLOR} />
          <Text style={{ fontSize: 16, fontWeight: "400" }}>{pickupLocation}</Text>
        </TouchableOpacity>
        <SeperatorLine />
        <View style={{ marginTop: -6, marginBottom: -12, }}>
          <Input
            placeholder="Nhập địa điểm giao hàng"
            leftIcon={{ name: "location", type: "ionicon", color: color.PRIMARY_COLOR, size: 20, }}
            value={deliveryLocation}
            autoCapitalize="none"
            onChangeText={(text) => setDeliveryLocation(text)}
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
      <Overlay isVisible={confirmationOverlayVisible} onBackdropPress={closeOverlay} overlayStyle={styles.overlay}>
        <Text style={styles.overlayText}>Địa điểm lấy hàng: {pickupLocation}</Text>
        <Text style={styles.overlayText}>Địa điểm giao hàng: {deliveryLocation}</Text>
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
    alignItems: "center",
  },
  inputContainer: {
    width: deviceWidth * 0.9,
    marginHorizontal: marginSmall,
    marginVertical: 16,
    paddingHorizontal: paddingSmall,
    backgroundColor: "#fff",
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
  changeLocation: {
    paddingVertical: paddingSmall * 2,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: paddingSmall,
  },
  inputField: {
    width: deviceWidth * 0.8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 16,
  },

  availableVehicle: {
    justifyContent: "center",
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