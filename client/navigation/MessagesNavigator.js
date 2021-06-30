import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ChatScreen from "../components/messages/ChatScreen";
import MessagesOverviewScreen from "../components/messages/MessagesOverviewScreen";

const Stack = createStackNavigator();

const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesOverviewScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.recipientName })}
      />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
