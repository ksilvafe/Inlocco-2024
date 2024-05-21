import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  padding: ${({theme}) => theme.metrics.basePadding}px;
  background-color: ${({theme}) => theme.colors.card};
  margin: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;

export const ErrorMessage = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.red};
  margin-top: 5px;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;
