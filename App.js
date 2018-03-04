import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './app/screens/LoginScreen';
import IntroScreen from './app/screens/IntroScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state= {
      screen: 'intro',
    }
  }
  render() {
    const { screen } = this.state
    if (screen === 'intro') {
      return <IntroScreen/>
    } else {
    return (
      <View style={styles.container}>
        <Text>Jakhongir Khusanov</Text>
      </View>
    );
  }
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
