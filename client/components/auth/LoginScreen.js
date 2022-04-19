import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useDispatch } from 'react-redux';

import config from '../../config';
import API from '../../api';
import { login } from '../../redux/actions/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.ANDROID_CLIENT_ID,
        iosClientId: config.IOS_CLIENT_ID_DEV,
        iosStandaloneAppClientId: config.IOS_CLIENT_ID_PROD,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.user;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  };

  const attemptSignin = async () => {
    const userData = await signInWithGoogleAsync();
    if (!userData) {
      // error or cancelled
      return;
    }
    console.log(userData);

    try {
      // attempt login
      console.log('attempt');
      const response = await API.post('account/login', {
        token: userData.id,
      });
      // SUCCESS - login
      dispatch(login(response.data.token, response.data.accountId));
    } catch (e) {
      // ERROR - if 401, redirect to signup
      if (e.response.status === 401) {
        console.log('Login failed. Redirecting to signup');
        navigation.navigate('Signup', { userData });
        return;
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/waves.png')}
      style={styles.image}
    >
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '70%',
          height: '50%',
        }}
      >
        <View style={{ width: '100%' }}>
          <Text
            style={{ fontSize: 24, fontWeight: '600', textAlign: 'center' }}
          >
            Hi, welcome to
          </Text>
          <Text style={styles.title}>First at Brown</Text>
        </View>
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={{
              padding: 14,
              backgroundColor: 'white',
              width: '100%',
              borderRadius: 40,
            }}
            onPress={attemptSignin}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#4F19A8',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 28,
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>
              Been here before?{' '}
            </Text>
            <TouchableOpacity onPress={attemptSignin}>
              <Text
                style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
