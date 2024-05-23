import {
  FlatList,
  FlatListProps,
  SectionList,
  SectionListProps,
} from 'react-native';
import styled from 'styled-components/native';
import {IPost} from '../../../@types/api';

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 10px
  margin: ${({theme}) => theme.metrics.hugePadding}px
    ${({theme}) => theme.metrics.hugePadding}px 0px
    ${({theme}) => theme.metrics.hugePadding}px;
`;

export const PhotoContainer = styled.View``;

export const RoadMapList = styled(
  SectionList as new (
    props: SectionListProps<IPost, any>,
  ) => SectionList<IPost>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {gap: 10},
}))`
  gap: 10px;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<IPost>) => FlatList<IPost>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {gap: 10},
}))`
  gap: 10px;
`;

export const Photo = styled.Image.attrs({resizeMode: 'cover'})`
  height: 133px;
  width: 133px;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
  border-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const ActionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: ${({theme}) => theme.metrics.baseMargin}px;
`;

export const ActionText = styled.Text`
  padding-left: ${({theme}) => theme.metrics.smallPadding}px;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
`;

export const Subtitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 500;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;

export const TripContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({theme}) => theme.colors.border};
  padding: 10px;
`;

export const DisplayName = styled.Text`
  flex: 1;
  width: 200px;
  font-size: ${({theme}) => theme.fontSizes.thin}px;
`;
