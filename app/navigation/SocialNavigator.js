import { StackNavigator } from 'react-navigation';
import CreatePostScreen from '../screens/CreatePostScreen';
import SocialStack from './SocialStack';

const SocialNavigator = StackNavigator({
  SocialStack: {
    screen: SocialStack,
  },
  CreatePost: {
    screen: CreatePostScreen,
  },
}, {
  initialRouteName: 'SocialStack',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default SocialNavigator;