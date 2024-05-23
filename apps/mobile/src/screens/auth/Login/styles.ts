import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {styled} from '@tamagui/core';

export const Container = styled(SafeAreaView, {
  padding: 10,
  flex: 1,
  backgroundColor: '$primary',
});

export const Content = styled(KeyboardAvoidingView, {
  flex: 1,
  justifyContent: 'space-between',
  marginTop: 80,
  padding: '$3',
  backgroundColor: '$background',
  borderTopRightRadius: '$10',
  borderTopLeftRadius: '$10',
});
