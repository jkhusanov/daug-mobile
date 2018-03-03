import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      screen: '',
    };
  }
  handleSubmit = () => {
    const {email, password}  = this.state
    //Display alert
    if (email === 'user@email.com' && password === 'daugRN') {
      Keyboard.dismiss
      console.log("Correct Phrase Entered")
      Alert.alert(
        'Success!',
        'Email: user@email.com & Password: daugRN',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      Keyboard.dismiss
      console.log("Incorrect Email Or Password Entered")
      Alert.alert(
        'Invalid',
        'Try, Email: user@email.com & Password: daugRN', 

        [
          {text: 'Try Again', onPress: () => console.log('Try Again Pressed')},
        ],
        { cancelable: false},
      )
    }
  }
  render() {
    const { screen, email, password } = this.state;
    const isLoginNotEmpty = !(email === '' || password === '');

    return (
      <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.container}>
        {/* <View style={styles.goBackViewContainer}>
          <Button
            icon={
              <SimpleLineIcons
                name='arrow-left'
                size={25}
                color='white'
              />
            }
            text=''
            buttonStyle={styles.backButtonStyling}
          />
        </View> */}
        <View style={styles.inputViewContainer}>
        <Input
            placeholder='Email'
            placeholderTextColor="white"
            inputStyle={{ color: 'white'}}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            value={email}
            onChangeText={(email) => this.setState({email})}
            containerStyle={styles.inputElementsContainer}
            // If email input is wrong use: shake={true}
            leftIcon={
              <MaterialCommunityIcons
                name='email-outline'
                size={24}
                color='white'
              />
            }

          />
          <Input
            placeholder='Password'
            placeholderTextColor="white"
            inputStyle={{ color: 'white'}}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            secureTextEntry
            value={password}
            onChangeText={(password) => this.setState({password})}
            containerStyle={styles.inputElementsContainer}
            leftIcon={
              <SimpleLineIcons
                name='lock'
                size={24}
                color='white'
              />
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={
              <SimpleLineIcons
                name='login'
                size={20}
                color='white'
              />
            }
            iconRight
            text='Login'
            onPress={this.handleSubmit}
            buttonStyle={[styles.loginButton, isLoginNotEmpty && {backgroundColor: '#70D4B4', borderColor: '#0E9577'}]}
          />
          <Button
            icon={
              <MaterialCommunityIcons
                name='facebook'
                size={20}
                color='white'
              />
            }
            iconLeft
            text='Login with Facebook'
            buttonStyle={styles.facebookButton}
          />
          <Button
            icon={
              <MaterialCommunityIcons
                name='twitter'
                size={20}
                color='white'
              />
            }
            iconLeft
            text='Login with Twitter'
            buttonStyle={styles.twitterButton}
          />
        </View>
      </LinearGradient>
      
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
  inputViewContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputElementsContainer: {
    height: 45,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    padding: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: "#A5ECD7",
    width: 250,
    height: 45,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  facebookButton: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 250,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginVertical: 20,
  },
  twitterButton: {
    backgroundColor: "#1dcaff",
    width: 250,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },
  // goBackViewContainer: {
  //   alignSelf: 'flex-start',
  // },
  // backButtonStyling: {
  //   width: 70,
  //   height: 70,
  //   borderColor: "transparent",
  //   borderWidth: 0,
  //   borderRadius: 20,
  // }
});