import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MessagesNavigator from "./MessagesNavigator";
import RoomsNavigator from "./RoomsNavigator";
import SettingsNavigator from "./SettingsNavigator";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Messages" component={MessagesNavigator} />
      <Tab.Screen name="Rooms" component={RoomsNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
