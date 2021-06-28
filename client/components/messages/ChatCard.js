import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-elements";

const ChatCard = ({ chatData }) => {
  return (
    <View style={styles.card}>
      <Avatar
        rounded
        size="large"
        source={{
          uri:
            chatData.picture ||
            "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
        }}
        placeholderStyle={{ backgroundColor: "transparent" }}
      />
      <View style={styles.description}>
        <Text h4>{chatData.firstName}</Text>
        <Text style={styles.message}>{chatData.messages[0].body}</Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  description: {
    marginLeft: 10,
    padding: 5,
    justifyContent: "space-around",
  },
  message: {},
});
