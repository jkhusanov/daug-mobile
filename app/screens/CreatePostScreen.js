import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Keyboard, Alert, ImageEditor, DeviceEventEmitter } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ENV_URL, getUserId } from '../utils/auth';

export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);
    const { member } = props.navigation.state.params
    this.state = {
      location: ' Add Location',
      image: null,
      member,
      newPostContent: '',
      imageTake: null,
    };
  }


  async componentDidMount() {
    //getting user ID
    getUserId()
      .then(res => this.setState({ userId: res }))
      .catch(err => { console.log(err); alert("An error occurred") });
  }

  async createPostPressed() {
    this.setState({ isLoading: true })

    const { text, image, newPostContent } = this.state
    const { navigate } = this.props.navigation


    var details = {

    };
    if (image !== null) {
      details.image = image
    }
    if (newPostContent !== null && newPostContent.length > 0) {
      details.description = newPostContent
    }


    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}/posts`, {
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
          'Your post is created and posted!',
          [
            { text: "Continue", onPress: () => {
              DeviceEventEmitter.emit('new_post_created', {})
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
        Alert.alert('Cannot post it!', `Empty field.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Posting failed!', 'Unable to Post. Please try again later')
    }
  }
  getPhotoAsync = async () => {


    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      return this._pickImage();
    } else {
      throw new Error('Camera and Photo permission not granted');
    }
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
      name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
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

      this.setState({ image: response.body.postResponse.location });
    });
  };
  returnImage(image) {
    this.setState({ image: image })
    console.log(image)

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: image,
      name: `user_${this.state.member.id}_post_${new Date().getTime()}.png`,
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

      this.setState({ image: response.body.postResponse.location });
    });
  }
  _renderProfileImage(image) {
    if (image) {
      return (
        <Image source={{ uri: image }} style={styles.avatar} />
      )
    }
  }
  render() {
    const { newPostContent, location, image, member } = this.state
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
        <KeyboardAwareScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.postInfoContainer}>
              <View style={styles.postAuthorAvatarContainer}>
                <TouchableOpacity>
                  {this._renderProfileImage(member["profile_image"])}
                </TouchableOpacity>
              </View>
              <View style={styles.postAuthorInfoContainer}>
                <View style={styles.nameContainer}>
                  <TouchableOpacity>
                    <Text style={styles.nameLabel}>{member && member.name}</Text>
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
            <View style={styles.imageShareContainer}>
              <View style={styles.uploadImageContainer}>
                <TouchableOpacity onPress={() => this.getPhotoAsync()}>
                  <Ionicons
                    name='md-image'
                    size={45}
                    color='#2F80ED'
                    style={styles.photoPostIcon}
                  />
                  <Text style={styles.photoLabel}>Upload from library</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.uploadImageContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TakePhoto', { returnImage: this.returnImage.bind(this) })}>
                  <Ionicons
                    name='ios-camera'
                    size={45}
                    color='#2F80ED'
                    style={styles.photoPostIcon}
                  />
                  <Text style={styles.photoLabel}>Take a photo</Text>
                </TouchableOpacity>
              </View>
            </View>
              {this.state.image ?
                <View style={styles.takenPhotoShow}>
                  <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" />
                </View> :
                <View></View>
              }
              <View style={styles.textInputContainer}>
                <TextInput
                  editable={true}
                  placeholder={"Share your thoughts!"}
                  placeholderTextColor={'gray'}
                  multiline={true}
                  value={newPostContent}
                  onChangeText={(text) => this.setState({ newPostContent: text })}
                  style={styles.postTextInput}
                />
              </View>
          </View>
          </KeyboardAwareScrollView>
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
  postInfoContainer: {
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
  postTextInput: {
    height: 200,
    fontSize: 22,
    color: 'black',
  },
  uploadImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLabel: {
    color: '#737373'
  },
  photoPostIcon: {
    alignSelf: 'center',
  },
  imageShareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  takenPhotoShow: {
    width: '100%',
    height: 250,
  },
  postImage: {
    width: '100%',
    height: 250,
  }

});
