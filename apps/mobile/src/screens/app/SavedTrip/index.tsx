import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {useMutation, useQuery} from 'react-query';
import {ITrip} from '../../../@types/api';
import {HOST, api} from '../../../services/api';
import {
  Container,
  Content,
  ContentRow,
  DescriptionCard,
  Header,
  Image,
  List,
  Row,
  RowTexts,
  SubtitleCard,
  TitleCard,
  TitleHeader,
} from './styles';

export const SavedTrip: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [tabActive, setTabActive] = useState('Roteiros');

  function handleTab(value: string) {
    setTabActive(value);
  }

  const editTripSaved = useMutation(
    ({cuid}: {cuid: string}) =>
      api.put(
        `/trips/${cuid}`,
        {
          status: 'PUBLISHED',
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      ),
    {
      onSuccess: async () => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Rascunho atualizado com sucesso!',
          position: 'top',
        });
      },
      onError: (e, variables, context) => {
        console.error(e, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: e.response.data.message,
          position: 'bottom',
        });
      },
    },
  );

  function handleModal() {
    Alert.alert(
      'Opções',
      tabActive,
      [
        {
          text: 'Apagar todas',
          style: 'destructive',
          onPress: () => {
            // Lógica de exclusão
            console.info('Excluindo...');
          },
        },
        {
          text: 'Selecionar viagem',
          onPress: () => {
            console.info('Selecionar viagem...');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            console.info('Cancelado');
          },
        },
      ],
      {cancelable: false},
    );
  }

  const renderTripsSavedItem = ({item}: {item: ITrip}) => (
    <Row onPress={() => navigation.navigate('RoadMap', {cuid: item.cuid})}>
      <ContentRow>
        <Image
          resizeMode="cover"
          source={{
            uri: `${HOST}/${item?.user.profile?.picture}`,
          }}
        />
        <RowTexts>
          <TitleCard numberOfLines={1}>{item.title}</TitleCard>
          <SubtitleCard>{item.description}</SubtitleCard>
        </RowTexts>
      </ContentRow>
      <DescriptionCard>
        {Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
        }).format(new Date(item?.updatedAt as string))}
      </DescriptionCard>
    </Row>
  );

  const {
    isLoading,
    isError,
    data: tripsSavedData,
    error,
  } = useQuery<ITrip[]>('tripsSaved', async () => {
    const res = await api.get('/users/tripsSaved');
    setRefreshing(false);
    return res.data;
  });

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

  return (
    <Container>
      <Content>
        <Header>
          <Icon name="x" size={24} onPress={() => navigation.goBack()} />
          <TitleHeader
            active={tabActive === 'Roteiros' ? true : false}
            onPress={() => handleTab('Roteiros')}>
            Roteiros
          </TitleHeader>
          <Icon name="more-horizontal" size={24} onPress={handleModal} />
        </Header>

        <List
          data={tripsSavedData}
          renderItem={renderTripsSavedItem}
          keyExtractor={(item: ITrip) => item.cuid}
        />
      </Content>
    </Container>
  );
};
