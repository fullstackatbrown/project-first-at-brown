import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OtherUserMessage = ({ body }) => {
  return (
    <View>
      <Text>{body}</Text>
    </View>
  );
};

export default OtherUserMessage;

const styles = StyleSheet.create({});
