import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Button, Divider, Input } from "react-native-elements";
import { useSelector } from "react-redux";
import API from "../../api";

const EditAccountScreen = ({ route, navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const { accountDetails } = route.params;
  const [isSending, setIsSending] = useState(false);
  const [firstName, setFirstName] = useState(accountDetails.first_name);
  const [lastName, setLastName] = useState(accountDetails.last_name);
  const [year, setYear] = useState(accountDetails.year);
  const [concentration, setConcentration] = useState(
    accountDetails.concentration
  );
  const [pronouns, setPronouns] = useState(accountDetails.pronouns);
  const [introduction, setIntroduction] = useState(accountDetails.introduction);

  const onSubmitHandler = async () => {
    setIsSending(true);
    await API.put(
      "account",
      {
        firstName,
        lastName,
        picture: accountDetails.picture || "",
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

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:
              accountDetails.picture ||
              "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
          }}
          placeholderStyle={{ backgroundColor: "transparent" }}
        />
      </View>
      <View style={styles.section}>
        <Input
          label="First Name"
          value={firstName}
          onChangeText={(value) => {
            setFirstName(value);
          }}
        />
      </View>
      <View style={styles.section}>
        <Input
          label="LastName"
          value={lastName}
          onChangeText={(value) => {
            setLastName(value);
          }}
        />
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
      <View style={styles.section}>
        <Input
          label="Introduction"
          value={introduction}
          onChangeText={(value) => {
            setIntroduction(value);
          }}
          multiline={true}
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
  avatar: {
    alignSelf: "center",
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
