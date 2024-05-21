import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
}))`
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 0.3;
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
`;

export const Divider = styled.View`
  width: ${({theme}) => theme.metrics.screenWidth}px;
  height: ${({theme}) => theme.metrics.smallBorder}px;
  background-color: ${({theme}) => theme.colors.black5};
`;
