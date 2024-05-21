import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const TouchableContainer = styled.TouchableOpacity``;

export const Photo = styled.Image.attrs({resizeMode: 'cover'})`
  min-height: 150px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
`;
