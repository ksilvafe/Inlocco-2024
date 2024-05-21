import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${({theme}) => theme.metrics.basePadding}px;
  padding-top: ${({theme}) => theme.metrics.basePadding}px;
  margin-bottom: ${({theme}) => theme.metrics.smallMargin}px;
  border-bottom-width: ${({theme}) => theme.metrics.smallBorder}px;
  border-bottom-color: ${({theme}) => theme.colors.black5};
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${({theme}) => theme.colors.text};
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  line-height: ${({theme}) => theme.metrics.baseLineHeight}px;
`;

export const Input = styled(TextInputMask)`
  border-radius: ${({theme}) => theme.metrics.baseRadius}px;
  color: ${({theme}) => theme.colors.text};
  min-width: 100px;
  padding: ${({theme}) => theme.metrics.smallPadding}px
    ${({theme}) => theme.metrics.biggerPadding}px;
  font-weight: 500;
  text-align: center;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  background-color: ${({theme}) => theme.colors.card};
`;
