import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';

export default StackNavigator ({
  Profile: {
    screen: ProfileScreen,
  },
  PostDetails: {
    screen: PostDetailsScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
  
},
{
  initialRouteName: 'Profile',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
}); 