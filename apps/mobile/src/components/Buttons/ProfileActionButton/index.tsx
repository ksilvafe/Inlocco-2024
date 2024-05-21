import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Label} from './styles';
import {IProfileActionButton} from '../../../@types/components';

export const ProfileActionButton: React.FC<IProfileActionButton> = (
  props: IProfileActionButton,
) => {
  const {title, iconName = 'account-edit-outline', color} = props;
  return (
    <Container {...props}>
      <Icon name={iconName} size={15} color={color} />
      <Label {...props}>{title}</Label>
    </Container>
  );
};
