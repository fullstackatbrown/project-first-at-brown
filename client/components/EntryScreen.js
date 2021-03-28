import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import Test from "./TestScreen";
import AuthNavigator from "../navigation/AuthNavigator";

const EntryScreen = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  return <>{accountId ? <AuthNavigator /> : <Test />}</>;
};

export default EntryScreen;

const styles = StyleSheet.create({});
