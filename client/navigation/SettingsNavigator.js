import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SettingsScreen from "../components/settings/SettingsScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
