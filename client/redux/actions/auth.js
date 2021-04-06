import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, LOGOUT, SIGNUP } from "./types";

import API from "../../api";

export const signup = () => {
  // TODO: params
  return async (dispatch) => {
    try {
      const response = await API.post("account", {
        // TODO: add body
      });

      if (response.status != 201) throw new Error("Signup failed");

      // store user data in async storage
      await AsyncStorage.setItem(
        "@account",
        JSON.stringify({
          token: response.data.token,
          accountId: response.data.accountId,
        })
      );

      // dispatch login to store
      dispatch({
        type: SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const login = (token, accountId) => {
  return async (dispatch) => {
    // store user data in async storage
    await AsyncStorage.setItem(
      "@account",
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
    await AsyncStorage.removeItem("@account");
    dispatch({ type: LOGOUT });
  };
};
