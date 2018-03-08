import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,StatusBar } from 'react-native';
import { LinearGradient } from 'expo';

import LOGO from '../../assets/daug_logo.png';


export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    
    this.state= {
      screen: 'null',
    };
  }
  render() {
    const { screen } = this.state
    return (
      <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View style={styles.introContainer}>
          <Image
            source={LOGO}
            style={styles.logo}

          />
          <Text style={styles.logoName}> DAUG </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity

            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.button}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={styles.button}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    marginBottom: 10
    
  },
  logoName: {
    fontSize: 30,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 90,
    width: '100%',    
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#3490DE',
  },
  button: {
    fontSize: 20,
    color: 'white',
  }
});
