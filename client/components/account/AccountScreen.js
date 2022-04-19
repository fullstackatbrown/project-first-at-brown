import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Avatar, Text, Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, CommonActions } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import API from '../../api';
import { logout } from '../../redux/actions/auth';

const AccountScreen = ({ navigation }) => {
  const { accountId, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // load user details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      const response = await API.get(`account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccountDetails(response.data);
      setIsLoading(false);
    };

    fetchAccountDetails();
  }, [isFocused]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }

    const formData = await createPhotoFormData(result);
    await API.post('account/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const createPhotoFormData = async (image) => {
    const data = new FormData();
    data.append('name', 'avatar');
    let uri = image.uri;
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 0.7, format: 'jpeg' }
    );
    uri = resizedPhoto.uri;
    let filename = uri.substring(uri.lastIndexOf('/') + 1, uri.length);
    data.append('avatar', {
      name: filename,
      type: image.type,
      uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
    });
    return data;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 120,
          backgroundColor: '#C8C8C8',
          marginBottom: 46,
          borderRadius: 10,
        }}
      >
        {image || accountDetails.picture ? (
          <Image
            source={{ uri: image?.uri || accountDetails.picture }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        ) : (
          <Image
            style={{ height: 70, width: 70 }}
            source={require('../../assets/camera.png')}
          />
        )}
      </TouchableOpacity>
      <View style={styles.pictureNameDisplay}>
        <Avatar
          rounded
          size="large"
          source={{
            uri:
              accountDetails.picture ||
              'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
          }}
          placeholderStyle={{ backgroundColor: 'transparent' }}
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
        <Text style={styles.label}>Hometown</Text>
        <Text style={styles.content}>{accountDetails.hometown}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Pronouns</Text>
        <Text style={styles.content}>{accountDetails.pronouns}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Introduction</Text>
        <Text style={styles.content}>{accountDetails.bio}</Text>
      </View>
      <Divider style={styles.section} />
      <View style={styles.section}>
        <Button
          icon={{
            name: 'edit',
            size: 15,
            color: 'white',
          }}
          title="Edit Profile"
          style={styles.section}
          onPress={() => {
            navigation.navigate('Edit', { accountDetails });
          }}
        />
      </View>
      <View style={styles.section}>
        <Button
          type="clear"
          title="Logout"
          style={styles.section}
          onPress={() => {
            const reset = () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: 'Messages' }, { name: 'Account' }],
                })
              );
            };
            dispatch(logout(reset));
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  pictureNameDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    justifyContent: 'space-around',
  },
  label: {
    color: 'dimgrey',
  },
  content: {
    fontSize: 20,
  },
  section: {
    marginTop: 10,
  },
});
