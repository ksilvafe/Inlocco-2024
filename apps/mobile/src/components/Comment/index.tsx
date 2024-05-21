import React from 'react';

import {Container, Username, Message} from './styles';
import {IComment} from '../../@types/api';

interface ICommentProps {
  comment: IComment;
}
export const Comment: React.FC<ICommentProps> = ({comment}: ICommentProps) => {
  return (
    <Container>
      <Username>{comment.user}</Username>
      <Message>{comment.text}</Message>
    </Container>
  );
};
