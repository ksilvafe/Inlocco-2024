import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Content = styled.View`
  align-items: center;
  flex-direction: row;
  border-bottom-width: ${({theme}) => theme.metrics.smallBorder}px;
  border-bottom-color: ${({theme}) => theme.colors.black5};
`;

export const ErrorMessage = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.red};
  margin-top: 5px;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  width: 25%;
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
`;

export const Input = styled.TextInput`
  width: 80%;
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
`;
