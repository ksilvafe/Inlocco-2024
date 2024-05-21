import React from 'react';
import {Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';
import {ISearchInput} from '../../../@types/components';
import {Container, Content, ErrorMessage, TextInput} from './styles';

export const SearchInput: React.FC<ISearchInput> = (props: ISearchInput) => {
  const theme = useTheme();
  const {
    iconName = '',
    onPress,
    control,
    name,
    errors,
    touched,
    handleClose,
    closeButton,
  } = props;

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field}) => (
        <Container>
          <Content>
            <TextInput {...props} {...field} onChangeText={field.onChange} />

            <TouchableOpacity onPress={onPress}>
              {closeButton ? (
                <Icon name="close" size={25} onPress={handleClose} />
              ) : (
                <Icon name={iconName} color={theme.colors.primary} size={25} />
              )}
            </TouchableOpacity>
          </Content>
          {touched && errors && <ErrorMessage>{errors.message}</ErrorMessage>}
        </Container>
      )}
      name={name}
    />
  );
};
