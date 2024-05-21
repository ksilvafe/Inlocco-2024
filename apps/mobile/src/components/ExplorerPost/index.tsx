import React from 'react';

import {Container, TouchableContainer, Photo} from './styles';
import {IExplorerPost} from '../../@types/components';

export const ExplorerPost: React.FC<IExplorerPost> = (props: IExplorerPost) => {
  const {post} = props;
  return (
    <Container>
      <TouchableContainer {...props}>
        <Photo
          source={{
            uri: post,
          }}
        />
      </TouchableContainer>
    </Container>
  );
};
