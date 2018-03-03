import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';


import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';


import LOGO from '../../assets/daug_logo.png';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state= {
      screen: 'null',
    };
  }
  render() {
    const { screen } = this.state
    if (screen === 'LoginScreen') {
      return <LoginScreen/>
    } 
    else if (screen === 'SignupScreen') {
      return  <SignupScreen/>
    }
    else {
      return (
        <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.container}>
          <View style={styles.introContainer}>
            <Image
              source={LOGO}
              style={styles.logo}
              
            />
            <Text style={styles.logoName}> DAUG </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              
              onPress={() => this.setState({ screen: 'LoginScreen' })}
            >
            <Text style={styles.button}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ screen: 'SignupScreen' })}
            >
            <Text style={styles.button}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    }
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