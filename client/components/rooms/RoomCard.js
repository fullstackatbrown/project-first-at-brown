import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from 'react-native-elements';

const RoomCard = ({ roomData, navigation }) => {
  const renderDate = (rawDateString) => {
    const date = new Date(rawDateString);
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(
      date
    );
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    return `${weekday} ${month} ${day}`;
  };

  const displayNumResponses = () => {
    const pluralizedText =
      roomData.num_responses === '1' ? ' response' : ' responses';
    return roomData.num_responses + pluralizedText;
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Room', {
          roomId: roomData.room_id,
        });
      }}
    >
      <View style={styles.card}>
        <Text h4 style={styles.cardHeader}>
          {roomData.prompt}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.numResponses}>{displayNumResponses()}</Text>
          <Text style={styles.expiresAt}>
            closes {renderDate(roomData.expires_at)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    margin: 10,
  },
  cardHeader: {
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numResponses: {
    fontSize: 16,
  },
  expiresAt: {
    fontSize: 12,
  },
});
