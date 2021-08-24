import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import socket from "../../socket";

import API from "../../api";
import OtherUserMessage from "./OtherUserMessage";
import UserMessage from "./UserMessage";
import DateLabel from "./DateLabel";

const ChatScreen = ({ route, navigation }) => {
  const { token, accountId } = useSelector((state) => state.auth);
  const { recipientId, recipientName } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  const renderChatMessage = ({ item, index }) => {
    const currentDate = new Date(item.created_at);
    const currentTimeString = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDateString = currentDate.toLocaleDateString();
    const prevDateString =
      messages[index + 1] &&
      new Date(messages[index + 1].created_at).toLocaleDateString();
    const isFirstOfDay = currentDateString !== prevDateString;

    if (item.sender_id === accountId) {
      return (
        <>
          <UserMessage body={item.body} time={currentTimeString} />
          {isFirstOfDay && <DateLabel date={currentDateString} />}
        </>
      );
    } else {
      return (
        <>
          <OtherUserMessage body={item.body} time={currentTimeString} />
          {isFirstOfDay && <DateLabel date={currentDateString} />}
        </>
      );
    }
  };

  const sendMessage = async () => {
    if (!messageToSend) {
      return;
    }

    const response = await API.post(
      "message",
      { body: messageToSend, recipientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessageToSend("");
    setMessages([response.data, ...messages]);
  };

  useEffect(() => {
    // LOAD MESSAGES
    const fetchMessages = async () => {
      const response = await API.get(`chat?recipientId=${recipientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages);
    };

    fetchMessages();
  }, []);

  // SET UP SOCKET
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([data, ...messages]);
    });
  }, [messages]);

  return (
    <View style={styles.screen}>
      <FlatList
        inverted
        keyExtractor={(item) => item.message_id.toString()}
        data={messages}
        renderItem={renderChatMessage}
      />
      <View style={styles.userInput}>
        <TextInput
          autoFocus
          value={messageToSend}
          onChangeText={(message) => setMessageToSend(message)}
          placeholder="Message"
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  userInput: {},
});
