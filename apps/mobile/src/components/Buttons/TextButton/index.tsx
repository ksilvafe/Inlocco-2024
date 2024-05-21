import React from 'react';
import {Container, Label} from './styles';
import {IButtons} from '../../../@types/components';

export const TextButton: React.FC<IButtons> = (props: IButtons) => {
  const {title} = props;
  return (
    <Container {...props}>
      <Label {...props}>{title}</Label>
    </Container>
  );
};
