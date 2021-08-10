import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import RoomScreen from "../components/rooms/RoomScreen";
import RoomsOverviewScreen from "../components/rooms/RoomsOverviewScreen";

const Stack = createStackNavigator();

const RoomsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={RoomsOverviewScreen} />
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default RoomsNavigator;
