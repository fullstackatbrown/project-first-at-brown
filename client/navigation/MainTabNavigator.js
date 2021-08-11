import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MessagesNavigator from './MessagesNavigator';
import RoomsNavigator from './RoomsNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
