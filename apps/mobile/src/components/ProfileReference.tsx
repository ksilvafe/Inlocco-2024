import React, {useState} from 'react';

import {getTokens} from '@tamagui/core';
import {Alert, GestureResponderEvent, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {useMutation} from 'react-query';
import {Text, XStack, YStack} from 'tamagui';
import {HOST, api} from '../services/api';
import {IconProfile} from './IconProfile';

interface IProfileReference {
  onPress: (event: GestureResponderEvent) => void;
  picture?: string;
  username: string;
  name: string;
  size?: string;
  cuid?: string;
}

export const ProfileReference: React.FC<IProfileReference> = ({
  onPress,
  picture,
  username,
  name,
  cuid,
  size = '$6',
}: IProfileReference) => {
  const [loading, setLoading] = useState(true);
  const editTripSaved = useMutation(
    () =>
      api.put(
        `/trips/${cuid}`,
        {
          status: 'SKETCH',
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
      onError: (e: any, variables: any, context: any) => {
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

  function handleModal(cuid: string) {
    Alert.alert('Opções', '', [
      {
        text: 'Enviar para rascunho',
        onPress: () => {
          editTripSaved.mutate({cuid});
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
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <XStack ai="center" jc="space-between" gap={'$2.5'} f={1}>
        <XStack>
          <IconProfile uri={`${HOST}/${picture}`} size={size} />

          <YStack f={1} jc="center" ml={'$2.5'}>
            <Text
              numberOfLines={1}
              color="$text"
              fontSize={getTokens().fontSize.$regular}
              fontWeight={'bold'}>
              {name}
            </Text>
            <Text
              numberOfLines={1}
              color="$text"
              fontSize={getTokens().fontSize.$regular}>
              @{username}
            </Text>
          </YStack>
        </XStack>
        <Icon name="more-horizontal" size={24} onPress={handleModal} />
      </XStack>
    </TouchableOpacity>
  );
};
