import React from 'react';

import {Container, Content, ErrorMessage, Input, Label} from './styles';
import {IHorizntalInput} from '../../../@types/components';
import {Controller} from 'react-hook-form';

export const HorizntalInput: React.FC<IHorizntalInput> = (props: IHorizntalInput) => {
  const {title, control, name, errors, touched} = props;
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
            <Input {...props} {...field} onChangeText={field.onChange} />
          </Content>
          {touched && errors && <ErrorMessage>{errors.message}</ErrorMessage>}
        </Container>
      )}
      name={name}
    />
  );
};
