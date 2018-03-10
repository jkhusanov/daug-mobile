import React from 'react';
import { Platform } from 'react-native';

import { TabNavigator } from 'react-navigation';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

import ProfileNavigator from './ProfileNavigator';
import SocialNavigator from './SocialNavigator';


const HomeTabs = TabNavigator({
  SocialTab: {
    screen: SocialNavigator,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons
          name='layers'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
  ProfileTab: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name='user-circle'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      ),
    }
  }
}, {
  initialRouteName: 'SocialTab',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS === 'ios' ? false : true,
  swipeEnabled: Platform.OS === 'ios' ? false : true,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#2F80ED',
    inactiveTintColor: '#999999',
    style: {
      backgroundColor: '#ffffff',
      padding: Platform.OS === 'ios' ? 5 : 0,
    },
    indicatorStyle: {
      backgroundColor: 'white'
    },
    labelStyle: {
      fontSize: 12
    }
  }
});

export default HomeTabs;