import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import API from "../../api";
import ChatCard from "./ChatCard";

const MessagesOverviewScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const response = await API.get("/chats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data.chats);
    setChats(response.data.chats);
  };

  const refreshChats = async () => {
    setIsRefreshing(true);
    await fetchChats();
    setIsRefreshing(false);
  };

  const renderChat = ({ item }) => {
    return <ChatCard chatData={item} navigation={navigation} />;
  };

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      await fetchChats();
      setIsLoading(false);
    };

    initialLoad();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={chats}
        renderItem={renderChat}
        onRefresh={refreshChats}
        refreshing={isRefreshing}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

export default MessagesOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});
