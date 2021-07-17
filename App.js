/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('');

import Header from './components/Header';

const App = () => {
  const [coordinate, setCordinate] = useState([12.9716, 77.5946]);
  useEffect(() => {
    fetch('https://locluggage-api.neeltron.repl.co/output')
      .then(locationData => locationData.json())
      .then(locationData => {
        console.log(locationData);
        setCordinate([
          parseFloat(locationData.lat),
          parseFloat(locationData.long),
        ]);
      });
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <SafeAreaView contentContainerStyle={StyleSheet.absoluteFillObject}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.PointAnnotation
                id="id1"
                title="Test"
                coordinate={coordinate}>
                <Image
                  source={require('./common/images/marker.png')}
                  style={StyleSheet.marker}
                />
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 700,
    width: Dimensions.get('window').width,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
  marker: {
    flex: 1,
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
});

export default App;
