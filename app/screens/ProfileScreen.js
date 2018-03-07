import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements'

import COVER  from '../../assets/profile/cover.jpeg';
import AVATAR from '../../assets/profile/avatar.jpeg';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.mainContainer}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.profileHeaderCoverContainer}>
              <Image
                style={styles.coverImage}
                source={COVER}
              />
            </View>
            <View style={styles.profileInfoContainer}>
              <View style={styles.profileInfoTopContainer}>
                <View style={styles.profileAvatarContainer}>
                  <Image
                    style={styles.avatarImage}
                    source={AVATAR}
                  />
                </View>
                <View style={styles.profileStatsEditContainer}>
                  <View style={styles.profileStatsContainer}>
                    <TouchableOpacity style={styles.profileStatsView}>
                      <Text style={styles.profileStatsNumbers}>2</Text>
                      <Text style={styles.profileStatsText}>posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileStatsView}>
                      <Text style={styles.profileStatsNumbers}>1550</Text>
                      <Text style={styles.profileStatsText}>followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileStatsView}>
                      <Text style={styles.profileStatsNumbers}>250</Text>
                      <Text style={styles.profileStatsText}>following</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.profileEditContainer}>
                    <Button
                      text='Edit Profile'
                      buttonStyle={styles.profileEditButton}
                      containerStyle={{ marginBottom: 10, marginTop:10 }}
                      textStyle={styles.profileEditText}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.profileInfoBottomContainer}>
                <Text style={styles.profileName}>Bars</Text>
                <Text style={styles.profileInfoText}>I love swimming</Text>
              </View>
            </View>
          </View>
          <View style={styles.profilePostsContainer}>
            <View style={styles.profileLogoutContainer}>
              <Button
                text = 'Logout'
                onPress={() => this.props.navigation.navigate('Intro')}
                textStyle={styles.profileLogoutButtonText}
                buttonStyle={styles.profileLogoutButton}
              >  
              </Button>
            </View>
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
  profileHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: '#aaaaaa',
  },
  profileCoverContainer: {
    height: 200,
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  profileInfoContainer: {
    flex: 1,
  },
  profileInfoTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileAvatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#cccccc', 
    marginTop: -40,
  },
  profileStatsEditContainer: {
    flex: 2,
  },
  profileStatsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStatsView:{
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileStatsNumbers :{
    fontSize: 16,
  },
  profileStatsText: {
    color: '#737373',
  },
  profileEditContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileEditButton: {
    backgroundColor: 'transparent',
    width: 150,
    height: 30,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 5,
  },
  profileEditText: {
    fontSize: 14,
    color: 'black'
  },
  profileInfoBottomContainer: {
    height: 60,
    paddingLeft: 15,
    justifyContent: 'space-between', 
    paddingBottom: 10,   
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfoText: {
    fontSize: 16,
  },
  profilePostsContainer: {
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
  }

});
