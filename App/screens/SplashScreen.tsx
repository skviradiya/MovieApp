import {MovieLottieAnimation} from '@App/assets/lotties';
import colors from '@App/constants/colors';
import {screens} from '@App/constants/screens';
import {MainNavigationProps} from '@App/types/navigation';
import {readUserInfo} from '@App/utils/asyncActions';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

export default function SplashScreen() {
  const navigation = useNavigation<MainNavigationProps>();
  const navigationHandling = async () => {
    const data = await readUserInfo();
    if (data) {
      navigation.replace(screens.UserStack);
    } else {
      navigation.replace(screens.AuthStack);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.mainContainer}>
        <LottieView
          source={MovieLottieAnimation}
          style={styles.lottieStyle}
          autoPlay
          loop={false}
          onAnimationFinish={navigationHandling}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    width: '40%',
    height: '40%',
  },
});
