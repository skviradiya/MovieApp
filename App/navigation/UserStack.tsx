import {screens} from '@App/constants/screens';
import MovieDetailsScreen from '@App/screens/users/MovieDetails';
import {UserStackNavigationParams} from '@App/types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerStack from './DrawerStack';
import ProfileScreen from '@App/screens/users/Profile';
import {withInternetCheck} from '@App/screens/NoInternetScreen';

const Stack = createNativeStackNavigator<UserStackNavigationParams>();
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.DrawerStack} component={DrawerStack} />
      <Stack.Screen name={screens.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={screens.MovieDetailsScreen}
        component={MovieDetailsScreen}
      />
    </Stack.Navigator>
  );
}
export default withInternetCheck(UserStack);
