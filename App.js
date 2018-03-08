import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from './app/navigation/RootNavigator';
import EditProfileScreen from './app/screens/EditProfileScreen';
export default class App extends React.Component {
  render() {
    return (
      // <RootNavigator/>
      <EditProfileScreen/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
