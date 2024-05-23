import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';

const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerShown: false,
};

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

