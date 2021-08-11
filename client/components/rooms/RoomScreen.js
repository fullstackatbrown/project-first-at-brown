import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import API from '../../api';

const PromptResponse = ({ response, children }) => {
  const renderTimeSince = (rawDateString) => {
    const simplePluralize = (num, noun) => {
      if (num === 1) {
        return num + ' ' + noun;
      } else {
        return num + ' ' + noun + 's';
      }
    };

    let seconds = Math.floor((new Date() - new Date(rawDateString)) / 1000);
    seconds = seconds > 0 ? seconds : 0;
    let interval = seconds / 31536000;
    if (interval > 1) {
      return simplePluralize(Math.floor(interval), 'year');
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return simplePluralize(Math.floor(interval), 'month');
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return simplePluralize(Math.floor(interval), 'day');
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return simplePluralize(Math.floor(interval), 'hour');
    }
    interval = seconds / 60;
    if (interval > 1) {
      return simplePluralize(Math.floor(interval), 'minute');
    }
    return simplePluralize(Math.floor(seconds), 'second');
  };

  return (
    <View style={styles.response}>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Avatar
          rounded
          size="small"
          source={{
            uri:
              response.picture ||
              'https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg',
          }}
          placeholderStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ marginRight: 15 }}
        />
        <View>
          <Text>
            {response.first_name} {response.last_name}
          </Text>
          <Text>{renderTimeSince(response.created_at)} ago</Text>
        </View>
      </View>
      <Text>{response.body}</Text>
      {children}
    </View>
  );
};

const RoomScreen = ({ route }) => {
  const [prompt, setPrompt] = useState(null);
  const [responses, setResponses] = useState([]);
  const [userResponse, setUserResponse] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const [isEditingResponse, setIsEditingResponse] = useState(false);

  const { roomId } = route.params;
  const { token } = useSelector((state) => state.auth);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchRoom = async () => {
    const response = await API.get('/room/' + roomId, { headers });
    const { prompt, responses, user_response } = response.data;
    setPrompt(prompt);
    setResponses(responses);
    setUserResponse(user_response);
  };

  const createPromptResponse = async () => {
    const body = textInputValue.trim();
    setTextInputValue('');
    const response = await API.post('/prompt/' + roomId, { body }, { headers });
    if (!response.data.createSuccess) {
      console.log(
        'TODO: something went wrong (i.e. user already made a response)'
      );
    }
    fetchRoom();
  };

  const updatePromptResponse = async () => {
    const body = textInputValue;
    setIsEditingResponse(false);
    setTextInputValue('');
    await API.put('/prompt/' + roomId, { body }, { headers });
    fetchRoom();
  };

  const deletePromptResponse = async () => {
    await API.delete('/prompt/' + roomId, { headers });
    fetchRoom();
  };

  const reportPromptResponse = async (authorId) => {
    const response = await API.post(
      '/prompt/' + roomId + '/report/' + authorId
    );
    if (response.data.reportSuccess) {
      console.log('TODO: report success message');
    } else {
      console.log(
        'TODO: report failure message (i.e. user already reported this)'
      );
    }
  };

  const renderUserResponse = () => {
    if (userResponse === null) {
      return (
        <View style={styles.responseInput}>
          <Text>Respond to prompt</Text>
          <TextInput
            multiline
            numberOfLines={5}
            value={textInputValue}
            onChangeText={setTextInputValue}
          />
          <Button
            disabled={textInputValue.trim().length === 0}
            onPress={createPromptResponse}
            title="Submit"
          />
        </View>
      );
    } else if (isEditingResponse) {
      return (
        <View style={styles.responseInput}>
          <Text>Update your response</Text>
          <TextInput
            multiline
            numberOfLines={5}
            value={textInputValue}
            onChangeText={setTextInputValue}
          />
          <View style={styles.buttonRow}>
            <View style={styles.marginLeft}>
              <Button
                title="Cancel"
                color="gray"
                onPress={() => {
                  setIsEditingResponse(false);
                  setTextInputValue('');
                }}
              />
            </View>
            <View style={styles.marginLeft}>
              <Button
                title="Update"
                disabled={textInputValue.trim().length === 0}
                onPress={updatePromptResponse}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userResponse}>
          <Text>Your response</Text>
          <PromptResponse response={userResponse}>
            <View style={styles.buttonRow}>
              {userResponse.report_threshold_exceeded && (
                <Icon name="exclamation-circle" size={24} color="red" />
              )}
              <View style={styles.marginLeft}>
                <Button
                  title="Edit"
                  onPress={() => {
                    setIsEditingResponse(true);
                    setTextInputValue(userResponse.body);
                  }}
                />
              </View>
              <View style={styles.marginLeft}>
                <Button
                  title="Delete"
                  color="red"
                  onPress={deletePromptResponse}
                />
              </View>
            </View>
          </PromptResponse>
        </View>
      );
    }
  };

  const renderResponses = () => {
    return responses.map((r) => (
      <PromptResponse key={r.author_id} response={r} />
    ));
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <View>
      {prompt !== null && (
        <View style={styles.screen}>
          <Text>{prompt}</Text>
          {renderUserResponse()}
          {renderResponses()}
        </View>
      )}
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    flexDirection: 'column',
  },
  responseInput: {},
  response: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
  },
  buttonRow: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 8,
  },
});
