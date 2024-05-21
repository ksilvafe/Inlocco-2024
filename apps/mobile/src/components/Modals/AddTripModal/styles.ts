import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
  background-color: ${({theme}) => theme.colors.black50};
`;

export const ModalView = styled.View`
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
  padding: ${({theme}) => theme.metrics.basePadding}px;
  elevation: 5;
`;

export const ContainerInputs = styled.View`
  margin-top: 21px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
  align-self: center;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
`;
