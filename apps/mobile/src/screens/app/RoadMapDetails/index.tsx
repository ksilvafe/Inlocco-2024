import React from 'react';
import {
  ActionContainer,
  ActionsContainer,
  ActionText,
  Container,
  DisplayName,
  List,
  Photo,
  PhotoContainer,
  RoadMapList,
  Subtitle,
  Title,
  TripContainer,
} from './styles';

import {Alert, Share, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';
import {XStack} from 'tamagui';
import {IPost, ITrip} from '../../../@types/api';
import {RoadMapDetailsScreenProps} from '../../../@types/screens';
import { ProfileReference } from '../../../components/ProfileReference';
import {HOST} from '../../../services/api';

type RoadMapData = {
  cuid: string;
  date: string;
  city: string;
  displayName: string;
};
interface GroupedPost {
  title: string;
  data: RoadMapData[];
}

export const RoadMapDetails: React.FC<RoadMapDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const {trip}: {trip: ITrip} = route.params;

  function convertAndGroupPosts(posts: IPost[]) {
    // Objeto para armazenar os resultados agrupados por país
    const groupedPosts: {[country: string]: GroupedPost} = {};

    // Iterar sobre os posts
    for (const post of posts) {
      const city = post.location.city;

      // Se o país estiver definido no post
      if (!groupedPosts[city]) {
        // Se o país ainda não estiver no objeto, inicialize-o
        groupedPosts[city] = {
          title: city,
          data: [],
        };
      }

      // Adicione os dados do post ao país correspondente
      groupedPosts[city].data.push({
        date: post.createdAt,
        city: post.location.city,
        displayName: post.location.displayName,
        cuid: post.cuid,
      });
    }

    // Converter o objeto agrupado em um array
    const result = Object.values(groupedPosts);

    return result;
  }

  const handleDetailsLocale = (postCuid: string) =>
    navigation.navigate('LocaleDetails', {postCuid});

  const renderItem = ({item}: {item: IPost}) => (
    <PhotoContainer>
      <Photo
        source={{
          uri: `${HOST}/${item.photos}`,
        }}
      />
    </PhotoContainer>
  );

  const renderRoadMapItem = ({item}: {item: RoadMapData}) => (
    <TripContainer>
      <View>
        <ActionText>
          {Intl.DateTimeFormat('pt-BR', {
            month: 'numeric',
            day: 'numeric',
          }).format(new Date(item.date))}
        </ActionText>
      </View>
      <View>
        <ActionText>{item.city}</ActionText>
      </View>
      <View>
        <DisplayName numberOfLines={1}>
          {item.displayName.split(', ').slice(0, 2).join(', ')}
        </DisplayName>
      </View>
      <XStack gap={'$2.5'}>
        <Icon
          name="eye"
          size={18}
          color={theme.colors.border}
          onPress={() =>
            navigation.navigate('LocaleDetails', {postCuid: item.cuid})
          }
        />
        <Icon
          name="map-marker"
          size={18}
          color={theme.colors.border}
          onPress={() => {
            Alert.alert('Descrição', trip.description);
          }}
        />
      </XStack>
    </TripContainer>
  );

  const renderRoadMapSectionHeader = ({section: {title}}) => (
    <Title style={{textAlign: 'center'}}>{title}</Title>
  );

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'inLocco | Veja que viagem incrivel que eu encontrei no inLocco.',
        url: `inlocco://postdetails/${trip.cuid}`,
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

  return (
    <Container>
      <RoadMapList
        ListHeaderComponent={
          <>
            <ProfileReference
              onPress={() => {
                navigation.navigate('ProfileStackScreen', {
                  userCuid: trip?.user?.cuid,
                });
              }}
              picture={trip?.user?.profile?.picture as string}
              username={trip?.user?.username as string}
              name={trip?.user?.profile?.name}
            />
            <ActionsContainer style={{marginTop: 10}}>
              <Title numberOfLines={1}>{trip.title}</Title>

              <Subtitle>{trip?.updatedAt.slice(0, 4)}</Subtitle>
            </ActionsContainer>

            <List
              data={trip?.posts}
              keyExtractor={(item: IPost) => item.cuid}
              renderItem={renderItem}
            />

            <ActionsContainer>
              <ActionContainer>
                <Icon name="heart" size={28} color={theme.colors.border} />
                <ActionText>{trip.likes.length}</ActionText>
              </ActionContainer>
              <ActionContainer>
                <Icon name="repeat" size={28} color={theme.colors.border} />
                <ActionText>{trip.shares}</ActionText>
              </ActionContainer>
              <ActionContainer>
                <Icon name="bookmark" size={28} color={theme.colors.border} />
                <ActionText>{trip.saves.length}</ActionText>
              </ActionContainer>
              <ActionContainer
                onPress={handleShare}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Icon
                  name="share-circle"
                  size={28}
                  color={theme.colors.border}
                />
                <ActionText>Compartilhar</ActionText>
              </ActionContainer>
            </ActionsContainer>
          </>
        }
        sections={convertAndGroupPosts(trip?.posts)}
        keyExtractor={(item: IPost) => item.cuid}
        renderItem={renderRoadMapItem}
        renderSectionHeader={renderRoadMapSectionHeader}
      />
    </Container>
  );
};
