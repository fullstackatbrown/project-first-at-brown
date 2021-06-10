import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";

import config from "../../config";
import API from "../../api";
import { login } from "../../redux/actions/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.ANDROID_CLIENT_ID,
        iosClientId: config.IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result);
        return result.user.id;
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

    try {
      // attempt login
      const response = await API.post("account/login", {
        token,
      });

      // SUCCESS - login
      dispatch(login(response.data.token, response.data.accountId));
    } catch (e) {
      // ERROR - if 401, redirect to signup
      if (e.response.status === 401) {
        console.log("Login failed. Redirecting to signup");
        navigation.navigate("Signup");
        return;
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>First at Brown</Text>
      <Button
        style={styles.siginIn}
        onPress={attemptSignin}
        title="Google Sign in"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "normal",
    fontSize: 50,
    color: "black",
  },
  siginIn: {
    alignItems: "center",
  },
});
