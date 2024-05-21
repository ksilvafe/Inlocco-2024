import React from 'react';
import {Container, Label, List} from './styles';
import {IProfileFlags} from '../../@types/components';
import {useTheme} from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProfileFlags: React.FC<IProfileFlags> = (props: IProfileFlags) => {
  const theme = useTheme();
  const {flags} = props;

  const renderItem = ({item}: {item: string}) => (
    <Icon name="flag" size={15} color={theme.colors.yellow} />
  );

  return (
    <Container {...props}>
      <List
        data={flags}
        renderItem={renderItem}
        keyExtractor={(item: number) => String(item)}
      />
      {flags.length > 3 && <Label {...props}>{flags.length}</Label>}
    </Container>
  );
};
