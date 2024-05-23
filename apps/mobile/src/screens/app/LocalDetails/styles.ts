import {FlatList, FlatListProps} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import RNMapView from 'react-native-maps';

export const Container = styled.ScrollView`
  flex: 1;
  gap: 20px;
  margin: ${({theme}) => theme.metrics.biggerMargin + 30}px
    ${({theme}) => theme.metrics.baseMargin}px 0px
    ${({theme}) => theme.metrics.baseMargin}px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const CloseIcon = styled(Icon)``;

export const PhotoContainer = styled.View`
  margin-top: ${({theme}) => theme.metrics.baseMargin}px;
`;

export const List = styled(
  FlatList as new (props: FlatListProps<string>) => FlatList<string>,
).attrs(({theme}) => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
}))``;

export const PhotoList = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Photo = styled.Image.attrs({resizeMode: 'cover'})`
  height: 133px;
  width: ${({theme}) => theme.metrics.screenWidth - 250}px;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
  margin-right: ${({theme}) => theme.metrics.smallMargin}px;
  border-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const Subtitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 500;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Title = styled.Text`
  font-weight: 700;
  width: 80%;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;

export const Details = styled.View`
  width: 100%;
`;

export const DetailsContent = styled.View`
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({theme}) => theme.colors.border};
  padding: ${({theme}) => theme.metrics.basePadding}px;
`;

export const TitleDetail = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-weight: 700;
`;

export const DescriptionDetail = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-weight: 700;
  margin-left: ${({theme}) => theme.metrics.smallMargin}px;
  width: 75%;
`;

export const CardText = styled.Text`
  margin-left: ${({theme}) => theme.metrics.smallMargin}px;
  background-color: ${({theme}) => theme.colors.black5};
  color: ${({theme}) => theme.colors.text};
  padding: 5px;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  border-radius: ${({theme}) => theme.metrics.biggerBorder}px;
`;

export const MapView = styled(RNMapView)`
  width: fit-content;
  height: 150px;
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
  border-width: ${({theme}) => theme.metrics.smallBorder}px;
  border-color: ${({theme}) => theme.colors.secondary};
`;
