import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContinueTripScreenProps } from '../../../../@types/screens';
import { AddTripModal } from '../../../../components/Modals/AddTripModal';
import { TextButton } from '../../../../components/Buttons/TextButton';
import { theme } from '../../../../styles/themes';
import {
  ActionsContainer,
  Container,
  Content,
  ContentRow,
  DescriptionCard,
  ImageContainer,
  List,
  Row,
  RowTexts,
  ScreenTitle,
  TitleCard,
} from './styles';
import {ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../../contexts/auth';
import {useQuery} from 'react-query';
import { ITrip } from '../../../../@types/api';
import { HOST, api } from '../../../../services/api';

export const ContinueTrip: React.FC<ContinueTripScreenProps> = ({
  navigation,
  route,
}) => {
  const {selectedMedia} = route.params;
  const {user} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const handleNavigateToPreviewImage = () =>
    navigation.navigate('PreviewImageAndAddInformation', {
      selectedMedia,
    });

  const handleNavigateToPreviewImageWithTrip = (trip: ITrip) =>
    navigation.navigate('PreviewImageAndAddInformation', {
      selectedMedia,
      trip,
    });

  const renderItem = ({item}: {item: ITrip}) => (
    <Row onPress={() => handleNavigateToPreviewImageWithTrip(item)}>
      <ContentRow>
        <ImageContainer
          resizeMode="cover"
          source={{
            uri: `${HOST}/${item?.posts[0]?.photos[0]}`,
          }}
        />
        <RowTexts>
          <TitleCard numberOfLines={1}>{item.title}</TitleCard>
          <DescriptionCard>{item.description}</DescriptionCard>
        </RowTexts>
      </ContentRow>
      <Icon name="chevron-right" size={22} color={theme.colors.black50} />
    </Row>
  );

  const {isLoading, isError, data, error, refetch} = useQuery<ITrip[]>(
    'tripsList',
    async () => {
      const res = await api.get(`/trips?userCuid=${user?.user.cuid}`);
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
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <AddTripModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        refetch={refetch}
      />
      <Content>
        <ActionsContainer>
          <Icon name="chevron-left" size={30} onPress={handleBackNavigate} />
          <ScreenTitle>Continuar viagem</ScreenTitle>
          <TextButton title="Nova" onPress={() => setModalVisible(true)} />
        </ActionsContainer>

        <List
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.cuid}
        />
      </Content>
    </Container>
  );
};
