import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import API from '../../api';
import RoomCard from './RoomCard';

const RoomsOverviewScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await API.get('/rooms', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setRooms(response.data);
  };

  const refreshRooms = async () => {
    setIsRefreshing(true);
    await fetchRooms();
    setIsRefreshing(false);
  };

  const renderRoom = ({ item }) => {
    return (
      <RoomCard
        prompt={item.prompt}
        numResponses={Number(item.num_responses)}
        expiresAt={item.expires_at}
        onClick={() => navigation.navigate('Room', { roomId: item.room_id })}
      />
    );
  };

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      await fetchRooms();
      setIsLoading(false);
    };

    initialLoad();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        onRefresh={refreshRooms}
        refreshing={isRefreshing}
        keyExtractor={(item) => String(item.room_id)}
      />
    </View>
  );
};

export default RoomsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
