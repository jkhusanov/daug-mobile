import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, DeviceEventEmitter, Alert, FlatList, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { Button } from 'react-native-elements'
import { ENV_URL, getUserId } from '../utils/auth';

const DEVICE_WIDTH = Dimensions.get('window').width;

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
    const userId = props.navigation.state.params && props.navigation.state.params.userId
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow

    this.state = {
      isLiked: false,
      isProfileLoading: true,
      profile: null,
      isHeaderShow: isHeaderShow || false,
      userId: userId || null,
    };
  }
  componentDidMount() {
    //When the component is loaded
    const { userId } = this.state

    //userId null means that we are viewing our own profile and we need to get our profile's information
    if (userId === null) {
      getUserId()
        .then(res => {
          this.setState({ userId: res })
          this.state.profile === null && this.getProfile()
        })
        .catch(err => {
          alert("An error occurred")
        });
    }
    //this is needed to follow a user when their profile is viewed
    else {
      this.getProfile()

      getUserId()
        .then(res => {
          this.setState({ profile_detail_user_id: res })
        })
        .catch(err => {
          alert("An error occurred")
        });
    }
  }
  //Used to refresh screen if user information is changed in EditProfile
  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (e) => {
      this.getProfile()
    })
  }
  async getProfile() {
    this.setState({ isProfileLoading: true });
    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}`, {
        method: 'GET',
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)
        this.setState({
          profile: responseJSON,
          isProfileLoading: false,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        Alert.alert('Unable to get your profile info', `Reason.. ${error}!`)
      }
    } catch (error) {

      console.log(error)

      Alert.alert('Unable to get the profile info. Please try again later')
    }
  }

  //Follow a user
  async followUser() {
    const { profile_detail_user_id, userId } = this.state

    try {
      let response = await fetch(`${ENV_URL}/api/users/${profile_detail_user_id}/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = response.json();

        console.log(responseJSON)
        this.getProfile()
        this.setState({ following: true })

        Alert.alert(
          'Following user!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("User followed!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isProfileLoading: false, errors: responseJSON.errors, following: false })

        Alert.alert('Unable to follow user ', `${error}`)
      }
    } catch (error) {
      this.setState({ isProfileLoading: false, error, following: false })

      Alert.alert('Unable to follow user ', `${error}`)
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
  _renderProfileName(name) {
    if (name) {
      return (
        <Text style={styles.profileName}>{name}</Text>
      )
    }
  }
  _renderProfileBio(bio) {
    if (bio) {
      return (
        <Text style={styles.profileInfoText}>{bio}</Text>
      )
    }
  }
  _renderPostImage(image) {
    if (image) {
      return (
        <Image
          style={styles.postImage}
          source={{ uri: image }}
        />
      )
    }
  }
  //displaying posts 
  displayPost(post, index) {
    const { navigate } = this.props.navigation

    return (
      <TouchableOpacity
        style={[styles.postIconContainer, { width: DEVICE_WIDTH / 3, height: DEVICE_WIDTH / 3 }]}
        key={index}
        onPress={() => navigate('PostDetails', { postId: post.id })}
        activeOpacity={1}
      >
        {post.image && <Image source={{ uri: post.image || '' }} style={styles.postImage} resizeMode="cover" />}
      </TouchableOpacity>
    )
  }

  //loading posts and rendering them with displayPost
  renderPosts() {
    const { posts } = this.state.profile

    return (
      <View style={styles.postsContainer}>
        {
          posts.map((post, index) => {
            return this.displayPost(post, index)
          })
        }
      </View>
    )
  }
  //loading circle 
  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  renderContentView() {
    const { isProfileLoading, profile, isHeaderShow } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }} 
      refreshControl={
        <RefreshControl
          refreshing={isProfileLoading}
          onRefresh={() => this.getProfile()}
      />}>
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
                        <Text style={styles.profileStatsNumbers}>{profile.followers.length}</Text>
                        <Text style={styles.profileStatsText}>followers</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.profileStatsView}>
                        <Text style={styles.profileStatsNumbers}>{profile.following.length}</Text>
                        <Text style={styles.profileStatsText}>following</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.profileEditContainer}>
                      {!isHeaderShow ?
                        <Button
                          text='Edit Profile'
                          buttonStyle={styles.profileEditButton}
                          containerStyle={{ marginBottom: 10, marginTop: 10 }}
                          textStyle={styles.profileEditText}
                          onPress={() => this.props.navigation.navigate('EditProfile', { profile: profile })}
                        /> :
                        <Button text={this.state.following ? 'Following' : 'Follow'}
                          containerStyle={{ marginBottom: 10, marginTop: 10 }}
                          buttonStyle={this.state.following ? styles.followingButton : styles.followButton}
                          textStyle={this.state.following ? styles.followingText : styles.followText}
                          onPress={() => this.followUser()}
                        />
                      }
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
              {this.renderPosts()}
            </View>
          </View>
        }
      </ScrollView>
    );
  }
  render() {
    const { user, isHeaderShow, fontLoaded, isProfileLoading } = this.state

    return (
      isProfileLoading || user === null ? this.loadingView() : this.renderContentView()
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
    backgroundColor: 'white'
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
  defaultProfileAvatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: -40,
    backgroundColor: 'white'
  },
  followingButton: {
    width: 150,
    height: 30,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#99ffcc'
  },
  followButton: {
    width: 150,
    height: 30,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 5,
  },
  followingText: {
    color: 'black',
  },
  followText: {

  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postIconContainer: {
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#f9f9f9'
  },
  postImage: {
    flex: 1
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },


});
