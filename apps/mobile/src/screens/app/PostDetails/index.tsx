import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Share,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useTheme} from 'styled-components';
import {Dialog, View} from 'tamagui';
import {IComment, IPost, ITrip} from '../../../@types/api';
import {PostDetailsScreenProps} from '../../../@types/screens';
import { ProfileReference } from '../../../components/ProfileReference';
import { Comment } from '../../../components/Comment';
import {useAuth} from '../../../contexts/auth';
import {HOST, api} from '../../../services/api';
import {
  ActionContainer,
  ActionText,
  ActionsContainer,
  CommentsContainer,
  Container,
  Content,
  HorizontalList,
  InfoTripContainer,
  InputCommentsContainer,
  Localization,
  Photo,
  PhotoContainer,
  Subtitle,
  TripTitle,
} from './styles';

export const PostDetails: React.FC<PostDetailsScreenProps> = ({navigation, route}) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const {user} = useAuth();
  const {tripCuid} = route.params;

  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  const {data, error, isFetching, refetch} = useQuery<ITrip>(
    'postDetails',
    async () => {
      const res = await api.get(`/trips/${tripCuid}`);
      setLiked(res.data?.likes?.includes(user?.user.cuid as string));
      setSaved(res.data?.saves?.includes(user?.user.cuid as string));
      setComments(res.data.comments);
      return res.data;
    },
  );

  const likeMutation = useMutation(
    (cuid: string) => api.patch(`/trips/${cuid}/like`),
    {
      onError: (e, variables, context) => {
        console.error(e, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: e.response.data.message,
          position: 'bottom',
        });
      },
      onSuccess: () => {
        setLiked(!liked);
      },
    },
  );

  const saveMutation = useMutation(
    (cuid: string) => api.patch(`/trips/${cuid}/save`),
    {
      onError: (e, variables, context) => {
        console.error(e, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: e.response.data.message,
          position: 'bottom',
        });
      },
      onSuccess: () => {
        setSaved(!saved);
      },
    },
  );

  const commentMutation = useMutation(
    ({cuid, text}: {cuid: string; text: string}) =>
      api.post(`/comments/${cuid}`, {text}),
    {
      onError: (e: any, variables, context) => {
        console.error(e, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: e.response.data.message,
          position: 'bottom',
        });
      },
      onSuccess: () => {
        setComment('');
        refetch();
      },
    },
  );

  const handleLikeTrip = () => {
    likeMutation.mutate(data?.cuid as string);
    //refetch();
  };

  const handleSaveTrip = () => {
    saveMutation.mutate(data?.cuid as string);
    if (!saved) {
      Toast.show({
        type: 'success',
        text1: 'Viagem salva com sucesso"',
        text2: 'Você pode ver essa viagem nos seus roteiros salvos',
        position: 'bottom',
      });
    }
    //refetch();
  };

  const handleCommentTrip = () => {
    commentMutation.mutate({cuid: data?.cuid as string, text: comment});
    setModal(!modal);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'inLocco | Veja que viagem incrivel que eu encontrei no inLocco.',
        url: `inlocco://postdetails/${tripCuid}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleNavigateToRoadMap = () =>
    navigation.navigate('RoadMapDetails', {trip: data});

  const renderItem = ({item, index}: {item: IPost}) => {
    return (
      <PhotoContainer>
        {item.location.displayName && (
          <Localization numberOfLines={1}>
            {item.location.displayName}
          </Localization>
        )}

        <Photo
          source={{
            uri: `${HOST}/${item.photos}`,
          }}
        />

        {item.description && <Subtitle>{item.description}</Subtitle>}
      </PhotoContainer>
    );
  };

  const renderCommentItem = ({item, index}: {item: IComment}) => {
    return <Comment comment={item} key={item.cuid} />;
  };

  const onOpen = () => {
    setModal(!modal);
  };

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (isFetching) {
    return <ActivityIndicator color={'red'} />;
  }

  const dataLikesLength = data?.likes?.length || 0;
  const dataSavesLength = data?.saves?.length || 0;

  return (
    <SafeAreaView>
      <Container>
        <Content>
          <ProfileReference
            onPress={() => {
              navigation.navigate('ProfileStackScreen', {
                userCuid: data?.user?.cuid,
              });
            }}
            picture={data?.user?.profile?.picture as string}
            username={data?.user?.username as string}
            cuid={data?.cuid}
            name={data?.user?.profile?.name}
          />

          <InfoTripContainer>
            <TripTitle numberOfLines={1}>{data?.title}</TripTitle>
            <Localization>{data?.updatedAt.slice(0, 4)}</Localization>
          </InfoTripContainer>

          <HorizontalList
            data={data?.posts}
            keyExtractor={(item: IPost) => item.cuid}
            renderItem={renderItem}
          />

          <ActionsContainer>
            <ActionContainer onPress={handleLikeTrip}>
              {liked ? (
                <Icon name="heart" size={28} color={theme.colors.red} />
              ) : (
                <Icon
                  name="heart-outline"
                  size={28}
                  color={theme.colors.border}
                />
              )}
              <ActionText>
                {liked ? dataLikesLength + 1 : dataLikesLength}
              </ActionText>
            </ActionContainer>
            <ActionContainer onPress={handleSaveTrip}>
              {saved ? (
                <Icon name="bookmark" size={28} color={theme.colors.border} />
              ) : (
                <Icon
                  name="bookmark-outline"
                  size={28}
                  color={theme.colors.border}
                />
              )}
              <ActionText>
                {saved ? dataSavesLength + 1 : dataSavesLength}
              </ActionText>
            </ActionContainer>
            <ActionContainer onPress={handleShare}>
              <Icon name="share-circle" size={28} color={theme.colors.border} />
              <ActionText>{data?.shares}</ActionText>
            </ActionContainer>
            <ActionContainer
              onPress={handleNavigateToRoadMap}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Icon name="flag" size={28} color={theme.colors.border} />
              <ActionText>Roteiro</ActionText>
            </ActionContainer>
          </ActionsContainer>

          <CommentsContainer>
            <InputCommentsContainer>
              <TextInput
                placeholderTextColor={theme.colors.border}
                placeholder="Deixe um comentario ..."
                onChangeText={setComment}
                value={comment}
                onPressIn={onOpen}
                style={{flex: 1}}
              />
              <TouchableOpacity onPress={handleCommentTrip}>
                <Icon
                  name="send-circle"
                  size={22}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </InputCommentsContainer>
          </CommentsContainer>
        </Content>
      </Container>
      <Dialog modal open={modal}>
        <Dialog.Portal>
          <Dialog.Content
            key="content"
            left={0}
            right={0}
            position="absolute"
            bottom={0}
            h="60%"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
            exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
            borderRadius={0}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={20}
              enableOnAndroid={true}
              contentContainerStyle={{
                justifyContent: 'space-between',
                flex: 1,
              }}
              enableAutomaticScroll={Platform.OS === 'ios'}>
              <View w="100%" jc="space-between" flex={1}>
                <View>
                  {comments?.map((comment: IComment) => (
                    <Comment comment={comment} key={comment.id} />
                  ))}
                </View>
                <View fd="row" alignItems="center" mt="$2" jc="space-between">
                  <TouchableOpacity onPress={onOpen}>
                    <Icon name="close" size={22} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TextInput
                    placeholderTextColor={theme.colors.border}
                    placeholder="Deixe um comentario ..."
                    onChangeText={setComment}
                    value={comment}
                  />
                  <TouchableOpacity onPress={handleCommentTrip}>
                    <Icon
                      name="send-circle"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </SafeAreaView>
  );
};
