import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  padding: ${({theme}) => theme.metrics.smallPadding}px;
  background-color: ${({theme}) => theme.colors.card};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Label = styled.Text`
  margin-left: ${({theme}) => theme.metrics.smallMargin}px;
  color: ${({theme}) => theme.colors.text};
  font-weight: 700;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
  font-size: ${({theme}) => theme.fontSizes.thin}px;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
}))``;
