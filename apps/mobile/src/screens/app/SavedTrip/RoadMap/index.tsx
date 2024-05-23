import React, {useState} from 'react';

import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {IPost, ITrip} from '../../../../@types/api';
import { Button } from '../../../../components/Buttons/Button';
import {api} from '../../../../services/api';
import {Image} from '../styles';
import {
  Container,
  Content,
  ContentRow,
  Header,
  IconsRow,
  ImageContainer,
  List,
  Row,
  RowTexts,
  SubtitleCard,
  TitleCard,
  TitleHeader,
} from './styles';

export const RoadMap: React.FC = ({navigation, route}) => {
  const theme = useTheme();
  const {cuid} = route.params;

  const [steps, setSteps] = useState<IPost[]>();
  const [currentItemPhoto, setCurrentItemPhoto] = useState<{
    [cuid: string]: Asset[];
  }>();

  const renderImagePicker = async (item: IPost) => {
    await launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.info('Escolha de imagem cancelada');
      } else if (response.errorCode) {
        console.error('Erro ao escolher imagem:', response.errorCode);
      } else {
        setCurrentItemPhoto(prevPhotos => ({
          ...prevPhotos,
          [item.id]: response.assets,
        }));
      }
    });
  };

  const navigateToNextScreen = () => {
    if (!currentItemPhoto) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: 'Adicione imagens a todas as paradas',
        position: 'bottom',
      });
    } else {
      navigation.navigate('PublishStackScreen', {
        screen: 'ContinueTrip',
        params: {
          selectedMedia: [
            ...Object.values(currentItemPhoto).map((item, index) => {
              return {
                node: {
                  type: 'image',
                  subTypes: [],
                  group_name: 'photos',
                  image: {
                    filename: item[0]?.fileName || '',
                    filepath: null,
                    extension: 'jpg',
                    uri: item[0]?.uri || '',
                    height: item[0]?.height || 0,
                    width: item[0]?.width || 0,
                    fileSize: item[0]?.fileSize || 0,
                    playableDuration: 0,
                    orientation: null,
                  },
                  timestamp: Date.now(),
                  modificationTimestamp: Date.now(),
                  location: {
                    latitude: steps[index].location.coordinates[0],
                    longitude: steps[index].location.coordinates[1],
                  },
                },
              };
            }),
          ],
        },
      });
    }
  };

  const handleOptionTrip = (cuid: string) => {
    Alert.alert('Opções', '', [
      {
        text: 'Deletar parada',
        style: 'destructive',
        onPress: () => {
          setSteps(currentSteps =>
            currentSteps.filter(step => step.cuid !== cuid),
          );
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {
          console.info('Cancelado');
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: IPost}) => (
    <Row onLongPress={() => handleOptionTrip(item.cuid)}>
      <ContentRow>
        {currentItemPhoto ? (
          <Image
            source={
              currentItemPhoto[item.id]
                ? {uri: currentItemPhoto[item.id][0].uri}
                : null
            }
          />
        ) : (
          <ImageContainer>
            <Icon
              name="image"
              size={20}
              color={theme.colors.black50}
              style={{alignSelf: 'center'}}
            />
          </ImageContainer>
        )}
        <RowTexts>
          <SubtitleCard>{item.location.country}</SubtitleCard>
          <TitleCard numberOfLines={1}>{item.location.displayName}</TitleCard>
        </RowTexts>
      </ContentRow>
      <IconsRow>
        <TouchableOpacity onPress={() => renderImagePicker(item)}>
          <Icon name="image" size={22} color={theme.colors.black100} />
        </TouchableOpacity>

        <Icon
          name="menu"
          size={22}
          color={theme.colors.black50}
          style={{marginLeft: 5}}
          onPress={() => handleOptionTrip(item.cuid)}
        />
      </IconsRow>
    </Row>
  );

  const {isLoading, isError, data, error} = useQuery<ITrip>(
    'trip',
    async () => {
      const res = await api.get(`/trips/${cuid}`);
      setSteps(res.data.posts);
      return res.data;
    },
  );

  if (isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator color={theme.colors.primary} />
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Icon
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <TitleHeader active>Roteiro</TitleHeader>
          <Icon name="chevron-right" size={24} onPress={navigateToNextScreen} />
        </Header>

        <List
          data={steps}
          renderItem={renderItem}
          keyExtractor={(item: IPost) => item.cuid}
        />

        <Button
          title="Adicionar parada"
          onPress={() =>
            setSteps([
              ...steps,
              {
                createdAt: '',
                cuid: String(steps?.length),
                description: '',
                purposes: [],
                id: 0,
                location: {
                  createdAt: '',
                  cuid: '',
                  coordinates: [],
                  id: 0,
                  country: '',
                  city: '',
                  displayName: 'Nova parada',
                  updatedAt: '',
                },
                photos: [],
                status: '',
                title: '',
                updatedAt: '',
                videos: [],
                travelers: [],
              },
            ])
          }
        />
      </Content>
    </Container>
  );
};
