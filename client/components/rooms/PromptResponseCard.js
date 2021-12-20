import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Avatar } from 'react-native-elements';

const renderTimeSince = (rawDateString) => {
  const simplePluralize = (num, noun) => {
    if (num === 1) {
      return num + ' ' + noun;
    } else {
      return num + ' ' + noun + 's';
    }
  };

  let seconds = Math.floor((new Date() - new Date(rawDateString)) / 1000);
  seconds = seconds > 0 ? seconds : 0;
  let interval = seconds / 31536000;
  if (interval > 1) {
    return simplePluralize(Math.floor(interval), 'year');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return simplePluralize(Math.floor(interval), 'month');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return simplePluralize(Math.floor(interval), 'day');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return simplePluralize(Math.floor(interval), 'hour');
  }
  interval = seconds / 60;
  if (interval > 1) {
    return simplePluralize(Math.floor(interval), 'minute');
  }
  return simplePluralize(Math.floor(seconds), 'second');
};

const PromptResponseCard = ({ response, onClick, onLongPress, children }) => {
  const card = (
    <View style={styles.response}>
      <Text>{response.body}</Text>
      {children}
    </View>
  );

  if (onClick === null) {
    return card;
  } else {
    return (
      <Pressable onPress={onClick} onLongPress={onLongPress}>
        {card}
      </Pressable>
    );
  }
};

export default PromptResponseCard;

const styles = StyleSheet.create({
  response: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 2,
  },
});
