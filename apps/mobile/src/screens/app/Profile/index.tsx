import React, {useCallback} from 'react';
import { ProfilePost } from '../../../components/ProfilePost';
import { ProfileActionButton } from '../../../components/Buttons/ProfileActionButton';
import {ActivityIndicator} from 'react-native';
import {ProfileScreenProps} from '../../../@types/screens';
import {useMutation, useQuery} from 'react-query';
import {HOST, api} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {IProfile, ITrip} from '../../../@types/api';
import {useAuth} from '../../../contexts/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {
  Image,
  Paragraph,
  SizableText,
  Tabs,
  Text,
  XStack,
  YStack,
  ScrollView,
} from 'tamagui';
import {FileStack, LayoutDashboard} from '@tamagui/lucide-icons';
import { ProfileData } from './ProfileData';

export const Profile: React.FC<ProfileScreenProps> = ({navigation, route}) => {
  /*   StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  } */
  const theme = useTheme();
  const {user} = useAuth();
  const {userCuid} = route.params;

  const {isLoading, isError, data, error, refetch} = useQuery<IProfile>(
    'profile',
    async () => {
      const res = await api.get(`/users/profile/${userCuid}`);
      return res.data;
    },
  );

  const createFollowMutate = useMutation(
    (userCuid: string) =>
      api.post('/follows', {
        following: userCuid,
      }),
    {
      onSuccess: async (data, variables, context) => {
        console.info(data);
      },
      onError: (e: any, variables, context) => {
        console.error(e.response.data.message);
      },
    },
  );

  function transformData(data) {
    return data.map(item => {
      return {
        node: {
          type: 'image',
          subTypes: null, // You can specify subTypes if needed
          group_name: null, // You can specify group_name if needed
          image: {
            filename: null, // You can specify filename if needed
            filepath: null, // You can specify filepath if needed
            extension: null, // You can specify extension if needed
            uri: `${HOST}/${item.photos[0]}`, // Assuming each item has only one photo
            height: null, // You can specify height if needed
            width: null, // You can specify width if needed
            fileSize: null, // You can specify fileSize if needed
            playableDuration: null, // You can specify playableDuration if needed
            orientation: null, // You can specify orientation if needed
          },
          timestamp: new Date(item.createdAt).getTime(),
          modificationTimestamp: new Date(item.updatedAt).getTime(),
          location: null, // You can specify location if needed
        },
      };
    });
  }

  const handlePressSketck = (tripCuid: string, posts: []) => {
    navigation.navigate('PublishStackScreen', {
      screen: 'PreviewImageAndAddInformation',
      params: {
        selectedMedia: transformData(posts),
        trip: tripCuid,
      },
    });
  };

  const handlePressPost = (tripCuid: string) =>
    navigation.navigate('PostDetails', {tripCuid});
  const handlePressEditProfile = () => navigation.navigate('EditProfile');
  const handlePressIsFollowing = () => createFollowMutate.mutate(userCuid);
  const handlePressFollow = () => createFollowMutate.mutate(userCuid);

  const renderItem = ({item}: {item: ITrip}) => (
    <ProfilePost
      key={item.cuid}
      post={`${HOST}/${item.posts[0]?.photos[0]}`}
      onPress={() => handlePressPost(item.cuid)}
    />
  );

  const renderItemSketch = ({item}: {item: ITrip}) => (
    <ProfilePost
      key={item.cuid}
      post={`${HOST}/${item.posts[0]?.photos[0]}`}
      onPress={() => handlePressSketck(item.cuid, item.posts)}
    />
  );

  const refreshUser = () => {
    refetch();
  };

  useFocusEffect(useCallback(refreshUser, [userCuid]));

  if (isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (createFollowMutate.isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: createFollowMutate.error.response.data.message,
      position: 'bottom',
    });
  }

  if (isLoading || createFollowMutate.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      f={1}
      backgroundColor={'$background'}>
      <YStack>
        <Image
          h={400}
          source={
            data?.profile?.picture
              ? {
                  uri: `${HOST}/${data?.profile?.picture}`,
                }
              : require('../../../assets/images/profile/profile.png')
          }
        />

        <ProfileData
          followers={data?.followers}
          following={data?.following}
          trips={data?.trips.length}
        />

        <XStack
          border-top-right-radius="$12"
          border-top-left-radius="$12"
          paddingHorizontal="$5"
          paddingVertical="$3"
          jc={'space-between'}>
          <YStack>
            <SizableText
              numberOfLines={1}
              fontWeight={'bold'}
              fontSize={'$6'}
              color={'$text'}>
              {data?.profile?.name}
            </SizableText>
            <Text numberOfLines={1} color={'$text'}>
              @{data?.username}
            </Text>
            <Text numberOfLines={1} color={'$blue200'}>
              {data?.profile?.link}
            </Text>

            <Paragraph numberOfLines={3} color={'$text'}>
              {data?.profile?.biography}
            </Paragraph>
          </YStack>

          {userCuid === user?.user.cuid ? (
            <ProfileActionButton
              title="Editar Perfil"
              onPress={handlePressEditProfile}
            />
          ) : data?.isFollowing ? (
            <ProfileActionButton
              title="Seguindo"
              iconName="check"
              color={theme.colors.green}
              onPress={handlePressIsFollowing}
            />
          ) : (
            <ProfileActionButton
              title="Seguir"
              iconName="plus"
              onPress={handlePressFollow}
            />
          )}
        </XStack>
      </YStack>

      <Tabs defaultValue="tab1" flexDirection="column">
        <Tabs.List>
          <Tabs.Tab flex={1} value="tab1">
            <LayoutDashboard color={'$primary'} />
            <SizableText> Minhas Viagens</SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab2">
            <FileStack color={'$primary'} />
            <SizableText> Rascunhos</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1" m={'$3.5'}>
          <XStack
            flexDirection="row"
            flexWrap="wrap"
            jc={'space-between'}
            gap={8}>
            {data?.trips
              .filter((trip: ITrip) => trip.status === 'PUBLISHED')
              .map(item => renderItem({item}))}
          </XStack>
        </Tabs.Content>

        <Tabs.Content value="tab2" m={'$3.5'}>
          <XStack
            flexDirection="row"
            flexWrap="wrap"
            jc={'space-between'}
            gap={8}>
            {data?.trips
              .filter((trip: ITrip) => trip.status === 'SKETCH')
              .map(item => renderItemSketch({item}))}
          </XStack>
        </Tabs.Content>
      </Tabs>
    </ScrollView>
  );
};
