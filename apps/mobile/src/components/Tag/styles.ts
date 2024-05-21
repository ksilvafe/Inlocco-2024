import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${({theme}) => theme.metrics.basePadding}px 0
    ${({theme}) => theme.metrics.basePadding}px;
  margin-right: ${({theme}) => theme.metrics.smallMargin}px;
  margin-top: ${({theme}) => theme.metrics.smallMargin}px;
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
`;
