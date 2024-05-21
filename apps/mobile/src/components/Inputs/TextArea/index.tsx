import React from 'react';
import {IInput} from '../../../@types/components';
import {Container, Content, Divider, Label, TextInput} from './styles';
import {Controller} from 'react-hook-form';
import {ErroMessage} from '../../ErroMessage';

export const TextArea: React.FC<IInput> = (props: IInput) => {
  const {title, control, name, touched, errors} = props;

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field}) => (
        <Container>
          <Content>
            <Label>{title}</Label>
            <TextInput
              {...props}
              {...field}
              onChangeText={field.onChange}
              multiline
            />
          </Content>
          {touched && errors && <ErroMessage>{errors.message}</ErroMessage>}
          <Divider />
        </Container>
      )}
      name={name}
    />
  );
};
