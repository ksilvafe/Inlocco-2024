import React, {useCallback, useState} from 'react';

import {Container, Content, List, Title} from './styles';
import { EmptyNotifications } from '../../../components/ListEmptyComponent/EmptyNotifications';
import { NotificationItem } from '../../../components/NotificationItem';
import {ActivityIndicator, RefreshControl} from 'react-native';
import Toast from 'react-native-toast-message';
import {useQuery} from 'react-query';
import {HOST, api} from '../../../services/api';
import {INotification} from '../../../@types/api';

export const Notifications: React.FC = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, isError, data, error, refetch} = useQuery<INotification[]>(
    'notifications',
    async () => {
      const res = await api.get('/notifications');
      setRefreshing(false);
      return res.data;
    },
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, []);

  if (isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const navigateToPostDetails = (tripCuid: string) => {
    navigation.navigate('PostDetails', {tripCuid});
  };

  const navigateToUserProfile = (userCuid: string) => {
    navigation.navigate('ProfileStackScreen', {
      screen: 'Profile',
      params: {userCuid},
    });
  };

  const extractItemData = (item: INotification) => ({
    tripCuid: item.trip?.cuid,
    userCuid: item.sender?.cuid,
  });

  const renderItem = ({item}: {item: INotification}) => {
    const {tripCuid, userCuid} = extractItemData(item);

    return (
      <NotificationItem
        onPress={() => {
          if (tripCuid) {
            navigateToPostDetails(tripCuid);
          } else if (userCuid) {
            navigateToUserProfile(userCuid);
          }
        }}
        senderUsername={item.sender.username}
        profile={`${HOST}/${item.sender.profile?.picture}`}
        notificationMessage={item.message}
        // post={`${HOST}/${item.post?.photos[0]}`}
      />
    );
  };

  return (
    <Container>
      <Content>
        <List
          ListHeaderComponent={<Title>Notificações</Title>}
          data={data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item: INotification) => item.cuid}
          ListEmptyComponent={EmptyNotifications}
        />
      </Content>
    </Container>
  );
};
