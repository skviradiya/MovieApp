import colors from '@App/constants/colors';
import {fontScale} from '@App/utils/fontScaling';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface CTButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

const CTButton: React.FC<CTButtonProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...props}>
      <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: fontScale(16),
    fontWeight: 'bold',
  },
});

export default CTButton;
