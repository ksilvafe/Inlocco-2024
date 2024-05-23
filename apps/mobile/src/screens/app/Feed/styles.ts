import styled from 'styled-components/native';

import {FlatList, FlatListProps} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.metrics.hugePadding}px
    ${({theme}) => theme.metrics.basePadding}px 0px
    ${({theme}) => theme.metrics.basePadding}px;
  background-color: ${({theme}) => theme.colors.background};
  border-top-right-radius: ${({theme}) => theme.metrics.fullRadius}px;
  border-top-left-radius: ${({theme}) => theme.metrics.fullRadius}px;
`;

export const ColumnContainer = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 16px;
`;
export const Column = styled.View`
  flex: 1;
`;
