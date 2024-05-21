import React from 'react';
import {IInput} from '../../../@types/components';
import {Container, Content, Input, Label} from './styles';
import {Controller} from 'react-hook-form';
import {ErroMessage} from '../../ErroMessage';

export const PeriodInput: React.FC<IInput> = (props: IInput) => {
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
            <Input
              placeholder="01/01/2000"
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              {...props}
              {...field}
              onChangeText={field.onChange}
            />
          </Content>

          {touched && errors && <ErroMessage>{errors.message}</ErroMessage>}
        </Container>
      )}
      name={name}
    />
  );
};
