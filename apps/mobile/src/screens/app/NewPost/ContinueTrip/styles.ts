import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

import {theme} from '../../../../styles';

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

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({theme}) => theme.metrics.baseMargin}px
    ${({theme}) => theme.metrics.biggerMargin}px
    ${({theme}) => theme.metrics.baseMargin}px
    ${({theme}) => theme.metrics.biggerMargin}px;
`;

export const ScreenTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => theme.metrics.basePadding}px
    ${({theme}) => theme.metrics.hugePadding}px;
`;

export const RowTexts = styled.View`
  padding-left: ${({theme}) => theme.metrics.basePadding}px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  width: 60%;
  align-items: center;
`;

export const DescriptionCard = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({theme}) => theme.colors.black25};
  padding-top: ${({theme}) => theme.metrics.smallPadding}px;
`;

export const TitleCard = styled.Text`
  font-weight: 700;
  color: ${({theme}) => theme.colors.black100};
`;

export const ImageContainer = styled.Image`
  width: ${({theme}) => theme.metrics.baseWidth}px;
  height: ${({theme}) => theme.metrics.baseHeight}px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  background-color: ${({theme}) => theme.colors.black5};
`;
