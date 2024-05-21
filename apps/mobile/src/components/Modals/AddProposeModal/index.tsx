import React from 'react';
import {Alert, Modal} from 'react-native';

import {Container, List, ModalView} from './styles';
import { EmptyModal } from '../../ListEmptyComponent/EmptyModal';
import { SearchInput } from '../../Inputs/SearchInput';
import { Tag } from '../../Tag';
import {IAddProposeModal} from '../../../@types/components';

export const AddProposeModal: React.FC<IAddProposeModal> = props => {
  const {modalVisible, setModalVisible, append} = props;

  const renderItem = ({item}) => (
    <Tag
      onPress={() => {
        append(item);
        setModalVisible(false);
      }}
      title={item.username}
    />
  );

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
            data={[
              {username: 'Lazer'},
              {username: 'Trabalho'},
              {username: 'Estudo'},
              {username: 'Esportes'},
            ]}
            renderItem={renderItem}
            keyExtractor={item => item.username}
            ListEmptyComponent={EmptyModal}
          />
        </ModalView>
      </Container>
    </Modal>
  );
};
