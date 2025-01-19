import {
  fireIcon,
  heartIcon,
  logoutIcon,
  playIcon,
  profileIcon,
  profileOutlineIcon,
  upcomingIcon,
} from '@App/assets/icons';
import LogoutConfirmationModal from '@App/components/drawer/LogoutConfirmationModal';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {screens} from '@App/constants/screens';
import {movieActions} from '@App/redux/slices/movieSlice';
import {userActions} from '@App/redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {fontScale} from '@App/utils/fontScaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function CustomDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(data => data.user.userDetails);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = async () => {
    setLogoutModalVisible(false);
    dispatch(userActions.reset());
    dispatch(movieActions.reset());
    await AsyncStorage.clear();
    await auth().signOut();
    navigation.dispatch(StackActions.replace(screens.AuthStack));
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: profileOutlineIcon,
      onPress: () => {
        navigation.navigate(screens.ProfileScreen);
        navigation.closeDrawer();
      },
    },
    {
      label: 'Now Playing',
      icon: playIcon,
      onPress: () => {
        navigation.navigate(screens.HomeScreen, {tabIndex: 0});
        navigation.closeDrawer();
      },
    },

    {
      label: 'Popular',
      icon: fireIcon,
      onPress: () => {
        navigation.navigate(screens.HomeScreen, {tabIndex: 1});
        navigation.closeDrawer();
      },
    },
    {
      label: 'Upcoming',
      icon: upcomingIcon,
      onPress: () => {
        navigation.navigate(screens.HomeScreen, {tabIndex: 2});
        navigation.closeDrawer();
      },
    },
    {
      label: 'Favorites',
      icon: heartIcon,
      onPress: () => {
        navigation.navigate(screens.HomeScreen, {tabIndex: 3});
        navigation.closeDrawer();
      },
    },
    {
      label: 'Logout',
      icon: logoutIcon,
      onPress: () => setLogoutModalVisible(true),
    },
  ];
  // return <View />;
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: colors.background}} />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.row}
          onPress={() => navigation.navigate(screens.ProfileScreen)}>
          <FastImage
            style={styles.imageStyle}
            source={
              userData?.profileImageBase64
                ? {uri: userData?.profileImageBase64}
                : profileIcon
            }
            defaultSource={profileIcon}
          />
          <View style={styles.profileContainer}>
            <Text style={styles.userName}>
              {userData?.firstName} {userData?.lastName}
            </Text>
            <Text style={styles.emailText}>{userData?.email}</Text>
            <Text style={styles.viewProfile}>View Profile</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={item.onPress}>
              <Image
                source={item.icon}
                style={styles.iconStyle}
                tintColor={colors.textPrimary}
              />
              <Text style={styles.menuButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <LogoutConfirmationModal
        isVisible={isLogoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    backgroundColor: colors.cardBackground,
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.background,
    elevation: 100,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileContainer: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
    fontFamily: fonts.Bold,
    fontSize: fontScale(20),
  },
  emailText: {
    color: colors.textPrimary,
    fontSize: fontScale(14),
    fontFamily: fonts.Regular,
  },
  viewProfile: {
    color: colors.textSecondary,
    fontSize: fontScale(12),
    fontFamily: fonts.Regular,
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuButtonText: {
    fontSize: fontScale(16),
    color: colors.textPrimary,
    fontFamily: fonts.Medium,
    marginLeft: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
