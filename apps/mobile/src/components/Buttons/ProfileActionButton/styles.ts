import styled from 'styled-components/native';
import {IProfileActionButton} from '../../../@types/components';

export const Container = styled.TouchableOpacity<IProfileActionButton>`
  width: 135px;
  height: 32px;
  border-color: ${props => props.color || props.theme.colors.border};
  border-width: ${({theme}) => theme.metrics.baseBorder}px;
  border-radius: ${({theme}) => theme.metrics.biggerRadius}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Label = styled.Text<IProfileActionButton>`
  margin-left: ${({theme}) => theme.metrics.smallMargin}px;
  color: ${props => props.color || props.theme.colors.text};
  font-weight: 600;
  font-size: ${({theme}) => theme.fontSizes.thin}px;
`;
