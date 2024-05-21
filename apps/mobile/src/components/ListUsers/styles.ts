import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: ${({theme}) => theme.metrics.basePadding}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({theme}) => theme.metrics.smallMargin}px;
  flex: 1;
`;

export const Image = styled.View`
  width: 51px;
  height: 51px;
  border-radius: ${({theme}) => theme.metrics.circleRadius}px;
  background-color: ${({theme}) => theme.colors.black25};
  border-width: ${({theme}) => theme.metrics.baseBorder}px;
  border-color: ${({theme}) => theme.colors.lightGreen};
`;

export const BoxContainer = styled.View`
  flex: 0.9;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.black100};
  font-weight: 700;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
`;

export const Subtitle = styled.Text`
  color: ${({theme}) => theme.colors.black100};
  font-weight: 400;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  margin-top: ${({theme}) => theme.metrics.smallPadding}px;
`;
