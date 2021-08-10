import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-elements";

import ChatScreen from "../components/messages/ChatScreen";
import MessagesOverviewScreen from "../components/messages/MessagesOverviewScreen";

const Stack = createStackNavigator();

const MessagesHeader = ({ picture, name }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        rounded
        size="small"
        source={{
          uri:
            picture ||
            "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
        }}
        placeholderStyle={{ backgroundColor: "transparent" }}
        containerStyle={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </View>
  );
};

const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesOverviewScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          headerTitle: (
            <MessagesHeader
              picture={route.params.recipientPicture}
              name={route.params.recipientName}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
