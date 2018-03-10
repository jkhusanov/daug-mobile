import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import { SOCIAL_FEED_MOCK_DATA } from '../utils/constants';

export default class SocialFeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Daug',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa',},
  });
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }
  renderMembers(member) {
    const { isLiked } = this.state;
    return (
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ecf0f1"
        />
        <View style={styles.membersRowContainer} key={member}>
          <View style={styles.postInfoTopContainer}>
            <View style={styles.postAuthorAvatarContainer}>
              <TouchableOpacity>
                <Image source={{ uri: member.image }} style={styles.avatar} />
              </TouchableOpacity>
            </View>
            <View style={styles.postAuthorInfoContainer}>
              <View style={styles.nameContainer}>
                <TouchableOpacity>
                  <Text style={styles.nameLabel}>{member.name}</Text>
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
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('PostDetails', { member })
              }
            >
              <View style={styles.postImageContainer}>
                <Image style={styles.postImage} source={{ uri: member.post.image }} />
              </View>
            </TouchableHighlight>
            <View style={styles.postCaptionContainer}>
              <Text style={styles.postCaption}> {member.post.caption}</Text>
            </View>
          </View>
          <View style={styles.postInfoBottomContainer}>
            <View style={styles.postDataContainer}>
              <Text style={styles.postDate}>{member.post.date}</Text>
            </View>
            <View style={styles.postCommentContainer}>
              <Icon
                name='comments'
                type='font-awesome'
                size={25}
                color='#666666'
              />
              <Text style={styles.postActionText}>10</Text>
            </View>
            <View style={[styles.postLikeContainer, { marginRight: 20 }]}>
              <TouchableOpacity
                onPress={() => { console.log('like pressed') , this.setState({ isLiked: true }), console.log('and applied', {isLiked}) }}>
                <Icon
                  name='heart'
                  type='font-awesome'
                  color={'red'}
                  size={25}
                />
              </TouchableOpacity>
              <Text style={styles.postActionText}>250</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.createPostContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost')}>
              <Text style={styles.createPostLabel}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePost')}>
            <Icon
                name='picture'
                type='simple-line-icon'
                size={23}
                iconStyle={styles.photoPostIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={SOCIAL_FEED_MOCK_DATA}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => this.renderMembers(item)}
            />
          </View>
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
    marginBottom: 50
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
  },
  postImage: {
    width: '100%',
    height: 230,
  },
  postCaption: {
    margin: 10,
    color: '#44484B',
    fontSize: 15,
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
  createPostLabel:{
    color: '#2F80ED',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,

  },
  photoPostIcon: {
    marginRight: 20,
    color: '#ff99cc',
    
  }



});
