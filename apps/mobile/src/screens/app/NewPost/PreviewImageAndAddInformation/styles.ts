import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.ScrollView`
  flex: 1;
  margin-top: ${({theme}) => theme.metrics.biggerMargin}px;

  padding: 0px ${({theme}) => theme.metrics.hugePadding}px;
  background-color: ${({theme}) => theme.colors.background};
  border-top-right-radius: ${({theme}) => theme.metrics.fullRadius}px;
  border-top-left-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const ListSelectedMedia = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
}))``;

export const PhotoContainer = styled.TouchableOpacity``;

export const Photo = styled.Image.attrs({resizeMode: 'cover'})`
  height: 60px;
  width: 60px;
  align-self: center;
  margin: ${({theme}) => theme.metrics.smallMargin}px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
`;

export const Preview = styled.Image.attrs({resizeMode: 'cover'})`
  height: 130px;
  width: 130px;
  align-self: center;
  margin: ${({theme}) => theme.metrics.smallMargin}px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  font-weight: bold;
  text-align: center;
`;

export const Localization = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${({theme}) => theme.metrics.baseMargin}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({theme}) => theme.metrics.baseMargin}px 0
    ${({theme}) => theme.metrics.baseMargin}px 0;
`;

export const ScreenTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;
