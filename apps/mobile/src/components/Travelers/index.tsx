import React from 'react';

import {Container, Content, IconProfile, Username} from './styles';
import {HOST} from '../../services/api';
import {ITravelers} from '../../@types/components';

export const Travelers: React.FC<ITravelers> = props => {
  const {iconUrl, username} = props;
  return (
    <Container {...props}>
      <Content>
        <IconProfile
          source={{
            uri: iconUrl && `${HOST}/${iconUrl}`,
          }}
        />
        <Username>{username}</Username>
      </Content>
    </Container>
  );
};
