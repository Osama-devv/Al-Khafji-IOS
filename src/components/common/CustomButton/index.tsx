import { colors } from '@theme/colors';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'clear';

type ButtonSize = 'sm' | 'md' | 'tabMd' | 'lg';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: any;
  textStyle?: any;
  backgroundColor?: string;
  activeBorderColor?: string;
}

const CustomButton = ({
  title,
  onPress = () => { },
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  backgroundColor,
  activeBorderColor,
}: Props) => {
  const variantStyles = VARIANTS[variant];
  const sizeStyles = SIZES[size];
  const isLarge = size === 'lg';

  return (
    <TouchableOpacity
      style={[
        styles.outerBorder,
        activeBorderColor ? { borderColor: activeBorderColor } : undefined,
        isLarge && styles.fullWidth,
        isLarge && styles.fullWidth,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      <View
        style={[
          styles.innerView,
          variantStyles.button,
          disabled ? { backgroundColor: '#333A3B' } : undefined,
          backgroundColor ? { backgroundColor } : undefined,
          isLarge && styles.innerFullWidth,
          sizeStyles.button,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variantStyles.text.color} />
        ) : (
          <View style={styles.row}>
            {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

            <Text
              style={[
                styles.text,
                variantStyles.text,
                sizeStyles.text,
                textStyle,
              ]}
            >
              {title}
            </Text>

            {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;


const VARIANTS = {
  primary: {
    button: { backgroundColor: colors.tabactive, borderWidth: 0 },
    text: { color: '#fff' },
  },
  secondary: {
    button: { backgroundColor: '#E3F4F5' },
    text: { color: colors.textPrimary },
  },
  outline: {
    button: { backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.borderColor },
    text: { color: colors.textPrimary },
  },
  ghost: {
    button: { backgroundColor: 'transparent' },
    text: { color: '#222' },
  },
  danger: {
    button: { backgroundColor: '#D9534F' },
    text: { color: '#fff' },
  },
  success: {
    button: { backgroundColor: '#2ECC71' },
    text: { color: '#fff' },
  },
  clear: {
    button: { backgroundColor: 'transparent', borderWidth: 0 },
    text: { color: '#fff' },
  }
};


const SIZES = {
  sm: {
    button: { paddingVertical: 4, paddingHorizontal: 16 },
    text: { fontSize: 14, fontWeight: '400' },
  },
  md: {
    button: { paddingVertical: 11, paddingHorizontal: 16 },
    text: { fontSize: 12, fontFamily: "Charter" },
  },
  tabMd: {
    button: { paddingVertical: 8, paddingHorizontal: Platform.OS === "ios" ? 26 : 21 },
    text: { fontSize: 16, fontFamily: "Charter", lineHeight: 19.2, fontStyle: "normal" },
  },
  lg: {
    button: { paddingVertical: 16, paddingHorizontal: 20 },
    text: { fontSize: 18, fontFamily: "Charter" },
  },
};


const styles = StyleSheet.create({
  outerBorder: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 2,
    padding: 3,
  },
  fullWidth: {
    width: '100%',
    flex: 1,
  },

  innerFullWidth: {
    width: '100%',
  },
  innerView: {
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginHorizontal: 6,
  },

  text: {
    fontWeight: '600',
  },

  disabledButton: {
    opacity: 0.5,
  },
});