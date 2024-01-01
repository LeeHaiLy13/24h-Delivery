import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import SeperatorLine from '../../components/SeperatorLine';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import color from '../../constants/color';

const vehicleData = [
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe máy',
    key: '1',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe van 500kg',
    key: '2',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe van 1000kg',
    key: '3',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe bán tải',
    key: '4',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải 500kg',
    key: '5',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải 1000kg',
    key: '6',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải 1500kg',
    key: '7',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải 2000kg',
    key: '8',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải 2500kg',
    key: '9',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{ key: 'box' }, ...vehicleData, { key: 'statusBar' }]}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        if (item.key === 'box') {
          return (
            <View>
              <View style={styles.box}>
                <TouchableOpacity style={styles.changeLocation} onPress={() => navigation.navigate('AddressPicker')}>
                  <Ionicons name="locate" size={18} color={color.PRIMARY_COLOR} />
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>Địa điểm lấy hàng</Text>
                </TouchableOpacity>
                <SeperatorLine />
                <TouchableOpacity style={styles.changeLocation} onPress={() => navigation.navigate('SearchLocate')}>
                  <Ionicons name="location" size={18} color={color.PRIMARY_COLOR} />
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>Địa điểm giao hàng</Text>
                </TouchableOpacity>
                <SeperatorLine />
                <View style={{ paddingVertical: paddingSmall }}>
                  <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}>
                    <Octicons name="plus" size={16} color="black" />
                    Thêm vị trí giao hàng
                  </Text>
                </View>
              </View>
              <View style={styles.availableVehicle}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Phương tiện có sẵn</Text>
              </View>
            </View>
          );
        } else if (item.key === 'statusBar') {
          return <StatusBar style="auto" />;
        } else {
          return (
            <View style={styles.vehicleItem}>
              <Image source={{ uri: item.imageURL }} style={styles.vehicleImg} />
              <Text style={styles.vehicleName}>{item.name}</Text>
            </View>
          );
        }
      }}
    />
  );
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    width: deviceWidth * 0.9,
    // height: 200,
    marginHorizontal: marginSmall,
    marginVertical: marginSmall * 2,
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
    padding: paddingSmall,
    margin: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: deviceWidth * 0.9,
    // backgroundColor: 'blue',
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