import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background};
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
`;

export const Content = styled.View``;

export const TextInput = styled.TextInput`
  height: 90px;
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;

export const Divider = styled.View`
  width: ${({theme}) => theme.metrics.screenWidth}px;
  height: ${({theme}) => theme.metrics.smallBorder}px;
  background-color: ${({theme}) => theme.colors.opacity_05};
`;
