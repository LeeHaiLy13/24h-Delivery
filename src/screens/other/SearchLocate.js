import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

export default function SearchLocate() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // setLoading(true)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMsg('Error fetching location');
    }
  };
  useEffect(() => {
    getLocation()
  }, []);
  console.log(location);

  return (
    loading ?
      <ActivityIndicator style={{ flex: 1 }} /> :
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'MAP_API_KEY',
            language: 'en',
          }}
        />
        <MapView style={styles.map} region={region}>
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
        </MapView>
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
  },
});