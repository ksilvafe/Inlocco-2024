import React from 'react';
import {ActivityIndicator, Alert, Modal} from 'react-native';

import {Container, List, ModalView} from './styles';
import { EmptyModal } from '../../ListEmptyComponent/EmptyModal';
import {SearchInput} from '../../Inputs/SearchInput';
import {Travelers} from '../../Travelers';
import {useQuery} from 'react-query';
import {api} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../contexts/auth';
import {IAddTravelersModal} from '../../../@types/components';

export const AddTravelersModal: React.FC<IAddTravelersModal> = props => {
  const {user} = useAuth();
  const {modalVisible, setModalVisible, append} = props;

  const renderItem = ({item}) => (
    <Travelers
      onPress={() => {
        append(item.following);
        setModalVisible(false);
      }}
      iconUrl={item.following.picture}
      username={item.following.username}
    />
  );

  const {isLoading, isError, data, error} = useQuery(
    ['users', user?.user.cuid],
    async ({queryKey}) => {
      const [_, cuid] = queryKey;
      const res = await api.get(`/follows/${cuid}/following`);
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <Container>
        <ModalView>
          <SearchInput placeholder="Pesquisar" iconName="magnify" />
          <List
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.cuid}
            ListEmptyComponent={EmptyModal}
          />
        </ModalView>
      </Container>
    </Modal>
  );
};
