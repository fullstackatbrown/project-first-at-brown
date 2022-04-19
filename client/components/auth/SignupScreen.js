import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../api';
import { login } from '../../redux/actions/auth';
import MultilineInput from '../common/MultilineInput';
import Select from '../common/Select';
import ShortInput from '../common/ShortInput';
import * as ImageManipulator from 'expo-image-manipulator';

const SignupScreen = ({ route }) => {
  const { accountId, token } = useSelector((state) => state.auth);
  const { userData } = route.params;
  const [isSending, setIsSending] = useState(false);
  const [firstName, setFirstName] = useState(userData.givenName);
  const [lastName, setLastName] = useState(userData.familyName);
  const [year, setYear] = useState(null);
  const [hometown, setHometown] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const navigation = useNavigation();

  const currentYear = new Date().getFullYear();
  const yearRef = useRef();

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const createPhotoFormData = async (body = {}) => {
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
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  const onSubmitHandler = async () => {
    setIsSending(true);
    try {
      const response = await API.post(
        'account',
        await createPhotoFormData({
          firstName,
          lastName,
          year,
          pronouns,
          hometown,
          bio: bio,
          token: userData.id,
          email: userData.email,
        }),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch(login(response.data.token, response.data.accountId));
      setIsSending(false);
    } catch (e) {
      console.log(e);
      setIsSending(false);
    }
  };

  if (pageIndex === 0) {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          onTouchEnd={() => yearRef.current.blur()}
          contentContainerStyle={styles.scroll}
        >
          <View>
            <Text style={styles.title}>
              It’s great to meet you, {firstName}!
            </Text>
            <Select
              style={{ marginBottom: 46 }}
              options={[0, 1, 2, 3].map((difference) => {
                const year = currentYear + difference;
                return { label: `Class of ${year}`, value: year };
              })}
              value={year}
              onSelect={setYear}
              ref={yearRef}
              label={'What’s your class year? *'}
            />
            <ShortInput
              label={'What are your pronouns?'}
              autoCapitalize={'none'}
              value={pronouns}
              onChange={setPronouns}
            />
          </View>
          <View style={styles.centerRow}>
            <TouchableOpacity
              disabled={!year}
              onPress={() => setPageIndex(1)}
              style={{
                ...styles.continue,
                backgroundColor: !year ? '#C8C8C8' : '#4F19A8',
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  } else if (pageIndex === 1) {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPageIndex(0)}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
          <View>
            <Text style={styles.title}>Let us know a bit more about you!</Text>
            <ShortInput
              value={hometown}
              onChange={setHometown}
              label={'Where’s your hometown?'}
              autoCapitalize={'words'}
            />
          </View>
          <View style={styles.centerRow}>
            <TouchableOpacity
              onPress={() => setPageIndex(2)}
              style={styles.continue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  } else if (pageIndex === 2) {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPageIndex(1)}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
          <View>
            <Text style={[styles.title, { marginBottom: 40 }]}>
              Wrapping up!
            </Text>
            <Text style={styles.prompt}>Add a profile picture!</Text>

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
              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              ) : (
                <Image
                  style={{ height: 70, width: 70 }}
                  source={require('../../assets/camera.png')}
                />
              )}
            </TouchableOpacity>
            <MultilineInput
              value={bio}
              onChange={setBio}
              label={'Add a bio!'}
            />
          </View>
          <View style={styles.centerRow}>
            <TouchableOpacity
              onPress={() => onSubmitHandler()}
              style={styles.continue}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  scroll: {
    padding: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 140,
    flex: 1,
    paddingBottom: 100,
  },
  continue: {
    backgroundColor: '#4F19A8',
    paddingHorizontal: 70,
    paddingVertical: 16,
    borderRadius: 40,
  },
  centerRow: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  title: { fontWeight: '700', fontSize: 24, marginBottom: 80 },
  header: {
    position: 'absolute',
    height: 110,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 36,
    backgroundColor: '#FBFBFB',
    width: '100%',
    zIndex: 1000,
  },
  prompt: { fontSize: 16, marginBottom: 18 },
});
