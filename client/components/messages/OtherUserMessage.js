import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OtherUserMessage = ({ body, time }) => {
  return (
    <View style={styles.messageBox}>
      <Text>{body}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

export default OtherUserMessage;

const styles = StyleSheet.create({
  messageBox: {
    alignSelf: 'flex-start',
    maxWidth: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  timeText: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 10,
  },
});
