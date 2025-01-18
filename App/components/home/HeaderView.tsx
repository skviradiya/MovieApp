import {menuIcon} from '@App/assets/icons';
import colors from '@App/constants/colors';
import {fontScale} from '@App/utils/fontScaling';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CTIcon from '../common/CTIcon';

export default function HeaderView() {
  return (
    <>
      <SafeAreaView />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <CTIcon source={menuIcon} />
        <Text style={styles.titleStyle}>Movies</Text>
        <View style={styles.spacer} />
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
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontScale(20),
  },
});
