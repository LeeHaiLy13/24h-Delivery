import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Input, Button } from "react-native-elements";

 import SeperatorLine from '../../components/SeperatorLine';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import color from '../../constants/color';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot, query, orderBy, } from 'firebase/firestore';
import VehicleList from '../../components/VehicleList';

export default function HomeScreen({ route }) {
  // const uid = route.params.uid;
  const [pickuplocate, setPickuplocate] = useState("");
  const [deliverylocate, setDeliverylocate] = useState("");
  const [vehicle, setVehicle] = useState("")
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const navigation = useNavigation();
  const currentUser = FIREBASE_AUTH?.currentUser?.uid;
  const docRef = doc(FIREBASE_DB, 'users', currentUser);
  const colRef = collection(docRef, 'orderList');

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
          orderIndex: new Date().getTime(), // Thêm trường orderIndex
        };

        await addDoc(colRef, data);

        setPickuplocate("");
        setDeliverylocate("");
        Keyboard.dismiss();
      } else {
        alert("Vui lòng nhập địa điểm lấy hàng và giao hàng.");
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra khi thêm dữ liệu: " + error.message);
    }
  };
  const handleConfirmLocation = (selectedLocation) => {
    setDeliveryLocation(selectedLocation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <TouchableOpacity
                  style={styles.changeLocation}
                  onPress={() =>
                    navigation.navigate('SearchLocate', { onConfirmLocation: handleConfirmLocation })
                  }
                >
                  <Ionicons name='location' size={18} color={color.PRIMARY_COLOR} />
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Địa điểm lấy hàng: {deliveryLocation}</Text>
                </TouchableOpacity>
                <SeperatorLine />
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
      <VehicleList />
      <Button title="Test" buttonStyle={styles.button} onPress={addData} />
    </View>
  );
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  inputContainer: {
    width: deviceWidth * 0.9,
    // height: 200,
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
    // layout
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
  vehicleList: {

  },
  vehicleItem: {
    backgroundColor: '#fff',
    padding: paddingSmall,
    margin: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: deviceWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',

  },
  vehicleImg: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    marginRight: 20,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: '500',
  },
});