import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PromptResponseCard from './PromptResponseCard';
import RoomCard from './RoomCard';
import API from '../../api';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import ResponseModal from './ReponseModal';
import { BlurView } from 'expo-blur';

const RoomScreen = ({ navigation, route }) => {
  const [prompt, setPrompt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [responses, setResponses] = useState([]);
  const [userResponse, setUserResponse] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reportModal, setReportModal] = useState(null);
  const [responseModal, setResponseModal] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetchRoom();
  }, [responseModal]);

  // List of items to render on this room's screen
  const items = useMemo(() => {
    const newItems = [];
    if (prompt !== null) {
      newItems.push({ type: 'prompt' });
      newItems.push({ type: 'userResponse' });
    }
    responses.forEach((res) => {
      newItems.push({ type: 'response', data: res });
    });
    return newItems;
  }, [prompt, responses]);

  const { roomId } = route.params;
  const { token } = useSelector((state) => state.auth);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchRoom = async () => {
    const response = await API.get('/room/' + roomId, { headers });
    const { expires_at, prompt, responses, user_response } = response.data;
    setExpiresAt(expires_at);
    setPrompt(prompt);
    setResponses(responses);
    setUserResponse(user_response);
    setRoom(response.data);
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
    await API.post('/prompt/' + roomId + '/report/' + authorId, null, {
      headers,
    });
    // if (response.data.reportSuccess) ...
  };

  const renderUserResponse = () => {
    if (userResponse === null) {
      return <></>;
    } else if (isEditingResponse) {
      return (
        <View style={styles.responseInput}>
          <TextInput
            multiline
            numberOfLines={5}
            value={textInputValue}
            onChangeText={setTextInputValue}
            style={styles.textInput}
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
        <PromptResponseCard response={userResponse} onClick={null} isAnon>
          <View style={styles.buttonRow}>
            {userResponse.report_threshold_exceeded && (
              <Icon name="exclamation-circle" size={24} color="red" />
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                paddingVertical: 2,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: 'red',
                marginTop: 10,
              }}
              onPress={deletePromptResponse}
            >
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </PromptResponseCard>
      );
    }
  };

  const renderItemFlatList = ({ item }) => {
    if (item.type === 'prompt') {
      return (
        <>
          <View
            style={{ height: 100, justifyContent: 'flex-end', padding: 10 }}
          >
            <TouchableOpacity
              onPress={() => {
                const popAction = StackActions.pop(1);
                navigation.dispatch(popAction);
              }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <RoomCard
            answered={room.user_response}
            openAnswerModal={() => setResponseModal(true)}
            largeTitle
            prompt={prompt}
            numResponses={responses.length + (userResponse === null ? 0 : 1)}
            expiresAt={expiresAt}
            onClick={null}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#EDEDED',
              marginHorizontal: 16,
              marginBottom: 26,
            }}
          ></View>
        </>
      );
    } else if (item.type === 'userResponse') {
      return renderUserResponse();
    } else if (item.type === 'response') {
      const res = item.data;
      return (
        <PromptResponseCard
          key={res.account_id}
          response={res}
          onClick={() => {
            navigation.navigate('User', { accountId: res.account_id });
          }}
          onLongPress={() =>
            setReportModal({
              authorName: res.first_name + ' ' + res.last_name,
              authorId: res.account_id,
            })
          }
          isAnon
        />
      );
    } else {
      return null;
    }
  };

  const keyExtractorFlatList = (item) => {
    if (item.type === 'prompt') {
      return 'prompt';
    } else if (item.type === 'userResponse') {
      return 'userResponse';
    } else if (item.type === 'response') {
      return 'response' + item.data.account_id;
    } else {
      return '';
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <>
      {room && (
        <>
          <ResponseModal
            close={() => setResponseModal(false)}
            visible={responseModal}
            item={room}
          />
          <View style={styles.screen}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={reportModal !== null}
              onRequestClose={() => {
                setReportModal(null);
              }}
            >
              {reportModal !== null && (
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Report {reportModal.authorName}&#39;s response?
                    </Text>
                    <View style={styles.modalButtonRow}>
                      <Button
                        title="Report"
                        color="red"
                        onPress={() => {
                          reportPromptResponse(reportModal.authorId);
                          setReportModal(null);
                        }}
                      >
                        <Text>Close</Text>
                      </Button>
                      <Button
                        title="Cancel"
                        color="gray"
                        onPress={() => setReportModal(null)}
                      >
                        <Text>Close</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            </Modal>
            <FlatList
              data={items}
              renderItem={renderItemFlatList}
              onRefresh={fetchRoom}
              refreshing={isRefreshing}
              keyExtractor={keyExtractorFlatList}
              style={styles.scrollView}
            />
          </View>
        </>
      )}
      {responseModal && (
        <BlurView style={styles.absolute} tint="dark" intensity={40} />
      )}
    </>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: '#FBFBFB',
  },
  responseInput: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  textInput: {
    backgroundColor: '#ebebeb',
    fontSize: 16,
    textAlignVertical: 'top',
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 100,
  },
  buttonRow: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#FFFFFFAA',
  },
  modalView: {
    maxWidth: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  scrollView: {
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
