import { StackNavigator } from 'react-navigation';
import SocialFeedScreen from '../screens/SocialFeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';


export default StackNavigator ({
  Social: {
    screen: SocialFeedScreen
  },
  PostDetails: {
    screen: PostDetailsScreen,
  },
  Profile: {
    screen: ProfileScreen,
  }
},
{
  initialRouteName: 'Social',

}); 