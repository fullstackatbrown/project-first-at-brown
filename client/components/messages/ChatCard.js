import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

const ChatCard = ({ chatData, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chat', {
          recipientId: chatData.accountId,
          recipientName: chatData.firstName + ' ' + chatData.lastName,
          recipientPicture: chatData.picture,
        });
      }}
    >
      <View style={styles.card}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:
              chatData.picture ||
              'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
          }}
          placeholderStyle={{ backgroundColor: 'transparent' }}
        />
        <View style={styles.description}>
          <Text h4>{chatData.firstName}</Text>
          <Text style={styles.message} numberOfLines={1}>
            {chatData.messages[0].body}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    marginLeft: 10,
    padding: 5,
    justifyContent: 'space-around',
  },
  message: {},
});
