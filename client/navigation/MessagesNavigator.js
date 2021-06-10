import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import MessagesOverviewScreen from "../components/messages/MessagesOverviewScreen";

const Stack = createStackNavigator();

const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesOverviewScreen} />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
