import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MessagesNavigator from './MessagesNavigator';
import RoomsNavigator from './RoomsNavigator';
import AccountNavigator from './AccountNavigator';
import { View } from 'react-native';
import ChatIcon from '../components/icons/ChatIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import RoomsIcon from '../components/icons/RoomsIcon';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false, activeTintColor: '#4F19A8' }}
      initialRouteName="Rooms"
    >
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: '100%', height: 28 }}>
              <ChatIcon color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: '100%', height: 28 }}>
              <RoomsIcon color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: '100%', height: 28 }}>
              <ProfileIcon color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
