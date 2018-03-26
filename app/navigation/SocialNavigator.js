import { StackNavigator } from 'react-navigation';
import CreatePostScreen from '../screens/CreatePostScreen';
import SocialStack from './SocialStack';
import TakePhotoScreen from '../screens/TakePhotoScreen';

const SocialNavigator = StackNavigator({
  SocialStack: {
    screen: SocialStack,
  },
  CreatePost: {
    screen: CreatePostScreen,
  },
  TakePhoto: {
    screen: TakePhotoScreen,
  }
}, {
  initialRouteName: 'SocialStack',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default SocialNavigator;