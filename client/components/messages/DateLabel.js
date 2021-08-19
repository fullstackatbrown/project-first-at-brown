import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";

const DateLabel = ({ date }) => {
  return (
    <View style={styles.messageBox}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
};

export default DateLabel;

const styles = StyleSheet.create({
  messageBox: {
    alignSelf: "center",
    marginTop: 10,
  },
  dateText: {
    color: "gray",
  },
});
