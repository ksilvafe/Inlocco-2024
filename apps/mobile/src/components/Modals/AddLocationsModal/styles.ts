import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: ${({theme}) => theme.metrics.bigWidth}px;
`;

export const ModalView = styled.View`
  flex: 1;
  margin: ${({theme}) => theme.metrics.biggerPadding}px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
  padding: ${({theme}) => theme.metrics.basePadding}px;
  align-items: flex-start;
  elevation: 5;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  font-weight: 700;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
  align-self: center;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
}))`
  max-height: 300px;
  width: ${({theme}) => theme.metrics.fullWidth};
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
`;
