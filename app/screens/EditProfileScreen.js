import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Input, Header } from 'react-native-elements'


import AVATAR from '../../assets/profile/avatar.jpeg';

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: 'Jahon',
      bio: 'Hello World!'
    };
  }
  
  async DoneEditingPressed() {
    this.setState({ isLoading: true })

    const { name, bio, email, password, profileImage, bannerImage } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'bio': bio,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/6`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log(responseJSON)

        this.setState({ 
          isLoading: false, 
          profile: responseJSON, 
        })
        Alert.alert(
          'Success!',
          'Your profile is updated!',
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
        Alert.alert('Cannot update it!', `Empty field.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Updating failed!', 'Unable to Post. Please try again later')
    }
  }
  _renderProfileName(name) {
    if (name) {
      return (
        <Text>{name}</Text>
      )
    }
  }
  render() {
    const { name, email, password, bio, isLoading, profile } = this.state
    return (
      <View style={styles.profileEditContainer}>
        <SafeAreaView style={{ backgroundColor: '#FAFAFA', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Cancel</Text>
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Edit Profile',
              style: {
                color: '#2F80ED', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => this.DoneEditingPressed()}>
                <Text style={styles.navBar}>Done</Text>
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
          />
        </SafeAreaView>
        <ScrollView style={{ backgroundColor: '#fff' }}>
          {!isLoading &&
            <KeyboardAvoidingView behavior="position">
              <View style={styles.mainContainer}>
                <View style={styles.editInfoBasicContainer}>
                  <View style={styles.photoChangeContainer}>
                    <View style={styles.avatarContainer}>
                      <Image
                        style={styles.avatarImage}
                        source={AVATAR}
                      />
                    </View>
                    <View style={styles.avatarChangeButtonContainer}>
                      <TouchableOpacity>
                        <Text style={styles.avatarChangeButton}>Change Photo</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.detailsChangeContainer}>
                    <View style={styles.changeInputContainer}>
                      <Text style={styles.inputLabel}>Name</Text>
                      <Input
                        placeholder='Input your name'
                        placeholderTextColor="black"
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="done"
                        value={name}
                        onChangeText={(name) => this.setState({ name })}
                        containerStyle={styles.inputElementsContainer}
                      />

                    </View>
                    <View style={styles.changeInputContainer}>
                      <Text style={styles.inputLabel}>Bio</Text>
                      <Input
                        placeholder='Short info about you'
                        placeholderTextColor="black"
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="done"
                        value={bio}
                        onChangeText={(bio) => this.setState({ bio })}
                        containerStyle={styles.inputElementsContainer}
                      />
                    </View>
                  </View>

                </View>
                <View style={styles.editPrivateInfoContainer}>
                  <Text style={styles.privateInfoLabel}>Private Information</Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          }
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileEditContainer: {
    flex: 1,
  },
  navBar: {
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
  },
  editInfoBasicContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  photoChangeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
  },
  avatarContainer: {
    height: 100,
  },
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  avatarChangeButtonContainer: {
    alignItems: 'center',
  },
  avatarChangeButton: {
    marginVertical: 10,
    color: '#2F80ED',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsChangeContainer: {
    marginBottom: 10,
  },
  changeInputContainer: {
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#737373',
  },
  inputElementsContainer: {
    width: '100%',
    borderColor: '#aaaaaa'
  },
  inputStyle: {
    width: '100%',
    borderColor: '#aaaaaa',
    fontSize: 18,
    color: 'black',
  },
  bioChangeContainer: {
    backgroundColor: '#ffc',
  },
  editPrivateInfoContainer: {
    backgroundColor: '#aaaaaa',
  },
  editPrivateInfoContainer: {
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,

  },
  privateInfoLabel: {
    color: '#737373',
    marginHorizontal: 20,
    fontSize: 15,
  }
});