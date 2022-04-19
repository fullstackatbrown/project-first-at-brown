import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSelector } from 'react-redux';
import API from '../../api';
import RoomCard from './RoomCard';
import ResponseModal from './ReponseModal';
import { useFocusEffect } from '@react-navigation/native';

const RoomsOverviewScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [modalId, setModalId] = useState(-1);

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

  useEffect(() => {
    fetchRooms();
  }, [modalId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRooms();
    })
  );

  const renderRoom = ({ item }) => {
    console.log(item);
    return (
      <>
        <ResponseModal
          close={() => setModalId(-1)}
          visible={modalId === item.room_id}
          item={item}
        />
        <View
          style={{
            marginBottom: 24,
            shadowOffset: { height: 4 },
            shadowRadius: 15,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOpacity: 0.1,
          }}
        >
          <RoomCard
            answered={item.responded}
            openAnswerModal={() => setModalId(item.room_id)}
            prompt={item.prompt}
            numResponses={Number(item.num_responses)}
            expiresAt={item.expires_at}
            onClick={() =>
              navigation.navigate('Room', { roomId: item.room_id })
            }
          />
        </View>
      </>
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
        style={{ overflow: 'visible' }}
        data={rooms}
        renderItem={renderRoom}
        onRefresh={refreshRooms}
        refreshing={isRefreshing}
        keyExtractor={(item) => String(item.room_id)}
        ListHeaderComponent={() => (
          <Text style={{ marginVertical: 20, fontSize: 24, fontWeight: '600' }}>
            Rooms
          </Text>
        )}
      />
      {modalId !== -1 && (
        <BlurView style={styles.absolute} tint="dark" intensity={40} />
      )}
    </View>
  );
};

export default RoomsOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
