import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';

import MainTabNavigator from '../navigation/MainTabNavigator';
import AuthNavigator from '../navigation/AuthNavigator';
import { autoLogin, logout } from '../redux/actions/auth';

const EntryScreen = () => {
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.auth.accountId);

  // check async storage and auto login
  useEffect(() => {
    const attemptAutoLogin = async () => {
      // check if user data is stored
      const accountData = await AsyncStorage.getItem('@account');
      const accountDataJSON = JSON.parse(accountData);
      try {
        await API.post('account/login', {
          token: accountDataJSON.token,
        });
        await dispatch(autoLogin(accountDataJSON.token, accountDataJSON.accountId));
      } catch (e) {
        await dispatch(logout(() => {}));
      }
    };

    attemptAutoLogin();
  }, []);

  if (accountId) {
    return <MainTabNavigator />;
  } else {
    return <AuthNavigator />;
  }
};

export default EntryScreen;
