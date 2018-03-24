import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements'

import COVER from '../../assets/profile/cover.jpeg';
import AVATAR from '../../assets/profile/avatar.jpeg';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShow : false,
      title: 'Profile',
      headerTintColor: '#2F80ED',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: '#FAFAFA',
      },
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      isProfileLoading: true,
      profile: null,
      user: 6,

    };
  }
  componentDidMount() {
    //When the component is loaded
    this.getProfile()
  }
  async getProfile() {

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/6`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)
        this.setState({
          isProfileLoading: false,
          profile: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your profile info', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isProfileLoading: false, response: error })

      console.log(error)

      Alert.alert('Unable to get the profile info. Please try again later')
    }
  }
  _renderProfileBanner(image) {
    if (image) {
      return (
        <Image
          style={styles.coverImage}
          source={{ uri: image }}
        />
      )
    }
    else {
      return (
        <View 
          style={styles.defaultCoverImage}
        >
        </View>

      )
    }
  }
  _renderProfileImage(image) {
    if(image) {
      return (
        <Image
        style={styles.avatarImage}
        source={{ uri: image }}
      />      
    )
    }
  }
  _renderProfileName(name) {
    if(name) {
      return (
        <Text style={styles.profileName}>{name}</Text>
      )
    }
  }
  _renderProfileBio(bio) {
    if(bio) {
      return (
        <Text style={styles.profileInfoText}>{bio}</Text>
      )
    }
  }
  render() {
    const { isProfileLoading, profile, user } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        {!isProfileLoading &&
          <View style={styles.mainContainer}>
            <View style={styles.profileHeaderContainer}>
              <View style={styles.profileHeaderBannerContainer}>
              {this._renderProfileBanner(profile["banner_image"])}
              </View>
              <View style={styles.profileInfoContainer}>
                <View style={styles.profileInfoTopContainer}>
                  <View style={styles.profileAvatarContainer}>
                    {this._renderProfileImage(profile["profile_image"])}
                  </View>
                  <View style={styles.profileStatsEditContainer}>
                    <View style={styles.profileStatsContainer}>
                      <TouchableOpacity style={styles.profileStatsView}>
                        <Text style={styles.profileStatsNumbers}>{profile.posts.length}</Text>
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
                        containerStyle={{ marginBottom: 10, marginTop: 10 }}
                        textStyle={styles.profileEditText}
                        onPress={() => this.props.navigation.navigate('EditProfile', {user})}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.profileInfoBottomContainer}>
                  {this._renderProfileName(profile["name"])}
                  {this._renderProfileBio(profile["bio"])}
                </View>
              </View>
            </View>
            <View style={styles.profilePostsContainer}>

              <View style={styles.profileLogoutContainer}>
                {/* <Button
                text = 'Post Details '
                onPress={() => this.props.navigation.navigate('PostDetails')}
                textStyle={styles.profileLogoutButtonText}
                buttonStyle={styles.profileLogoutButton}
              >  
              </Button> */}
                <Text style={styles.profileStatsNumbers}>{profile.posts.length} Posts</Text>

              </View>
              <View style={styles.profileLogoutContainer}>
                <Button
                  text='Logout'
                  onPress={() => this.props.navigation.navigate('Intro')}
                  textStyle={styles.profileLogoutButtonText}
                  buttonStyle={styles.profileLogoutButton}
                >
                </Button>
              </View>
            </View>
          </View>
        }
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
  defaultCoverImage: {
    backgroundColor: '#e1e8f2',
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
  profileStatsView: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileStatsNumbers: {
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
