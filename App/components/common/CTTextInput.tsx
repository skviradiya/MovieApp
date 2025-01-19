/* eslint-disable react-native/no-inline-styles */
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {fontScale} from '@App/utils/fontScaling';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface CTTextInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: object;
  isPassword?: boolean;
}
function CTTextInput({
  label,
  inputStyle,
  value,
  isPassword,
  containerStyle,
  errorMessage,
  onBlur,
  ...props
}: CTTextInputProps) {
  const [isFocused, setIsFocused] = useState(value ? true : false);
  const [isSecure, setIsSecure] = useState(isPassword || false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(value ? true : false);
  };
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View
          style={{
            top: isFocused ? 5 : undefined,
            position: 'absolute',
            left: 10,
          }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontFamily: fonts.Bold,
              fontSize: isFocused ? fontScale(10) : fontScale(14),
            }}>
            {label}
          </Text>
        </View>
        <TextInput
          style={[styles.input, inputStyle, {top: isFocused ? 10 : 0}]}
          onFocus={handleFocus}
          onBlur={e => {
            handleBlur();
            onBlur?.(e);
          }}
          value={value}
          multiline={false}
          cursorColor={colors.textPrimary}
          secureTextEntry={isSecure}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={{marginRight: 10}}>
            <Text style={styles.secureTextStyle}>
              {isSecure ? 'SHOW' : 'HIDE'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  input: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontScale(16),
    fontFamily: fonts.SemiBold,
    flex: 1,
  },
  secureTextStyle: {
    color: colors.textPrimary,
    fontFamily: fonts.Regular,
  },
  errorMessage: {
    color: colors.error,
    fontFamily: fonts.Medium,
    fontSize: fontScale(11),
    marginLeft: 10,
  },
});
export default CTTextInput;
