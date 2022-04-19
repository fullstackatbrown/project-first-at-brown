import React from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

const RoomCard = ({
  prompt,
  numResponses,
  expiresAt,
  onClick,
  answered,
  answerable = true,
  largeTitle = false,
  openAnswerModal,
}) => {
  const displayNumResponses = () => {
    const pluralizedText = numResponses === 1 ? ' response' : ' responses';
    return numResponses + pluralizedText;
  };

  const card = (
    <View style={styles.card}>
      <Text style={{ ...styles.cardHeader, fontSize: largeTitle ? 20 : 16 }}>
        {prompt}
      </Text>
      <Text style={styles.numResponses}>{displayNumResponses()}</Text>
      <View style={styles.cardFooter}>
        <Text style={{ ...styles.expiresAt, marginTop: answerable ? 0 : 8 }}>
          Expires in {moment(expiresAt).fromNow()}
        </Text>
        {answerable && (
          <TouchableOpacity
            disabled={answered}
            onPress={openAnswerModal}
            style={{
              ...styles.answerButton,
              backgroundColor: answered ? null : '#4F19A8',
            }}
          >
            <Text
              style={{
                ...styles.answer,
                color: !answered ? 'white' : '#4F19A8',
              }}
            >
              {answered ? 'Answered ✓' : 'Answer'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (onClick === null) {
    return card;
  } else {
    return <Pressable onPress={onClick}>{card}</Pressable>;
  }
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 10,
  },
  cardHeader: {
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  numResponses: {
    fontSize: 14,
    color: '#989898',
    marginBottom: 2,
  },
  expiresAt: {
    fontSize: 16,
    color: '#989898',
  },
  answer: {
    fontSize: 14,
    fontWeight: '500',
  },
  answerButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#4F19A8',
  },
});
