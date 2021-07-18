/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import openMap from 'react-native-open-maps';

MapboxGL.setAccessToken('');

import Header from './components/Header';

const App = () => {
  const [centerCoordinate, setCenterCoordinate] = useState([78.9629, 20.5937]);
  const [cordinate, setCordinate] = useState(null);
  useEffect(() => {
    fetch('https://locluggage-api.neeltron.repl.co/output')
      .then(locationData => locationData.json())
      .then(locationData => {
        console.log(locationData);
        setCordinate([
          parseFloat(parseFloat(locationData.long).toFixed(7)),
          parseFloat(parseFloat(locationData.lat).toFixed(7)),
        ]);
        console.log(cordinate);
      });
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  const _openMaps = () => {
    console.log(123);
    openMap({
      latitude: cordinate[1],
      longitude: cordinate[0],
      query: `${cordinate[1]}, ${cordinate[0]}`,
      end: `${cordinate[1]}, ${cordinate[0]}`,
    });
  };

  return (
    <SafeAreaView contentContainerStyle={StyleSheet.absoluteFillObject}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Text style={styles.heading}>Track your luggage live!</Text>
          <Text style={styles.subheading}>
            Last updated:{' '}
            {'Sun Jul 18 2021 13:32:40 GMT+0530 (India Standard Time)'}
          </Text>
        </View>
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView
              styleURL={MapboxGL.StyleURL.Street}
              zoomLevel={16}
              centerCoordinate={centerCoordinate}
              style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={4}
                centerCoordinate={centerCoordinate}
                animationMode={'flyTo'}
                animationDuration={0}
              />
              {cordinate && (
                <MapboxGL.PointAnnotation
                  key={'9090'}
                  id="id1"
                  title="Test"
                  coordinate={cordinate}>
                  {/* <Image
                  source={require('./common/images/marker.png')}
                  style={styles.marker}
                /> */}
                  <View style={styles.newMarker} />
                </MapboxGL.PointAnnotation>
              )}
            </MapboxGL.MapView>
          </View>
          <View style={styles.button}>
            {cordinate && (
              <Button onPress={_openMaps} title="Click To Open Maps 🗺" />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: '500',
    padding: 10,
  },
  subheading: {
    fontFamily: 'sans-serif',
    padding: 5,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 500,
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  marker: {
    flex: 1,
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  newMarker: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  button: {
    margin: 20,
  },
});

export default App;
