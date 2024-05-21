import React from 'react';
import {EmptyFeedContainer, EmptyFeedText} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';

export const EmptyNotifications = () => {
  const theme = useTheme();
  return (
    <EmptyFeedContainer>
      <Icon name="bell-outline" size={100} color={theme.colors.card} />
      <EmptyFeedText>Você ainda não tem nenhuma notificação</EmptyFeedText>
    </EmptyFeedContainer>
  );
};
