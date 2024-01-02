import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    // Handle the selected place, you can log or perform additional actions here
    console.log(data, details);
  };

  const handleConfirmLocation = () => {
    // Handle the confirmation of the current location
    // You can perform additional actions here
    console.log('Current location confirmed:', location);

    // Pass the selected location back to the calling screen
    if (onConfirmLocation) {
      onConfirmLocation(placeName);
    }

    // Navigate back to the previous screen
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
              <>
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title={placeName || 'Vị trí hiện tại:'}
                  description='Vị trí của bạn'
                />
                <Text style={styles.locationText}>
                  Your Current Location: {placeName || 'Loading...'}
                </Text>
              </>
            )}
          </MapView>
          <TouchableOpacity onPress={handleConfirmLocation} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Location</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '100%',
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
