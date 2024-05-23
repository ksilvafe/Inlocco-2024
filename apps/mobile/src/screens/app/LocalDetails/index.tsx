import React from 'react';
import {
  CardText,
  Container,
  DescriptionDetail,
  Details,
  DetailsContent,
  InfoContainer,
  MapView,
  Photo,
  PhotoContainer,
  PhotoList,
  Subtitle,
  Title,
  TitleDetail,
} from './styles';

import {ActivityIndicator, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useQuery} from 'react-query';
import {PostDetailsScreenProps} from '../../../@types/screens';
import {api, HOST} from '../../../services/api';
import {IPost} from '../../../@types/api';
import { ProfileReference } from '../../../components/ProfileReference';
import {Marker, PROVIDER_DEFAULT} from 'react-native-maps';

export const LocaleDetails: React.FC<PostDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {postCuid} = route.params;

  const {data, error, isFetching} = useQuery<IPost>('postDetails', async () => {
    const res = await api.get(`/posts/${postCuid}`);
    return res.data;
  });

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (isFetching) {
    return <ActivityIndicator />;
  }
  return (
    <Container>
      <ProfileReference
        onPress={() => {
          navigation.navigate('ProfileStackScreen', {
            userCuid: data?.travelers[0]?.cuid,
          });
        }}
        picture={data?.travelers[0]?.profile?.picture as string}
        username={data?.travelers[0]?.username as string}
        name={data?.travelers[0]?.profile?.name}
      />

      <PhotoContainer>
        {data?.location && (
          <InfoContainer>
            <Title numberOfLines={1}>{data?.location.displayName}</Title>
            <Subtitle>
              {data?.location.country} {data?.location.updatedAt.slice(0, 4)}
            </Subtitle>
          </InfoContainer>
        )}

        <PhotoList>
          {data?.photos
            .map((photo: string, index: number) => (
              <>
                <Photo
                  key={index}
                  source={{
                    uri: `${HOST}/${photo}`,
                  }}
                />
              </>
            ))
            .slice(0, 1)}

          <View style={{width: '60%'}}>
            <Subtitle>{data?.description}</Subtitle>
          </View>
        </PhotoList>
      </PhotoContainer>

      <Details>
        <DetailsContent>
          <TitleDetail>Viajantes</TitleDetail>
          <DescriptionDetail>
            {data?.travelers.map(traveler => `@${traveler.username} `)}
          </DescriptionDetail>
        </DetailsContent>

        <DetailsContent>
          <TitleDetail>Objetivo</TitleDetail>
          {data?.purposes.map(purpose => (
            <CardText key={purpose}>{purpose}</CardText>
          ))}
        </DetailsContent>

        <DetailsContent>
          <TitleDetail>Periodo </TitleDetail>
          <CardText>
            {Intl.DateTimeFormat('pt-BR').format(
              new Date(data?.createdAt as string),
            )}
          </CardText>
        </DetailsContent>
      </Details>

      <MapView
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: data?.location.coordinates[0] as number,
          longitude: data?.location.coordinates[1] as number,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}>
        <Marker
          calloutAnchor={{x: 2.7, y: 0.8}}
          coordinate={{
            latitude: data?.location.coordinates[0] as number,
            longitude: data?.location.coordinates[1] as number,
          }}
        />
      </MapView>
    </Container>
  );
};
