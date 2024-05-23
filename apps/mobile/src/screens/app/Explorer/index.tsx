import React, {useCallback, useState} from 'react';
import { ExplorerPost } from '../../../components/ExplorerPost';
import { SearchInput } from '../../../components/Inputs/SearchInput';

import {Container, Content, List} from './styles';

import {useForm} from 'react-hook-form';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import Toast from 'react-native-toast-message';
import {useMutation, useQuery} from 'react-query';
import {ITrip, IProfile} from '../../../@types/api';
import {FeedScreenProps} from '../../../@types/screens';
import EmptyFeed from '../../../components/ListEmptyComponent/EmptyFeed';
import { ListUsers } from '../../../components/ListUsers';
import {useAuth} from '../../../contexts/auth';
import {HOST, api} from '../../../services/api';

export const Explorer: React.FC<FeedScreenProps> = ({navigation}) => {
  const {user, signOut} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [listUsers, setListUsers] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);

  const {isLoading, isError, data, error, refetch} = useQuery(
    'feed',
    async () => {
      const res = await api.get('/trips');
      setRefreshing(false);
      return res.data;
    },
  );

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, []);

  const handlePressPost = (tripCuid: string) =>
    navigation.navigate('PostDetails', {tripCuid});

  const {mutate} = useMutation(
    async (values: {search: string}) => {
      const res = await api.get(`/users?username=${values.search}`);
      setSearchUsers(res.data);
    },
    {
      onError: (e: any, variables, context) => {
        console.error(e.response.data.message);
      },
    },
  );

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  const renderItem = ({item}: {item: ITrip}) => (
    <ExplorerPost
      post={item.posts[0]?.photos && `${HOST}/${item.posts[0].photos[0]}`}
      onPress={() => handlePressPost(item.cuid)}
    />
  );

  const renderItemUsers = ({item}: {item: IProfile}) => (
    <ListUsers
      userCuid={item.cuid}
      username={item.username}
      biography={item.profile.biography}
    />
  );

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <Content>
        <SearchInput
          placeholder="Pesquisar"
          iconName="magnify"
          onSubmitEditing={handleSubmit(onSubmit)}
          control={control}
          name={'search'}
          errors={errors.search}
          touched={touchedFields.search}
          register={register}
          onTouchStart={() => setListUsers(true)}
          autoCapitalize="none"
          handleClose={() => setListUsers(false)}
          closeButton={listUsers}
        />
        {listUsers ? (
          <FlatList
            data={searchUsers}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={renderItemUsers}
            keyExtractor={item => item.cuid}
            ListEmptyComponent={EmptyFeed}
          />
        ) : (
          <List
            columnWrapperStyle={{
              gap: 8,
              justifyContent: 'space-between',
            }}
            contentContainerStyle={{
              gap: 8,
              marginHorizontal: 8,
            }}
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={renderItem}
            keyExtractor={item => item.cuid}
            ListEmptyComponent={EmptyFeed}
          />
        )}
      </Content>
    </Container>
  );
};
