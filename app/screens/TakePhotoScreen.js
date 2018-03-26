import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera, Permissions } from 'expo';
import { FontAwesome, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Button, Icon, Header  } from 'react-native-elements';


export default class TakePhotoScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async press() {
    console.log('Button Pressed');
      if (this.camera) {
        console.log('Taking photo');
        let photo = await this.camera.takePictureAsync();
        console.log(photo);
        this.props.navigation.state.params.returnImage(photo.uri);
        this.props.navigation.goBack();

      }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>Please grant Daug access to the camera in your privacy settings.</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#FAFAFA', }}>
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Cancel</Text>
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'Take a photo',
              style: {
                color: '#2F80ED', fontSize: 20,
                fontWeight: 'bold',
              }
            }}
            rightComponent={
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.navBar}>Done</Text>
              </TouchableOpacity>
            }
            outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
          />
        </SafeAreaView>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref} }>

            <View
              style={
                styles.cameraButtonsContainer
              }>
              <TouchableOpacity
                style={styles.chooseButton}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon
                  name='refresh'
                  type='simple-line-icon'
                  size={40}
                  color='#2F80ED'
                  style={{ height: 100, width: 100, backgroundColor: 'transparent', padding: 10, alignItems: 'center', }}>
                </Icon>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.takePhotoButton}
                onPress={this.press.bind(this)}>
                <Icon
                  name='circle'
                  type='feather'
                  size={40}
                  color='#2F80ED'
                  style={{ height: 100, width: 100, backgroundColor: 'transparent', padding: 10, alignItems: 'center',  }}>
                </Icon>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
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
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
    justifyContent: 'space-around'
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
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  takePhotoButton: {
    marginRight:100,
    marginBottom: 6,
  },
  chooseButton: {
   
  }

});
