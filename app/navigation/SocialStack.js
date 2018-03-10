import { StackNavigator } from 'react-navigation';
import SocialFeedScreen from '../screens/SocialFeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';


export default StackNavigator ({
  Social: {
    screen: SocialFeedScreen
  },
  PostDetails: {
    screen: PostDetailsScreen,
  },
},
{
  initialRouteName: 'Social',

}); 