import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import AVATAR from '../../assets/profile/avatar.jpeg';

export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: 'Bars',
      location: ' Add Location',
    };
  }

  async createPostPressed() {
    this.setState({ isLoading: true })

    const { text } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'description': text,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/6/posts`, {
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
          'Success!',
          'Your post is posted!',
          [
            { text: "Continue", onPress: () => this.props.navigation.goBack() }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Cannot post it!', `Empty field.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Posting failed!', 'Unable to Post. Please try again later')
    }
  }


  // handleSubmit = () => {
  //   //Display alert
  //   const { text } = this.state
  //   if (text != '') {
  //     Keyboard.dismiss
  //     console.log("Share done")
  //     Alert.alert(
  //       'Success!',
  //       'Your post is shared with your friends',
  //       [
  //         { text: 'OK', onPress: () => this.props.navigation.goBack() },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  //   else {
  //     Keyboard.dismiss
  //     console.log("Share done")
  //     Alert.alert(
  //       'Invalid!',
  //       'You do not have anything to share' + '\nPlease input your ideas below ', 
  //       [
  //         { text: 'Try Again', onPress: () => console.log("Tried again") },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // }
  render() {
    const {text, name, location} = this.state
    return (
      <View style={styles.createPostContainer}>
        <SafeAreaView style={{ backgroundColor: '#FAFAFA', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Cancel</Text>
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Create Post',
              style: {
                color: '#2F80ED', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => this.createPostPressed()}>
                <Text style={styles.navBar}>Share</Text>
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
          />
        </SafeAreaView>
        <View style={styles.mainContainer}> 
          <View style={styles.postInfoContainer}>
            <View style={styles.postAuthorAvatarContainer}>
              <TouchableOpacity>
                <Image source={ AVATAR } style={styles.avatar} />
              </TouchableOpacity>
            </View>
            <View style={styles.postAuthorInfoContainer}>
              <View style={styles.nameContainer}>
                <TouchableOpacity>
                  <Text style={styles.nameLabel}>{name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.locationContainer}>
                <TouchableOpacity>
                  <Text style={styles.locationLabel}>
                    <Entypo
                      name='location'
                      style={styles.locationIcon}
                      size={20}
                    />
                    {location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView behavior="height">
          <View style={styles.textInputContainer}>
            <TextInput
              editable={true}
              placeholder={"Share your thoughts!"}
              placeholderTextColor={'gray'}
              multiline = {true}
              onChangeText={(text) => this.setState({text})}
              value={text}
              style={styles.postTextInput}
            />
          </View>
          </KeyboardAvoidingView >
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  createPostContainer: {
    flex: 1,
    backgroundColor: 'white'  
  },
  mainContainer: {
    flex: 1,
  },
  postInfoContainer:{
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#aaaaaa',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginLeft: 5
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nameLabel: {
    fontSize: 18,
    color: '#003366',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  postAuthorInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  locationLabel: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,
  },
  textInputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  postTextInput:{
    height: 200,
    fontSize: 22,
    color: 'black',
  }

});
