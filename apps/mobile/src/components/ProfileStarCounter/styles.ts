import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 0.8;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  padding: ${({theme}) => theme.metrics.smallPadding}px;
  margin-right: ${({theme}) => theme.metrics.smallMargin}px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Label = styled.Text`
  margin-left: ${({theme}) => theme.metrics.smallMargin}px;
  color: white;
  font-weight: 700;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
  font-size: ${({theme}) => theme.fontSizes.thin}px;
`;
