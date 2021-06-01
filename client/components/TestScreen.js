import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const TestScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>To be replaced with main application.</Text>
      <Button
        onPress={() => {
          dispatch(logout());
        }}
        title="Logout"
      />
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
