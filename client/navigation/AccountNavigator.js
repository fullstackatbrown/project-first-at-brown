import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditAccountScreen from '../components/account/EditAccountScreen';
import AccountScreen from '../components/account/AccountScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Edit" component={EditAccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
