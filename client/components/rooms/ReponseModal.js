import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import RoomCard from './RoomCard';
import { TextInput } from 'react-native-gesture-handler';
import API from '../../api';
import { useSelector } from 'react-redux';

const ResponseModal = ({ visible, close, item }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const headers = { Authorization: `Bearer ${token}` };

  const createPromptResponse = async () => {
    setLoading(true);
    const body = response.trim();
    console.log(response);
    console.log('hi');
    const res = await API.post(
      '/prompt/' + item.room_id,
      { body },
      { headers }
    );
    setLoading(false);
    close();
    console.log(res);
    if (!res.data.createSuccess) {
      console.log(
        'TODO: something went wrong (i.e. user already made a response)'
      );
    }
  };

  return (
    <Modal
      style={{ flex: 1 }}
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <KeyboardAvoidingView behavior={'position'} style={styles.container}>
          <TouchableOpacity
            style={{
              height: 44,
              width: 44,
              borderRadius: 22,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
              backgroundColor: 'white',
              ...styles.shadow,
            }}
            onPress={close}
          >
            <AntDesign name="close" size={30} color="#A6A6A6" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: 22,
              ...styles.shadow,
            }}
          >
            <RoomCard
              answerable={false}
              prompt={item.prompt}
              numResponses={Number(item.num_responses)}
              expiresAt={item.expires_at}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 16,
              ...styles.shadow,
            }}
          >
            <Text style={{ marginBottom: 10, fontWeight: '600', fontSize: 16 }}>
              Response
            </Text>
            <TextInput
              multiline={true}
              style={{
                height: 140,
                fontSize: 16,
                alignItems: 'flex-start',
              }}
              value={response}
              onChangeText={setResponse}
              placeholder="Type your response here..."
            ></TextInput>
          </View>
          <View
            style={{ width: '100%', alignItems: 'flex-end', marginTop: 30 }}
          >
            <TouchableOpacity
              disabled={loading}
              onPress={() => createPromptResponse()}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 8,
                backgroundColor: '#4F19A8',
                borderRadius: 10,
                ...styles.shadow,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>
                Answer
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ResponseModal;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { height: 4 },
    shadowRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
});
