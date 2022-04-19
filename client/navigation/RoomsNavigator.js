import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import RoomScreen from '../components/rooms/RoomScreen';
import RoomsOverviewScreen from '../components/rooms/RoomsOverviewScreen';
import ViewUserScreen from '../components/rooms/ViewUserScreen';

const Stack = createStackNavigator();

const RoomsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Rooms" component={RoomsOverviewScreen} />
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={{ title: '' }}
      />
      <Stack.Screen name="User" component={ViewUserScreen} />
    </Stack.Navigator>
  );
};

export default RoomsNavigator;
