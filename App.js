import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from './app/navigation/RootNavigator';
import PostDetailsScreen from './app/screens/PostDetailsScreen';
import SocialFeedScreen from './app/screens/SocialFeedScreen';
import SocialStack from './app/navigation/SocialStack';

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator/>
      // <PostDetailsScreen/>
      // <SocialStack/>
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
