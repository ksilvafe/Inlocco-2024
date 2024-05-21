import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-bottom-width: ${({theme}) => theme.metrics.smallBorder}px;
  border-color: ${({theme}) => theme.colors.black5}px;
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
  padding: ${({theme}) => theme.metrics.smallPadding}px;
  padding-bottom: ${({theme}) => theme.metrics.biggerPadding}px;
`;

export const Content = styled.View`
  gap: ${({theme}) => theme.metrics.smallPadding}px;
`;

export const DisplayName = styled.Text`
  font-weight: 600;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;

export const Caption = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.thin}px;
`;
