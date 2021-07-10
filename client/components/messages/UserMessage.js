import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserMessage = ({ body }) => {
  return (
    <View style={styles.messageBox}>
      <Text>{body}</Text>
    </View>
  );
};

export default UserMessage;

const styles = StyleSheet.create({
  messageBox: {
    alignSelf: "flex-end",
  },
});
