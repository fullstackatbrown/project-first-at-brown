import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";

import config from "../../config";
import API from "../../api";
import { autoLogin } from "../../redux/actions/auth";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.ANDROID_CLIENT_ID,
        iosClientId: config.IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.idToken;
      } else {
        return null;
        // return { cancelled: true };
      }
    } catch (e) {
      return null;
      // return { error: true };
    }
  };

  const attemptSignin = async () => {
    const token = await signInWithGoogleAsync();
    if (!token) {
      // error or cancelled
      return;
    }

    // attempt login
    const response = await API.post("account/login", {
      token,
    });

    console.log(response);

    if (response.status === 404) {
      // no account - navigate to signup
      props.navigation.navigate("Signup");
      return;
    }

    if (response.status !== 200) {
      // other errors
      return;
    }

    // SUCCESS - login
    dispatch(autoLogin(response.token, response.accountId));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Button onPress={attemptSignin} title="Google Sign in" />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
