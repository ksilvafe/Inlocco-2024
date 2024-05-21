import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Label} from './styles';
import {IProfileStarCounter} from '../../@types/components';
import {useTheme} from 'styled-components';

export const ProfileStarCounter: React.FC<IProfileStarCounter> = (
  props: IProfileStarCounter,
) => {
  const theme = useTheme();
  const {stars} = props;
  return (
    <Container {...props}>
      <Icon name="star" size={15} color={theme.colors.yellow} />
      <Label numberOfLines={1} {...props}>
        {stars}
      </Label>
    </Container>
  );
};
