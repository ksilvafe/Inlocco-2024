import {
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {IComment, IPost} from '../../../@types/api';

export const Container = styled.ScrollView``;

export const Content = styled.View`
  gap: ${({theme}) => theme.metrics.smallMargin}px;
  margin: ${({theme}) => theme.metrics.biggerPadding}px;
`;

export const CommentsContainer = styled.View``;
export const InputCommentsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InfoTripContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Localization = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
  width: ${({theme}) => theme.metrics.screenWidth - 40}px;
`;

export const TripTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  font-weight: bold;
`;

export const TouchableContainer = styled.TouchableOpacity``;

export const PhotoContainer = styled.View`
  gap: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Divider = styled.View`
  width: max-content;
  height: 1px;
  background-color: ${({theme}) => theme.colors.black5};
`;

export const HorizontalList = styled(
  FlatList as new (props: FlatListProps<IPost>) => FlatList<IPost>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {gap: 10},
}))``;

export const List = styled(
  ScrollView as new (props: ScrollViewProps<IComment>) => ScrollView<IComment>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
}))``;

export const Photo = styled.Image.attrs({resizeMode: 'cover'})`
  height: 400px;
  width: ${({theme}) => theme.metrics.screenWidth - 40}px;
  border-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  gap: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const ActionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const ActionText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
`;

export const Subtitle = styled.Text`
  width: ${({theme}) => theme.metrics.screenWidth - 40}px;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 500;
`;
