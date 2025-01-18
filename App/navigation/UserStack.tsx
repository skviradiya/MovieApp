import {screens} from '@App/constants/screens';
import HomeScreen from '@App/screens/users/home/Home';
import MovieDetailsScreen from '@App/screens/users/MovieDetails';
import {UserStackNavigationParams} from '@App/types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<UserStackNavigationParams>();
export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={screens.MovieDetailsScreen}
        component={MovieDetailsScreen}
      />
    </Stack.Navigator>
  );
}
