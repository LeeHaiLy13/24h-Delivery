import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const vehicleData = [
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe máy',
    key: '1',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe van',
    key: '2',
  },
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe tải',
    key: '3',
  },
];

export default function VehicleList({ onVehicleSelect }) {
  const handleOnPress = (vehicleName) => {
    onVehicleSelect(vehicleName);
  };

  return (
    // <FlatList
    //   contentContainerStyle={styles.container}
    //   data={vehicleData}
    //   keyExtractor={(item) => item.key}
    //   renderItem={({ item }) => (
    //     <TouchableOpacity style={styles.vehicleItem} onPress={() => handleOnPress(item.name)}>
    //       <Image source={{ uri: item.imageURL }} style={styles.vehicleImg} />
    //       <Text style={styles.vehicleName}>{item.name}</Text>
    //     </TouchableOpacity>
    //   )}
    // />
    <View>
      <TouchableOpacity style={styles.vehicleItem} onPress={() => handleOnPress("Xe máy")}>
        <Image source={{ uri: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png' }} style={styles.vehicleImg} />
        <Text style={styles.vehicleName}>Xe máy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.vehicleItem} onPress={() => handleOnPress("Xe van")}>
        <Image source={{ uri: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png' }} style={styles.vehicleImg} />
        <Text style={styles.vehicleName}>Xe van</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.vehicleItem} onPress={() => handleOnPress("Xe tải")}>
        <Image source={{ uri: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png' }} style={styles.vehicleImg} />
        <Text style={styles.vehicleName}>Xe tải</Text>
      </TouchableOpacity>
    </View>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 300,
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
