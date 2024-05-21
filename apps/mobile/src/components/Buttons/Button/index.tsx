import React from 'react';

import {Container, Label} from './styles';
import {IButtons} from '../../../@types/components';
import {ActivityIndicator} from 'react-native';

export const Button: React.FC<IButtons> = props => {
  const {title, loading} = props;
  return (
    <Container {...props} disabled={loading}>
      {loading ? <ActivityIndicator /> : <Label {...props}>{title}</Label>}
    </Container>
  );
};
