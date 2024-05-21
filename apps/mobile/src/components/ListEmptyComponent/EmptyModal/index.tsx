import React from 'react';
import {EmptyFeedContainer, EmptyFeedText} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';

export const EmptyModal = () => {
  const theme = useTheme();
  return (
    <EmptyFeedContainer>
      {/* <Icon name="camera-outline" size={100} color={theme.colors.card} /> */}
      <EmptyFeedText>Nenhum item encontrado</EmptyFeedText>
    </EmptyFeedContainer>
  );
};
