/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import Header from './components/Header';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
