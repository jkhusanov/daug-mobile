import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera, Permissions } from 'expo';
import { FontAwesome, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Button, Icon, Header } from 'react-native-elements';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};
export default class TakePhotoScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: 'off',
  };
  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

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
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Please grant Daug access to the camera in your privacy settings.</Text>;
    } else {
      return (
        <View style={styles.mainContainer}>
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
          <Camera style={{ flex: 1 }} flashMode={this.state.flash} type={this.state.type} ref={(ref) => { this.camera = ref }}>
            <View
              style={
                styles.cameraButtonsContainer
              }>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon
                  name='ios-reverse-camera-outline'
                  type='ionicon'
                  size={40}
                  color='#2F80ED'
                  style={{ height: 100, width: 100, backgroundColor: 'transparent', padding: 10, alignItems: 'center', }}>
                </Icon>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.flipButton}
                onPress={this.press.bind(this)}>
                <Icon
                  name='circle'
                  type='entypo'
                  size={40}
                  color='#2F80ED'
                  style={{ height: 100, width: 100, backgroundColor: 'transparent', padding: 10, alignItems: 'center', }}>
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton}
                onPress={this.toggleFlash.bind(this)}>
                  <Icon
                  name='ios-flash-outline'
                  type='ionicon'
                  size={40}
                  color='#2F80ED'
                  style={{ height: 100, width: 100, backgroundColor: 'transparent', padding: 10, alignItems: 'center', }}>
                </Icon>
                <Text style={styles.flipText}>{this.state.flash}</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cameraButtonsContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  takePhotoButton: {
  },
  chooseButton: {
  },
  flipButton: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  flipText: {
    color: '#2F80ED',
    fontSize: 15,
  },

});
