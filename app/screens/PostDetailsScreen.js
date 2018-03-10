import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { POST_DETAILS_MOCK_DATA } from '../utils/constantComments';

export default class PostDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  constructor(props) {
    super(props);
    const { member } = props.navigation.state.params
    this.state = {
      member: member,
    };
  }
  renderComments(comment) {
    return (
      <View style={styles.commentContainer} key={comment}>
        <TouchableOpacity>
          <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
        </TouchableOpacity>
        <View style={styles.postUsernameLocationContainer}>
          <TouchableOpacity style={styles.postUsernameView}>
            <Text style={styles.commentUsernameLabel}>{comment.user.name}</Text>
          </TouchableOpacity>
          <View style={styles.commentLocationContainer}>
            <Text style={styles.commentContentLabel}>{comment.content}</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { member } = this.state
    return (
      <ScrollView>
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
            <View style={styles.postImageContainer}>
              <Image style={styles.postImage} source={{ uri: member.post.image }} />
            </View>
            <View style={styles.postCaptionContainer}>
              <Text style={styles.postCaption}> {member.post.caption}</Text>
            </View>
          </View>
          <View style={styles.postInfoBottomContainer}>
            <View style={styles.postDataContainer}>
              <Text style={styles.postDate}>{member.post.date}</Text>
            </View>
            <View style={[styles.postLikeContainer, { marginRight: 20 }]}>
              <TouchableOpacity>
                <Icon
                  name='heart-o'
                  type='font-awesome'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
              <Text style={styles.postActionText}>250</Text>
            </View>
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.sectionLabel}>COMMENTS</Text>
          <FlatList
            data={POST_DETAILS_MOCK_DATA}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => this.renderComments(item)}
          />
        </View>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
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
  commentsContainer: {
    backgroundColor: 'white',
  },
  commentContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
  },

  postUsernameLocationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  commentAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10
  },
  postUsernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  commentUsernameLabel: {
    fontSize: 14,
    color: '#003366',
    marginLeft: 10,
  },
  commentContentLabel: {
    flex: 1,
    fontSize: 15,
    color: '#111538',
    marginLeft: 10,
  },
  commentLocationContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  sectionLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: '#737373',
  }
});
