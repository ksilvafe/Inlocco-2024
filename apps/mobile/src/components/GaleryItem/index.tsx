import React from 'react';

import {Container} from './styles';
import {IGaleryItem} from '../../@types/components';

export const GaleryItem: React.FC<IGaleryItem> = (props: IGaleryItem) => {
  return <Container {...props} />;
};