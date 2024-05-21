import styled from 'styled-components/native';
import {IProfileActionButton} from '../../../@types/components';

export const Container = styled.TouchableOpacity<IProfileActionButton>``;

export const Label = styled.Text<IProfileActionButton>`
  color: ${props => props.colorText ?? props.theme.colors.blue200};
  font-weight: ${props => props.weightText ?? 400};
  font-size: ${({theme}) => theme.fontSizes.bigger}px;
`;
