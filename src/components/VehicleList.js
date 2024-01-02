import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Input, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const vehicleData = [
  {
    imageURL: 'https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png',
    name: 'Xe máy',
    key: '1',
    // detail: '',
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

export default function VehicleList() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={vehicleData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.vehicleItem}>
            <Image source={{ uri: item.imageURL }} style={styles.vehicleImg} />
            <Text style={styles.vehicleName}>{item.name}</Text>
          </TouchableOpacity>
        );
      }
      }
    />
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 12,
    marginBottom: 0,
  },
  inputField: {
    width: deviceWidth * 0.8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: -6,
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
  box: {
    width: deviceWidth * 0.9,
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
  inputContainer: {
    marginTop: 12,
    marginBottom: 0,
  },
  inputField: {
    width: deviceWidth * 0.8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: -6,
  },
  availableVehicle: {
    justifyContent: 'center',
    paddingBottom: 6,
  },

})