import React from 'react';

import {Container, Label} from './styles';
import {ITag} from '../../@types/components';

export const Tag: React.FC<ITag> = props => {
  const {title} = props;
  return (
    <Container {...props}>
      <Label>{title}</Label>
    </Container>
  );
};
