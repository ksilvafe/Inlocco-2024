import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../../styles/themes'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
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

export const IconsRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View<{rounded?: boolean}>`
  width: ${({theme}) => theme.metrics.baseWidth}px;
  height: ${({theme}) => theme.metrics.baseHeight}px;
  border-radius: ${props =>
    props.rounded ? theme.metrics.circleRadius : theme.metrics.biggerRadius}px;
  background-color: ${({theme}) => theme.colors.black5};
  border: ${props => (props.rounded ? `${theme.metrics.baseBorder}px` : 0)}
    solid ${({theme}) => theme.colors.lightGreen};

  // No image
  align-items: center;
  justify-content: center;
`;

export const RowTexts = styled.View`
  gap: ${({theme}) => theme.metrics.smallPadding}px;
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
  color: ${({theme}) => theme.colors.black25};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 700;
`;
