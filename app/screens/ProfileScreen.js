import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Profile Screen</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Intro')}
          >
            <Text style={styles.button}> Log Out </Text>
          </TouchableOpacity>
    </View>
      </View>

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
