import styled from 'styled-components/native';

export const Container = styled.Image.attrs({resizeMode: 'cover'})`
  width: ${({theme}) => theme.metrics.screenWidth / 3}px;
  height: ${({theme}) => theme.metrics.screenWidth / 3}px;
`;
