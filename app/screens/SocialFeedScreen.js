import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableOpacity, Image, ScrollView, StatusBar, Alert, DeviceEventEmitter, ActivityIndicator, RefreshControl } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import { Provider } from 'react-redux'
import { ENV_URL, getUserId, timeSince } from '../utils/auth';


export default class SocialFeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Daug',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      isLoading: false,
      posts: null,
      postId: null,
    };
  }

  componentDidMount() {
    //When the component is loaded
    this.getFeed()
    //getting user ID from AsyncStorage 
    getUserId()
      .then(res => {
        this.setState({ userId: res })
        this.fetchUser()
      })
      .catch(err => {
        alert("An error occurred")
      });
  }
  //Getting feed
  async getFeed() {
    this.setState({ isLoading: true });
    const { postId } = this.state
    try {
      let response = await fetch(`${ENV_URL}/api/feed`, {
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
          isLoading: false,
          posts: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ response: error })

      console.log(error)

      Alert.alert('Unable to get the feed. Please try again later')
    }
  }

  //Getting user id
  async fetchUser() {
    this.setState({ isLoading: true });

    try {
      let response = await fetch(`${ENV_URL}/api/users/${this.state.userId}`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ user: responseJSON, isLoading: false })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed" + error);
      }
    } catch (error) {
      console.log("failed" + error);
    }
  }
  //Posting new like 
  async postLike(postId) {
    const { user } = this.state

    try {
      let response = await fetch(`${ENV_URL}/api/posts/${postId}/like/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.getFeed()
        this.setState({ liked: true })

        Alert.alert(
          'You liked this post!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("liked!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('1 Unable to like post! ', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('1.2 Unable to like post! ', `${error}`)
    }
  }
  //Used to refresh screen if user information is changed in EditProfile
  componentWillMount() {
    DeviceEventEmitter.addListener('new_post_created', (e) => {
      this.getFeed()
    })
  }

  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  // Posting new unlike
  async postUnLike(postId) {
    const { user } = this.state

    try {
      let response = await fetch(`${ENV_URL}/api/posts/${postId}/unlike/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.getFeed()
        this.setState({ liked: false })

        Alert.alert(
          '*** You unliked this post!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("unliked!")

              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('2 Unable to unlike post! ', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('2.1 Unable to unlike post! ', `${error}`)
    }
  }
  _renderProfileImage(image) {
    if (image) {
      return (
        <Image source={{ uri: image }} style={styles.avatar} />
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
  _renderPostImage(image) {
    if (image) {
      return (
        <Image style={styles.postImage} source={{ uri: image }} resizeMode="cover" />
      )
    }
  }
  _renderPostDescription(description) {
    if (description) {
      return (
        <Text style={styles.postCaption}> {description}</Text>
      )
    }
  }

  _renderMembers(member) {
    const { user, liked, } = this.state;

    return (
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ecf0f1"
        />
        <View style={styles.membersRowContainer} key={member}>
          <View style={styles.postInfoTopContainer}>
            <View style={styles.postAuthorAvatarContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile', (member.user.id == this.state.userId) ? { isHeaderShow: false, userId: member.user.id } : { isHeaderShow: true, userId: member.user.id })}
              >
                {this._renderProfileImage(member.user["profile_image"])}
              </TouchableOpacity>
            </View>
            <View style={styles.postAuthorInfoContainer}>
              <View style={styles.nameContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Profile', (member.user.id == this.state.userId) ? { isHeaderShow: false, userId: member.user.id } : { isHeaderShow: true, userId: member.user.id })}
                >
                  <Text style={styles.nameLabel}>{member.user.name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.locationContainer}>
                <TouchableOpacity>
                  <Text style={styles.locationLabel}>{member.location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PostDetails', { postId: member.id })
              }
              activeOpacity={0.9}
            >
              <View style={styles.postImageContainer}>
                {this._renderPostImage(member["image"])}
              </View>
              <View style={styles.postCaptionContainer}>
                {this._renderPostDescription(member["description"])}
              </View>
            </TouchableOpacity>

          </View>
          <View style={styles.postInfoBottomContainer}>
            <View style={styles.postDataContainer}>
              <Text style={styles.postDate}>{timeSince(member.createdAt)}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PostDetails', { postId: member.id })
              }
              activeOpacity={0.9}
            >
              <View style={styles.postCommentContainer}>
                <Icon
                  name='comments-o'
                  type='font-awesome'
                  size={25}
                  color='#666666'
                />
                <Text style={styles.postActionText}>{member.comments.length}</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.postLikeContainer, { marginRight: 20 }]}>
              <TouchableOpacity onPress={() => liked === false ? this.postLike(member.id) : this.postUnLike(member.id)}>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PostDetails', { postId: member.id })}> */}
                <Icon
                  name={liked ? 'heart' : 'heart-o'}
                  type='font-awesome'
                  color={liked ? 'red' : 'black'}
                  size={25}
                />
              </TouchableOpacity>
              <Text style={styles.postActionText}>{member.likes.length}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  renderList() {
    const { isLoading, posts, } = this.state
    return (
      <View style={styles.flatListContainer}>

          <FlatList
            data={posts}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this._renderMembers(item)}
            onRefresh={() => this.getFeed()}
            refreshing={isLoading}
          />
      </View>
    )
  }
  render() {
    const { isLoading, user, postId, posts } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView  
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => this.getFeed()}
        />}>
          <View style={styles.createPostContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost', { member: user })}>
              <Text style={styles.createPostLabel}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost', { member: user })}>
              <Icon
                name='picture'
                type='simple-line-icon'
                size={23}
                iconStyle={styles.photoPostIcon}
              />
            </TouchableOpacity>
          </View>
          {isLoading ? this.loadingView() : this.renderList()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  membersRowContainer: {
    backgroundColor: 'white',
  },
  flatListContainer: {
    justifyContent: 'center',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginLeft: 5,
    borderColor: '#aaaaaa',
    borderWidth: 0.5,
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
  postInfoTopContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
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
  postContainer: {
    backgroundColor: '#FAFAFA',
  },
  postImage: {
    width: '100%',
    height: 250,
  },
  postCaption: {
    margin: 10,
    color: '#44484B',
    fontSize: 18,
  },
  postInteractionContainer: {

  },
  postInfoBottomContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postDataContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  postDate: {
    marginLeft: 20,
    color: '#44484B',
    fontSize: 11,
  },
  postCommentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postLikeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postActionText: {
    marginLeft: 10,
    color: '#44484B',
    fontSize: 15,
  },
  createPostContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fcfcfd',
    borderBottomWidth: 0.3,
    borderBottomColor: '#aaaaaa',
  },
  createPostLabel: {
    color: '#2F80ED',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,

  },
  photoPostIcon: {
    marginRight: 20,
    color: '#ff99cc',
  },
  defaultProfileAvatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginLeft: 5,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },



});
