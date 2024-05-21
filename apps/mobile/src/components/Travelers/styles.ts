import styled from 'styled-components/native';

export const Container = styled.TouchableHighlight``;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const IconProfile = styled.Image.attrs({resizeMode: 'cover'})`
  width: 60px;
  height: 60px;
  border-radius: ${({theme}) => theme.metrics.circleRadius}px;
`;

export const Username = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  font-weight: 700;
  align-self: center;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
`;
