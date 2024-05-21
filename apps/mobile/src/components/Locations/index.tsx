import React from 'react';

import {Caption, Container, Content, DisplayName} from './styles';

import {ILocations} from '../../@types/components';

export const Locations: React.FC<ILocations> = props => {
  const {country, displayName} = props;

  return (
    <Container {...props}>
      <Content>
        <DisplayName numberOfLines={1}>{displayName}</DisplayName>
        <Caption>{country}</Caption>
      </Content>
    </Container>
  );
};
