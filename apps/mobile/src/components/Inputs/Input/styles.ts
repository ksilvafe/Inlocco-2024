import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  padding: ${({theme}) => theme.metrics.biggerPadding}px;
  background-color: ${({theme}) => theme.colors.card};
`;
export const InputContent = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-left: ${({theme}) => theme.metrics.biggerPadding}px;
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
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  margin-bottom: 9px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#565656',
})`
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;
