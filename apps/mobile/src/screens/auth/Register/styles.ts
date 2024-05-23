import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 80px;
  justify-content: space-around;
  background-color: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.metrics.hugePadding}px
    ${({theme}) => theme.metrics.hugePadding}px 0px
    ${({theme}) => theme.metrics.hugePadding}px;
  border-top-right-radius: ${({theme}) => theme.metrics.fullRadius}px;
  border-top-left-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const Form = styled.KeyboardAvoidingView``;

export const AppName = styled.Text`
  align-self: center;
  margin-top: 80px;
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
  font-size: 40px;
`;

export const Title = styled.Text`
  align-self: center;
  color: ${({theme}) => theme.colors.text};
  margin: 30px 0px;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
`;
