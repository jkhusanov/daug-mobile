import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements'


import AVATAR from '../../assets/profile/avatar.jpeg';

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bars',
      email: '',
      password: '',
      bio: 'I love swimming!',
    };
  }
  render() {
    const {name, email, password, bio}  = this.state
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
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
                style ={styles.inputStyle}
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
                style ={styles.inputStyle}
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
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