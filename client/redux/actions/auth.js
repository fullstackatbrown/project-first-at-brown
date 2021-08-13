import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN, LOGOUT } from './types';

export const login = (token, accountId) => {
  return async (dispatch) => {
    // store user data in async storage
    await AsyncStorage.setItem(
      '@account',
      JSON.stringify({
        token,
        accountId,
      })
    );

    dispatch({
      type: LOGIN,
      payload: { token, accountId },
    });
  };
};

export const autoLogin = (token, accountId) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { token, accountId },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('@account');
    dispatch({ type: LOGOUT });
  };
};
