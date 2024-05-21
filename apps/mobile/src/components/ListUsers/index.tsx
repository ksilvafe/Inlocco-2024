import React from 'react';

import {
  BoxContainer,
  Container,
  ContentRow,
  Image,
  Subtitle,
  Title,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import {IFeedPost} from '../../@types/components';

export const ListUsers: React.FC<IFeedPost> = ({userCuid, username, biography}) => {
  const navigation = useNavigation();
  return (
    <Container
      onPress={() => {
        navigation.navigate('ProfileStackScreen', {
          userCuid,
        });
      }}>
      <ContentRow>
        <Image />
        <BoxContainer>
          <Title numberOfLines={1}>{username}</Title>
          <Subtitle numberOfLines={1}>{biography}</Subtitle>
        </BoxContainer>
      </ContentRow>
      <Icon name="close" size={20} />
    </Container>
  );
};
