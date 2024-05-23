import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.SafeAreaView`
  flex: 1;
  margin-top: ${({theme}) => theme.metrics.biggerMargin}px;
  padding: ${({theme}) => theme.metrics.hugePadding}px
    ${({theme}) => theme.metrics.basePadding}px 0px
    ${({theme}) => theme.metrics.basePadding}px;
  background-color: ${({theme}) => theme.colors.background};
  border-top-right-radius: ${({theme}) => theme.metrics.fullRadius}px;
  border-top-left-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
}))``;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: bold;
  text-align: center;
  margin-top: ${({theme}) => theme.metrics.baseMargin}px;
  margin-bottom: ${({theme}) => theme.metrics.baseMargin}px;
`;
