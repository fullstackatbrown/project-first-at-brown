import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import API from "../../api";

const SettingsScreen = () => {
  const { accountId, token } = useSelector((state) => state.auth);
  const [accountDetails, setAccountDetails] = useState({});

  // load user details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      const response = await API.get(`account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccountDetails(response.data);
    };

    fetchAccountDetails();
  }, []);

  return (
    <View>
      <Text>{accountDetails.first_name}</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
