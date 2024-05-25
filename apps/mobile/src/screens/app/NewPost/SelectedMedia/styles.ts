import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

export const Photo = styled.Image.attrs({resizeMode: 'contain'})`
  height: 350px;
  width: ${({theme}) =>
    theme.metrics.screenWidth - theme.metrics.baseMargin * 2}px;
  align-self: center;
  margin: ${({theme}) => theme.metrics.baseMargin}px
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
`;

export const ListGalery = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  numColumns: 4,
}))``;

export const ListSelectedMedia = styled(
  FlatList as new (props: FlatListProps<IData>) => FlatList<IData>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
}))``;

export const GaleryItemContainer = styled.TouchableOpacity``;

export const GaleryItemMark = styled(Icon).attrs({
  name: 'check-circle-outline',
  color: '#E6CBAE',
  size: 15,
})`
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const GaleryItem = styled.Image.attrs({resizeMode: 'cover'})`
  width: ${({theme}) => theme.metrics.screenWidth / 4}px;
  height: ${({theme}) => theme.metrics.screenWidth / 4}px;
  opacity: ${props => (props.isSelected ? 0.5 : 1)};
`;

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
