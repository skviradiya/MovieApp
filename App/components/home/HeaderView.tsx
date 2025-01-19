import {menuIcon, profileIcon} from '@App/assets/icons';
import colors from '@App/constants/colors';
import {fontScale, scale} from '@App/utils/fontScaling';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CTIcon from '../common/CTIcon';
import {useAppSelector} from '@App/redux/store';
import FastImage from 'react-native-fast-image';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {UserNavigationProps} from '@App/types/navigation';
import {screens} from '@App/constants/screens';

export default function HeaderView() {
  const userData = useAppSelector(data => data.user.userDetails);
  const navigation = useNavigation<UserNavigationProps>();
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.background, zIndex: 100}} />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <CTIcon
          source={menuIcon}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <Text style={styles.titleStyle}>Movies</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.ProfileScreen)}>
          <FastImage
            source={
              userData?.profileImageBase64
                ? {uri: userData?.profileImageBase64}
                : profileIcon
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 100,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  spacer: {
    width: 24,
  },
  titleStyle: {
    paddingLeft: 20,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontScale(20),
  },
  profileImage: {
    width: scale(35),
    height: scale(35),
    borderRadius: 100,
  },
});
