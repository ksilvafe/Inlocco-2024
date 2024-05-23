
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Routes } from './routes';
import Toast from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import CodePush from 'react-native-code-push';

import { theme } from './styles/themes';
import {StatusBar} from 'react-native';
import {AuthProvider} from './contexts/auth';
import {TamaguiProvider} from 'tamagui';

import tamaguiConfig from '../tamagui.config';

const queryClient = new QueryClient();

const config = {
  //inlocco://postdetails/clpxe93da0001oa4js6nlthot
  screens: {
    //NotificationsStackScreen: 'postdetails/:tripCuid',
    FeedTopTabScreen: {
      initialRouteName: 'Seguindo',
      screens: {
        Seguindo: {
          initialRouteName: 'Seguindo',
          screens: {
            PostDetails: 'postdetails/:tripCuid',
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['inlocco://'],
  config,
};

const StyledNavigationContainer = props => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme="default">
    <ThemeProvider theme={theme}>
      <StatusBar animated={true} backgroundColor={theme.colors.primary} />
      <NavigationContainer {...props} linking={linking} />
    </ThemeProvider>
  </TamaguiProvider>
);

function App() {
  return (
    <StyledNavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </StyledNavigationContainer>
  );
}

export default CodePush(App);
