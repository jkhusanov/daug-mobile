import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

export default StackNavigator ({
  Profile: {
    screen: ProfileScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
}); 