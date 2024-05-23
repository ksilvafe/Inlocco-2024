import React, {useState, useCallback} from 'react';
import { FeedPost } from '../../../components/FeedPost';
import {FeedSkeleton} from '../../../components/Skeletons/FeedSkeleton';

import {Column, ColumnContainer, Container, Content } from './styles';

import {FeedScreenProps} from '../../../@types/screens';
import {useQuery} from 'react-query';
import {api, HOST} from '../../../services/api';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';
import {useAuth} from '../../../contexts/auth';
import {ITrip} from '../../../@types/api';

export const Feed: React.FC<FeedScreenProps> = ({navigation}) => {
  const {user, signOut} = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, isError, data, error, refetch} = useQuery(
    'feed',
    async () => {
      //?status=PUBLISHED
      const res = await api.get('/trips');
      setRefreshing(false);
      return res.data.reverse().filter(item => item.posts.length > 0);
    },
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, []);

  const handlePressPost = (tripCuid: string) =>
    navigation.navigate('PostDetails', {tripCuid});

  const renderItem = ({item}: {item: ITrip}) => {
    return (
      <FeedPost
        isLiked={item.likes?.includes(user?.user.cuid as string)}
        user={item.user}
        posts={item.posts}
        onPress={() => handlePressPost(item.cuid)}
        cuid={item.cuid}
      />
    );
  };

  if (isError) {
    if (error.response.status === 401) {
      signOut();
    }
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  function tripsByColumn(column: 'right' | 'left') {
    const rest = column === 'left' ? 0 : 1;

    return data
      .filter((_, index) => index % 2 === rest)
      .map(item => (
        <FeedPost
          key={item.id}
          isLiked={item.likes?.includes(user?.user.cuid as string)}
          user={item.user}
          posts={item.posts}
          onPress={() => handlePressPost(item.cuid)}
          cuid={item.cuid}
        />
      ));
  }

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <Container>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ColumnContainer>
            <Column>{tripsByColumn('left')}</Column>
            <Column>{tripsByColumn('right')}</Column>
          </ColumnContainer>
        </ScrollView>
      </Content>
    </Container>
  );
};
