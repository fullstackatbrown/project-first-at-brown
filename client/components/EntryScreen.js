import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Test from "./TestScreen";
import AuthNavigator from "../navigation/AuthNavigator";
import { autoLogin } from "../redux/actions/auth";

const EntryScreen = () => {
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.auth.accountId);

  // check async storage and auto login
  useEffect(() => {
    const attemptAutoLogin = async () => {
      // check if user data is stored
      const accountData = await AsyncStorage.getItem("@account");
      if (accountData) {
        const accountDataJSON = JSON.parse(accountData);
        dispatch(autoLogin(accountDataJSON.token, accountDataJSON.accountId));
      }
    };

    attemptAutoLogin();
  }, []);

  return <>{accountId ? <Test /> : <AuthNavigator />}</>;
};

export default EntryScreen;

const styles = StyleSheet.create({});
