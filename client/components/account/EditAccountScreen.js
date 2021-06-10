import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, Button, Divider, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import API from "../../api";
import { logout } from "../../redux/actions/auth";

const EditAccountScreen = ({ route, navigation }) => {
  const { accountId, token } = useSelector((state) => state.auth);
  const { accountDetails } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [year, setYear] = useState("");
  const [concentration, setConcentration] = useState("");
  const [pronouns, setPronouns] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setYear(accountDetails.year);
    setConcentration(accountDetails.concentration);
    setPronouns(accountDetails.pronouns);
    setIsLoading(false);
  }, []);

  const onSubmitHandler = async () => {
    setIsSending(true);
    await API.put(
      "account",
      {
        firstName: accountDetails.first_name,
        lastName: accountDetails.last_name,
        picture: accountDetails.picture,
        year,
        concentration,
        pronouns,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setIsSending(false);
    navigation.navigate("Account");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.pictureNameDisplay}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:
              accountDetails.picture ||
              "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
          }}
        />
        <View style={styles.name}>
          <Text h3>{accountDetails.first_name}</Text>
          <Text h3>{accountDetails.last_name}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Input
          label="Year"
          value={year.toString()}
          onChangeText={(value) => {
            setYear(parseInt(value));
          }}
        />
      </View>
      <View style={styles.section}>
        <Input
          label="Concentration"
          value={concentration}
          onChangeText={(value) => {
            setConcentration(value);
          }}
        />
      </View>
      <View style={styles.section}>
        <Input
          label="Pronouns"
          value={pronouns}
          onChangeText={(value) => {
            setPronouns(value);
          }}
        />
      </View>
      <Divider style={styles.section} />
      <View style={styles.section}>
        <Button
          icon={{
            name: "save",
            size: 15,
            color: "white",
          }}
          title="Save Edits"
          style={styles.section}
          onPress={onSubmitHandler}
          loading={isSending}
        />
      </View>
    </ScrollView>
  );
};

export default EditAccountScreen;

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
