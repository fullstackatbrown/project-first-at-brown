import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import Login from "./auth/LoginScreen";
import Test from "./TestScreen";

const EntryScreen = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  return <>{accountId ? <Login /> : <Test />}</>;
};

export default EntryScreen;

const styles = StyleSheet.create({});
