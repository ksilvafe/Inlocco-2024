import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.ScrollView`
  flex: 1;
  margin-top: 50px;
  background-color: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.metrics.hugePadding}px
    ${({theme}) => theme.metrics.hugePadding}px 0px
    ${({theme}) => theme.metrics.hugePadding}px;
  border-top-right-radius: ${({theme}) => theme.metrics.fullRadius}px;
  border-top-left-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const Form = styled.KeyboardAvoidingView`
  flex: 1;
  margin-bottom: ${({theme}) => theme.metrics.biggerMargin}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme}) => theme.metrics.biggerMargin}px;
`;

export const ScreenTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
`;

export const Name = styled.TextInput`
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  font-weight: 700;
  align-self: center;
  font-size: ${({theme}) => theme.fontSizes.huge}px;
  margin: ${({theme}) => theme.metrics.biggerMargin}px 0px;
`;
