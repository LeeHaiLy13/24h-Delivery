import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function SearchLocate({ route }) {
  const navigation = useNavigation();
  const { onConfirmLocation } = route.params || {};
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const locationDetails = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (locationDetails.length > 0) {
        const { name, city, region, country } = locationDetails[0];
        setPlaceName(`${name || ''}, ${city || ''}, ${region || ''}, ${country || ''}`);
      }

      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMsg('Error fetching location');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlePlaceSelect = (data, details) => {
    console.log(data, details);
  };

  const handleConfirmLocation = () => {
    console.log('Current location confirmed:', location);

    if (onConfirmLocation) {
      onConfirmLocation(placeName);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <>

          <MapView style={styles.map} region={region}>
            {location && (
              <View style={{ marginHorizontal: marginSmall, }}>
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title={placeName || 'Vị trí hiện tại:'}
                  description='Vị trí của bạn'
                />
                <View >
                  <Text style={styles.locationText}>
                    Vị trí hiện tại: {placeName || 'Loading...'}
                  </Text>
                </View>
              </View>
            )}
          </MapView>

          <TouchableOpacity onPress={handleConfirmLocation} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Xác nhận vị trí</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: '100%',
    height: '90%',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    bottom: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,

  },
  autocompleteContainer: {
    top: 10,
    width: '90%',
    marginLeft: '5%',
  },
  autocompleteTextInput: {
    fontSize: 16,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    width: deviceWidth * 0.9,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});