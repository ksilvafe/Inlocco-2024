import React from 'react';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';
import {IHorizntalInput} from '../../../@types/components';
import {Container, Divider, Input, Label} from './styles';
import {Controller} from 'react-hook-form';

export const TagInput: React.FC<IHorizntalInput> = (props: IHorizntalInput) => {
  const theme = useTheme();
  const {title, control, name, touched, errors} = props;
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field}) => (
        <>
          <Container>
            <Label>{title}</Label>
            <Input {...props} />
            <TouchableOpacity>
              <Icon name="plus" color={theme.colors.primary} size={25} />
            </TouchableOpacity>
          </Container>
          <Divider />
        </>
      )}
      name={name}
    />
  );
};
