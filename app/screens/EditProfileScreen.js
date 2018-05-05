import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, KeyboardAvoidingView, Alert, DeviceEventEmitter, ImageEditor } from 'react-native';
import { Button, Input, Header } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';

import { onSignOut } from "../utils/auth";
import { ENV_URL } from '../utils/auth';


export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    const profile = props.navigation.state.params && props.navigation.state.params.profile

    this.state = {
      isLoading: false,
      visibleModal: null,

      ...profile
    };
  }
  async DoneEditingPressed() {
    this.setState({ isLoading: true })

    const { name, bio, email, password, profile_image, bannerImage } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'bio': bio,
      'profile_image': profile_image
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.id}`, {
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
        })
        Alert.alert(
          'Success!',
          'Your profile is updated!',
          [
            {
              text: "Continue", onPress: () => {
                DeviceEventEmitter.emit('user_profile_updated', {})
                this.props.navigation.goBack()
              }
            }
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
  getCameraAsync = async (mediaType) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      return this.takePhoto();
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  getPhotoAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      return this._pickImage();
    } else {
      throw new Error('Photo permission not granted');
    }
  }
  takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('Take Photo Canceled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: result.width, height: result.height },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: resizedUri,
      name: `user_${this.state.id}_profile_image_${new Date().getTime()}.png`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "daug",
      region: "us-east-1",
      accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body);

      this.setState({ profile_image: response.body.postResponse.location });
    });
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('Profile Image cancelled');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: result.width, height: result.height },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: resizedUri,
      name: `user_${this.state.id}_profile_image_${new Date().getTime()}.png`,
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "daug",
      region: "us-east-1",
      accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body);

      this.setState({ profile_image: response.body.postResponse.location });
    });
  };
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.avatarChangeButtonContainer}>
        <Text style={styles.avatarChangeButton}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.avatarChangeOptions}>
        <TouchableOpacity onPress={() => { this.getCameraAsync(), this.setState({ visibleModal: null }) }}>
          <Text style={styles.avatarChangeButton}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarChangeOptions}>
        <TouchableOpacity onPress={() => { this.getPhotoAsync(), this.setState({ visibleModal: null }) }}>
          <Text style={styles.avatarChangeButton}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
      {this._renderButton('Cancel', () => this.setState({ visibleModal: null }))}
    </View>
  );
  _renderProfileImage(image) {
    if (image) {
      return (
        <Image
          style={styles.avatarImage}
          source={{ uri: image }}
        />
      )
    }
    else {
      return (
        <View
          style={styles.defaultProfileAvatar}
        >
        </View>
      )
    }
  }
  render() {
    const { name, email, password, bio, isLoading, profile, profile_image } = this.state
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
                      {this._renderProfileImage(profile_image)}
                    </View>
                    <View style={styles.avatarChangeButtonContainer}>
                      {this._renderButton('Choose Photo', () => this.setState({ visibleModal: 1 }))}
                      <Modal isVisible={this.state.visibleModal === 1}>
                        {this._renderModalContent()}
                      </Modal>


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
                <View style={styles.profileLogoutContainer}>
                  <Button
                    text='Logout'
                    onPress={() => onSignOut().then(() => this.props.navigation.navigate('Intro'))}
                    textStyle={styles.profileLogoutButtonText}
                    buttonStyle={styles.profileLogoutButton}
                  >
                  </Button>
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
  defaultProfileAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white'
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
  },
  profileLogoutContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLogoutButtonText: {
    fontSize: 25,
  },
  profileLogoutButton: {
    backgroundColor: '#A5ECD7',
    width: 170,
    height: 40,
    borderRadius: 0,
  },
  avatarChangeOptions: {
    borderBottomWidth: 1,
    borderColor: '#aaaaaa'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',

  },
});