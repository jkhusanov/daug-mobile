import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image, ScrollView } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import {SOCIAL_FEED_MOCK_DATA} from '../utils/constants';

export default class SocialFeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderMembers(member) {
    return (
      <View>
        <View style={styles.membersRowContainer} key={member}>
          <View style={styles.postInfoTopContainer}>
            <View style={styles.postAuthorAvatarContainer}>
              <Image source={{ uri: member.image }} style={styles.avatar} />
            </View>
            <View stlyle={styles.postAuthorInfoContainer}>
              <View stlyle={styles.nameContainer}>
                <Text style={styles.nameLabel}>{member.name}</Text>
              </View>
              <View stlyle={styles.locationContainer}>
                <Text style={styles.locationLabel}>{member.location}</Text>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.postImageContainer}>           
              <Image style={styles.postImage} source={{uri: member.post.image}} />
            </View>
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
                color='black'
              />
              <Text style={styles.postActionText}>10</Text>
            </View>
            <View style={[styles.postLikeContainer, { marginRight: 20 }]}>
              <Icon
                name='heart'
                type='font-awesome'
                color='red' 
                size={25}
              />
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
    justifyContent: 'center',
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

  }


});
