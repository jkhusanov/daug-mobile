import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements';
import { onSignIn } from "../utils/auth";


export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, borderBottomColor: '#2F80ED',  elevation: null, },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 },
    borderBottomWidth:0,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  async signupButtonPressed() {
    this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Welcome to our app!',
          'You have successfully created new account!',
          [
            { text: "Continue", onPress: () => {onSignIn(responseJSON.user.id).then(() => navigate("Home")); }}
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  // handleSubmit = () => {
  //   const {name, email, password}  = this.state
  //   //Display alert
  //   if (name != '' && email != '' && password != '') {
  //     Keyboard.dismiss
  //     console.log("Correct Phrase Entered")
  //     Alert.alert(
  //       'Success!',
  //       'Name: ' + name + '\nEmail: ' + email + '\nPassword ' + password,
  //       [
  //         {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
  //       ],
  //       { cancelable: false }
  //     )
  //   } else {
  //     Keyboard.dismiss
  //     console.log("Incorrect Email Or Password Entered")
  //     Alert.alert(
  //       'Invalid',
  //       'Please fill all the fields', 

  //       [
  //         {text: 'Try Again', onPress: () => console.log('Try Again Pressed')},
  //       ],
  //       { cancelable: false},
  //     )
  //   }
  // }
  render() {
    const { name, email, password } = this.state;
    const isSignupNotEmpty = !(name === ''|| email === '' || password === '');

    return (
      <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.container}>
        <View style={styles.inputViewContainer}>
        <Input
            placeholder='Name'
            placeholderTextColor="white"
            inputStyle={{ color: 'white'}}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            value={name}
            onChangeText={(name) => this.setState({name})}
            containerStyle={styles.inputElementsContainer}
            onSubmitEditing={() =>
              this.emailInput.focus()
            }
            leftIcon={
              <Feather
                name='user'
                size={24}
                color='white'
              />
            }
          />
        <Input
            ref={input => (this.emailInput = input)}
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
            onSubmitEditing={() =>
              this.passwordInput.focus()
            }
            leftIcon={
              <MaterialCommunityIcons
                name='email-outline'
                size={24}
                color='white'
              />
            }
          />
          <Input
            ref={input => (this.passwordInput = input)}
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
            onSubmitEditing={() => {
              this.signupButtonPressed()
            }}
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
            text='Sign Up'
            onPress={() => this.signupButtonPressed()}
            buttonStyle={[styles.signupButton, isSignupNotEmpty && {backgroundColor: '#70D4B4', borderColor: '#0E9577'}]}
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
            text='Sign Up with Facebook'
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
            text='Sign Up with Twitter'
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
  signupButton: {
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
});
