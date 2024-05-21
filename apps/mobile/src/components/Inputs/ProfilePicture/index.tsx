import React from 'react';

import {Container, IconProfile} from './styles';
import {HOST} from '../../../services/api';
import {Controller} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {IProfilePicture} from '../../../@types/components';
import Toast from 'react-native-toast-message';

export const ProfilePicture: React.FC<IProfilePicture> = props => {
  const {picture, control, name, errors, touched} = props;

  const handleUpdateProfile = async field => {
    try {
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: error.message,
        position: 'bottom',
      });
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    field.onChange(result.assets[0]);
  };
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field}) => (
        <Container onPress={() => handleUpdateProfile(field)}>
          <IconProfile
            source={
              field.value.uri
                ? {
                    uri: field.value.uri,
                  }
                : picture
                ? {
                    uri: `${HOST}/${picture}`,
                  }
                : require('../../../assets/images/profile/profile.png')
            }
          />
        </Container>
      )}
      name={name}
    />
  );
};
