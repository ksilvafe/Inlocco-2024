import React from 'react';
import {ActivityIndicator, Alert, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {useMutation} from 'react-query';
import { Button} from '../../Buttons/Button'
import { Input } from '../../Inputs/Input'
import {IAddTripModal} from '../../../@types/components';

import {api} from '../../../services/api';
import {
  Container,
  ContainerInputs,
  ContentRow,
  ModalView,
  Title,
} from './styles';

export const AddTripModal: React.FC<IAddTripModal> = props => {
  const {modalVisible, setModalVisible, refetch} = props;

  const {mutate, isError, error, isLoading} = useMutation(
    async values => {
      const res = await api.post('/trips', values);
      return res.data;
    },
    {
      onSuccess: async () => {
        refetch();
      },
      onError: (e: any) => {
        console.error(e.response.data.message);
      },
    },
  );

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'PUBLISHED',
    },
  });

  const onSubmit = async (data: any) => {
    mutate(data);
    setModalVisible(false);
  };

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
          <ContentRow>
            <Icon
              name="chevron-left"
              size={25}
              onPress={() => setModalVisible(false)}
            />
            <Title>Nova viagem</Title>
          </ContentRow>
          <ContainerInputs>
            <Input
              register={register('title')}
              title="Titulo"
              name="title"
              placeholder="Digite um titulo para sua viagem"
              control={control}
              errors={errors.title}
              touched={touchedFields.title}
            />
            <Input
              register={register('description')}
              title="Descrição"
              name="description"
              placeholder="Digite uma descrição para sua viagem"
              control={control}
              errors={errors.description}
              touched={touchedFields.description}
            />
          </ContainerInputs>
          <Button
            title="Criar viagem"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </ModalView>
      </Container>
    </Modal>
  );
};
