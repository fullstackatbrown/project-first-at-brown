import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Divider, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useIsFocused, StackActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

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
    <>
      <View
        style={{
          height: 110,
          justifyContent: 'flex-end',
          paddingLeft: 20,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
          }}
        >
          <Entypo name="chevron-thin-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.screen}>
        <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 10 }}>
          {accountDetails.first_name + ' ' + accountDetails.last_name}
        </Text>
        <Text style={{ fontSize: 16, color: '#7B7B7B', marginBottom: 10 }}>
          {accountDetails.pronouns}
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: 28 }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#4F19A8',
              padding: 2,
              paddingHorizontal: 6,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#4F19A8',
              }}
            >
              {`Class of ${accountDetails.year}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            backgroundColor: '#C8C8C8',
            marginBottom: 30,
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri:
                accountDetails.picture ||
                'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
            }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: '#F5F3F7',
            padding: 20,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 14, color: '#A3A3A3', marginBottom: 10 }}>
            HOMETOWN
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>
            🏡 {accountDetails.hometown}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            marginBottom: 30,
            backgroundColor: 'white',
            ...styles.shadow,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            About Me
          </Text>
          <Text>{accountDetails.bio}</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewUserScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 28,
  },
  shadow: {
    shadowOffset: { height: 4 },
    shadowRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
});
