import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from './CustomDrawerContent';
import {screens} from '@App/constants/screens';
import HomeScreen from '@App/screens/users/home/Home';
import {UserStackNavigationParams} from '@App/types/navigation';
const Drawer = createDrawerNavigator<UserStackNavigationParams>();
export default function DrawerStack() {
  const renderDrawerContent = (props: DrawerContentComponentProps) => (
    <CustomDrawerContent {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
        },
      }}>
      <Drawer.Screen name={screens.HomeScreen} component={HomeScreen} />
    </Drawer.Navigator>
  );
}
