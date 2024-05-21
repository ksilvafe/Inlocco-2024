import React from 'react';

import {Container} from './styles';
import {IErroMessage} from '../../@types/components';

export const ErroMessage: React.FC<IErroMessage> = props => {
  const {children} = props;
  return <Container>{children}</Container>;
};
