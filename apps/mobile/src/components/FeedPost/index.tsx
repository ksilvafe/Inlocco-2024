import React, {useState} from 'react';

import {View, XStack, YStack} from 'tamagui';
import {IFeedPost} from '../../@types/components';
import {useMutation} from 'react-query';
import {HOST, api} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {ProfileReference} from '../ProfileReference';
import {ImageGrid} from './ImageGrid';
import {LikeButton} from './LikeButton';

export const FeedPost: React.FC<IFeedPost> = (props: IFeedPost) => {
  const {user, posts, cuid, isLiked} = props;

  const navigation = useNavigation();
  const [liked, setLiked] = useState(isLiked);

  const likeMutation = useMutation(() => api.patch(`/trips/${cuid}/like`), {
    onError: (e, variables, context) => {
      console.error(e, variables, context);
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: e.response.data.message,
        position: 'bottom',
      });
    },
  });

  const handleLikePost = () => {
    setLiked(!liked);
    likeMutation.mutate();
  };

  const handleNavigateToProfileScreen = () => {
    navigation.navigate('ProfileStackScreen', {
      screen: 'Profile',
      params: {userCuid: user.cuid},
    });
  };

  const renderPhotos = () => {
    const numberOfPosts = posts.length;

    // Caso tenha 1 foto, ela ocupa a tela inteira
    if (numberOfPosts === 1) {
      return <ImageGrid uri={`${HOST}/${posts[0]?.photos[0]}`} />;
    }

    // Caso tenha 2 fotos, as duas ficam lado a lado na vertical
    if (numberOfPosts === 2) {
      return posts.map((post, index) => (
        <ImageGrid key={index} uri={`${HOST}/${post?.photos[0]}`} />
      ));
    }

    return (
      <XStack>
        <ImageGrid uri={`${HOST}/${posts[0]?.photos[0]}`} />
        <YStack f={1} h={150}>
          <ImageGrid uri={`${HOST}/${posts[1]?.photos[0]}`} />

          <ImageGrid uri={`${HOST}/${posts[2]?.photos[0]}`} />
        </YStack>
      </XStack>
    );
  };

  return (
    <YStack gap="$2" mb="$3">
      <XStack maw="50%">
        <ProfileReference
          onPress={handleNavigateToProfileScreen}
          picture={user.profile?.picture}
          username={user?.username}
          name={user?.profile?.name}
          size="$2.5"
        />
      </XStack>
  
      <TouchableOpacity {...props}>
        <XStack jc="center" ai="center" position="relative">
          <ImageGrid uri={`${HOST}/${posts[0]?.photos[0]}`} />
          <View style={{ position: 'absolute', top: 0, right: 0 }}>
            <LikeButton liked={liked} handleLikePost={handleLikePost} />
          </View>
        </XStack>
      </TouchableOpacity>
    </YStack>
  );  
};
