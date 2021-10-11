import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MessagesNavigator from './MessagesNavigator';
import RoomsNavigator from './RoomsNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (iconName) => {
  const tabBarIcon = ({ color, size }) => (
    <MaterialCommunityIcons name={iconName} color={color} size={size} />
  );
  return tabBarIcon;
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: getTabBarIcon('forum'),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsNavigator}
        options={{
          tabBarIcon: getTabBarIcon('account-group'),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: getTabBarIcon('cogs'),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
