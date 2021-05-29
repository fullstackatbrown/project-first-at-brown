import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, Button, Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import API from "../../api";
import { logout } from "../../redux/actions/auth";

const SettingsScreen = ({ navigation }) => {
  const { accountId, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const dispatch = useDispatch();

  // load user details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      const response = await API.get(`account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setAccountDetails(response.data);
      setIsLoading(false);
    };

    fetchAccountDetails();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.pictureNameDisplay}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
          }}
        />
        <View style={styles.name}>
          <Text h3>{accountDetails.first_name}</Text>
          <Text h3>{accountDetails.last_name}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Year</Text>
        <Text style={styles.content}>{accountDetails.year}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Concentration</Text>
        <Text style={styles.content}>{accountDetails.concentration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Pronouns</Text>
        <Text style={styles.content}>{accountDetails.pronouns}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Introduction</Text>
        <Text style={styles.content}>
          Are we still doing introductions? (not in schema)
        </Text>
      </View>
      <Divider style={styles.section} />
      <View style={styles.section}>
        <Button
          icon={{
            name: "edit",
            size: 15,
            color: "white",
          }}
          title="Edit Profile"
          style={styles.section}
          onPress={() => {
            navigation.navigate("Edit", { accountDetails });
          }}
        />
      </View>
      <View style={styles.section}>
        <Button
          type="clear"
          title="Logout"
          style={styles.section}
          onPress={() => {
            dispatch(logout());
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  pictureNameDisplay: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  name: {
    justifyContent: "space-around",
  },
  label: {
    color: "dimgrey",
  },
  content: {
    fontSize: 20,
  },
  section: {
    marginTop: 10,
  },
});
