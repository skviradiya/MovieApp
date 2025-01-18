import React from 'react';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import CTIcon from './CTIcon'; // Adjust the path as necessary
import {backArrowIcon} from '@App/assets/icons';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {fontScale} from '@App/utils/fontScaling';

type CTHeaderProps = {
  title?: string;
  onBackPress?: (event: GestureResponderEvent) => void;
  containerStyle?: object;
  titleStyle?: object;
};

const CTHeader: React.FC<CTHeaderProps> = ({
  title,
  onBackPress,
  containerStyle = {},
  titleStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {onBackPress ? (
        <CTIcon source={backArrowIcon} onPress={onBackPress} />
      ) : null}
      {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
      {onBackPress ? <View style={styles.iconPlaceholder} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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

  title: {
    fontSize: fontScale(18),
    fontFamily: fonts.Bold,
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  iconPlaceholder: {
    width: 24,
  },
});

export default CTHeader;
