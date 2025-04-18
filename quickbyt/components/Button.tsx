import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ButtonProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '@/constants/Colors';

const variants = {
  PRIMARY: {
    box: Colors.primary.main,
    text: '#FFFFFF',
    spinner: '#FFFFFF',
  },
  DISABLED: {
    box: Colors.disabled,
    text: '#FFFFFF',
    spinner: '#FFFFFF',
  },
  LIGHT: {
    box: '#FFFFFF',
    text: Colors.primary.main,
    spinner: Colors.primary.main,
    borderColor: Colors.primary.light,
  },
};

type Variant = keyof typeof variants;

type ButtonT = {
  title: string;
  isLoading?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
} & Omit<ButtonProps, 'title'>;

export function Button({
  variant = 'PRIMARY',
  title,
  disabled,
  style,
  textStyle,
  isLoading,
  prefixIcon,
  suffixIcon,
  ...rest
}: ButtonT) {
  const activeVariant = disabled ? 'DISABLED' : variant;
  const variantStyles = variants[activeVariant];

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.button,
        {backgroundColor: variantStyles.box},
        activeVariant === 'LIGHT' && {
          borderWidth: 1,
          borderColor: Colors.primary.light,
        },
        style,
        disabled && {opacity: 0.5},
      ]}
      disabled={disabled}>
      <View style={styles.contentWrapper}>
        {prefixIcon}
        <Text
          style={[
            styles.buttonText,
            {color: variantStyles.text, opacity: isLoading ? 0.5 : 1},
            textStyle,
          ]}>
          {title}
        </Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={variantStyles.spinner}
            style={styles.spinnerOverlay}
          />
        )}
        {suffixIcon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    gap: 8,
  },
  spinnerOverlay: {
    position: 'absolute',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
