import {screens} from '@App/constants/screens';
import RegisterScreen from '@App/screens/auth/Register';
import SignInScreen from '@App/screens/auth/SignIn';
import {AuthStackNavigationParams} from '@App/types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<AuthStackNavigationParams>();
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.SingInScreen} component={SignInScreen} />
      <Stack.Screen name={screens.RegisterScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
