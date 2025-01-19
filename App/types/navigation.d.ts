import { screens } from '@App/constants/screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IMoviesResult } from './slice/movieSlice';

export type MainStackNavigationParams={
[screens.SplashScreen]:undefined,
[screens.AuthStack]:undefined,
[screens.UserStack]:undefined,
}

export type MainNavigationProps=NativeStackNavigationProp<MainStackNavigationParams>

export type AuthStackNavigationParams={
  [screens.SplashScreen]:undefined,
  [screens.RegisterScreen]:undefined,
  [screens.SingInScreen]:undefined,
  [screens.UserStack]:undefined,
}

export type AuthNavigationProps=NativeStackNavigationProp<AuthStackNavigationParams>


export type UserStackNavigationParams={
[screens.DrawerStack]:undefined,
[screens.MovieDetailsScreen]:{
  moviesDetails:IMoviesResult
},
[screens.ProfileScreen]:undefined,
[screens.HomeScreen]:{
  tabIndex?:number
},
}

export type UserNavigationProps=NativeStackNavigationProp<UserStackNavigationParams>
