import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Content,
  TextInput,
  Label,
  ErrorMessage,
  InputContent,
} from './styles';
import {IInput} from '../../../@types/components';
import {useTheme} from 'styled-components';
import {Controller} from 'react-hook-form';

export const Input: React.FC<IInput> = (props: IInput) => {
  const inputRef = useRef();
  const theme = useTheme();
  const {title, iconName, control, name, errors, touched} = props;

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field}) => (
        <Container onPress={() => inputRef.current.focus()}>
          <>
            <Content>
              {iconName && (
                <Icon name={iconName} color={theme.colors.primary} size={25} />
              )}
              <InputContent>
                {title && <Label>{title}</Label>}
                <TextInput
                  {...props}
                  {...field}
                  ref={e => {
                    field.ref(e);
                    inputRef.current = e;
                  }}
                  onChangeText={field.onChange}
                />
              </InputContent>
            </Content>
            {touched && errors && <ErrorMessage>{errors.message}</ErrorMessage>}
          </>
        </Container>
      )}
      name={name}
    />
  );
};
