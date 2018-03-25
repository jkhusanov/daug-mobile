import { StackNavigator } from 'react-navigation';
import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';


export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      Intro: {
        screen: IntroStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      Home: {
        screen: HomeTabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "Home" : "Intro"
    }

  );
}