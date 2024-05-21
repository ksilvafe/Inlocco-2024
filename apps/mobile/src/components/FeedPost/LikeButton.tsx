import React from 'react';
import {TouchableOpacity} from 'react-native';
import {getTokens} from '@tamagui/core';
import Icon from 'react-native-vector-icons/Feather';
import {Circle} from 'tamagui';
import {useTheme} from 'styled-components';

interface ILikeButton {
  liked: boolean;
  handleLikePost: () => void;
}

export const LikeButton: React.FC<ILikeButton> = ({liked, handleLikePost}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={handleLikePost}>
      <Circle
        jc="center"
        ai="center"
        position="absolute"
        top={10}
        right={10}
        size="$2.5"
        backgroundColor={
          liked ? getTokens().color.red : getTokens().color.background
        }>
        <Icon
          name="heart"
          size={15}
          color={liked ? theme.colors.card : theme.colors.border}
        />
      </Circle>
    </TouchableOpacity>
  );
};
