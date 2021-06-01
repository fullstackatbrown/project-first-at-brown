import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import RoomsOverviewScreen from "../components/rooms/RoomsOverviewScreen";

const Stack = createStackNavigator();

const RoomsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={RoomsOverviewScreen} />
    </Stack.Navigator>
  );
};

export default RoomsNavigator;
