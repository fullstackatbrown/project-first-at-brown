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

const PromptResponseCard = ({
  response,
  onClick,
  onLongPress,
  children,
  isAnon,
}) => {
  const card = (
    <View style={styles.response}>
      {!isAnon && (
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Avatar
            rounded
            size="small"
            source={{
              uri:
                response.picture ||
                'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
            }}
            placeholderStyle={{ backgroundColor: 'transparent' }}
            containerStyle={{ marginRight: 15 }}
          />
          <View>
            <Text>
              {response.first_name} {response.last_name}
            </Text>
            <Text>{renderTimeSince(response.created_at)} ago</Text>
          </View>
        </View>
      )}
      <Text
        style={{
          marginBottom: isAnon ? 0 : 8,
          fontWeight: '600',
          fontSize: 16,
        }}
      >
        {response.body}
      </Text>
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
    padding: 16,
    marginBottom: 24,
    shadowOffset: { height: 4 },
    shadowRadius: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    marginHorizontal: 16,
  },
});
