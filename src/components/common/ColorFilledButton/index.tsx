import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors } from '@theme/colors';

interface ColorFilledButtonProps {
  title: string;
  titleColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  backgroundColor?: string;
  rtl?: boolean;
}

const ColorFilledButton = ({
  title,
  titleColor,
  onPress = () => { },
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  backgroundColor,
  rtl = false,
}: ColorFilledButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonOuter, disabled && styles.disabledOuter]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      <View
        style={[
          styles.buttonInner,
          { backgroundColor },
          (backgroundColor === colors.palette.white ||
            backgroundColor === colors.palette.buttonBackground) && {
            borderWidth: 1,
            borderColor: colors.palette.innerCircle,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.palette.white} />
        ) : (
          <View style={[styles.row, rtl && { flexDirection: 'row-reverse' }]}>
            {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
            <Text style={[styles.text, { color: titleColor }]}>{title}</Text>
            {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
          </View>
        )}
      </View>

    </TouchableOpacity>
  );
};

export default ColorFilledButton;

const styles = StyleSheet.create({
  buttonOuter: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.palette.outerCircle,
    borderRadius: 4,
    padding: 2,
  },

  buttonInner: {
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: 6,
  },

  text: {
    fontSize: 16,
    fontFamily: 'Charter',
    textAlign: 'center',
  },

  disabledOuter: {
    opacity: 0.5,
  },
});
