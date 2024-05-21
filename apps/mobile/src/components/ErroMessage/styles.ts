import styled from 'styled-components/native';

export const Container = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.red};
  margin-top: 5px;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;
