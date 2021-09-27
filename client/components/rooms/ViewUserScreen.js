import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Text, Divider, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import API from '../../api';

const ViewUserScreen = ({ navigation, route }) => {
  const { token, accountId } = useSelector((state) => state.auth);
  const { accountId: displayAccountId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const isFocused = useIsFocused();

  // load user details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      const response = await API.get(`account/${displayAccountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccountDetails(response.data);
      setIsLoading(false);
    };

    fetchAccountDetails();
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.pictureNameDisplay}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:
              accountDetails.picture ||
              'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
          }}
          placeholderStyle={{ backgroundColor: 'transparent' }}
        />
        <View style={styles.name}>
          <Text h3>{accountDetails.first_name}</Text>
          <Text h3>{accountDetails.last_name}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Year</Text>
        <Text style={styles.content}>{accountDetails.year}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Concentration</Text>
        <Text style={styles.content}>{accountDetails.concentration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Pronouns</Text>
        <Text style={styles.content}>{accountDetails.pronouns}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Introduction</Text>
        <Text style={styles.content}>{accountDetails.bio}</Text>
      </View>
      <Divider style={styles.section} />
      {accountId !== displayAccountId && (
        <View style={styles.section}>
          <Button
            icon={{
              name: 'message',
              size: 15,
              color: 'white',
            }}
            title="Send Message"
            onPress={() => {
              navigation.navigate('Messages', {
                screen: 'Chat',
                initial: false,
                params: {
                  recipientId: accountDetails.account_id,
                  recipientName:
                    accountDetails.first_name + ' ' + accountDetails.last_name,
                  recipientPicture: accountDetails.picture,
                },
              });
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ViewUserScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  pictureNameDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    justifyContent: 'space-around',
  },
  label: {
    color: 'dimgrey',
  },
  content: {
    fontSize: 20,
  },
  section: {
    marginTop: 10,
  },
});
