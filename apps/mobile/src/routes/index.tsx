import React from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import {useAuth} from '../contexts/auth';
import {ActivityIndicator} from 'react-native';

//import Loading from '../components/Loading';

export function Routes() {
  const {signed, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />; // <Loading />;
  }

  return !signed ? <AuthRoutes /> : <AppRoutes />;
  //return <AuthRoutes />; // <AuthRoutes />;
}
