import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../styles/themes';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.SafeAreaView`
  flex: 1;
  margin-top: ${({theme}) => theme.metrics.biggerMargin}px;

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
  margin-bottom: ${({theme}) => theme.metrics.baseMargin}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => theme.metrics.hugePadding}px;
`;

export const TitleHeader = styled.Text<{active?: boolean}>`
  font-weight: ${props => (props.active ? 700 : 500)};
  color: ${props =>
    props.active ? theme.colors.black100 : theme.colors.black25};
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => theme.metrics.basePadding}px
    ${({theme}) => theme.metrics.hugePadding}px;
`;

export const Image = styled.Image`
  width: ${({theme}) => theme.metrics.baseWidth}px;
  height: ${({theme}) => theme.metrics.baseHeight}px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  background-color: ${({theme}) => theme.colors.black5};
`;

export const RowTexts = styled.View`
  padding-left: ${({theme}) => theme.metrics.basePadding}px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  width: 60%;
  align-items: center;
`;

export const TitleCard = styled.Text`
  font-weight: 700;
  color: ${({theme}) => theme.colors.black100};
`;

export const SubtitleCard = styled.Text`
  color: ${({theme}) => theme.colors.black100};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  padding-top: ${({theme}) => theme.metrics.smallPadding}px;
`;

export const DescriptionCard = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({theme}) => theme.colors.black25};
  padding-top: ${({theme}) => theme.metrics.smallPadding}px;
`;
