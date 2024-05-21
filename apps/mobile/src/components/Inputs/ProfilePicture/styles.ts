import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const IconProfile = styled.Image.attrs({resizeMode: 'cover'})`
  width: 150px;
  height: 150px;
  border-radius: ${({theme}) => theme.metrics.circleRadius}px;
  align-self: center;
  margin-bottom: ${({theme}) => theme.metrics.baseMargin}px;
`;
