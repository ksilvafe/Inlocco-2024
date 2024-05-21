import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${props =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.background};
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
`;
