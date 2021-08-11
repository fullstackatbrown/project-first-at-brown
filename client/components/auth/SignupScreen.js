import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Avatar, Button, Divider, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import API from '../../api';
import { login } from '../../redux/actions/auth';

const SignupScreen = ({ route }) => {
  const { userData } = route.params;
  const [isSending, setIsSending] = useState(false);
  const [firstName, setFirstName] = useState(userData.givenName);
  const [lastName, setLastName] = useState(userData.familyName);
  const [year, setYear] = useState(2023);
  const [concentration, setConcentration] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [introduction, setIntroduction] = useState('');

  const dispatch = useDispatch();

  const onSubmitHandler = async () => {
    setIsSending(true);
    try {
      const response = await API.post('account', {
        firstName,
        lastName,
        picture: userData.photoUrl,
        year,
        concentration,
        pronouns,
        bio: introduction,
        token: userData.id,
        email: userData.email,
      });
      setIsSending(false);
      dispatch(login(response.data.token, response.data.accountId));
    } catch (e) {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.avatar}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                userData.photoUrl ||
                'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
            }}
            placeholderStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={(value) => {
              setFirstName(value);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="LastName"
            value={lastName}
            onChangeText={(value) => {
              setLastName(value);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="Year"
            value={year.toString()}
            onChangeText={(value) => {
              setYear(parseInt(value));
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="Concentration"
            value={concentration}
            onChangeText={(value) => {
              setConcentration(value);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="Pronouns"
            value={pronouns}
            onChangeText={(value) => {
              setPronouns(value);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            label="Introduction"
            value={introduction}
            onChangeText={(value) => {
              setIntroduction(value);
            }}
            multiline={true}
          />
        </View>
        <Divider style={styles.section} />
        <View style={styles.section}>
          <Button
            icon={{
              name: 'save',
              size: 15,
              color: 'white',
            }}
            title="Register"
            style={styles.section}
            onPress={onSubmitHandler}
            loading={isSending}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    alignSelf: 'center',
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
