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
  },
  DISABLED: {
    box: Colors.disabled,
  },
  LIGHT: {
    box: '#FFFFFF',
  },
};

type Variant = keyof typeof variants;

type ButtonT = {
  title: string;
  isLoading?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & Omit<ButtonProps, 'title'>;

export function Button({
  variant = 'PRIMARY',
  title,
  disabled,
  style,
  textStyle,
  isLoading,
  ...rest
}: ButtonT) {
  const activeVariant = disabled ? 'DISABLED' : variant;

  return (
    <TouchableOpacity
      {...rest}
      style={[
        style,
        styles.button,
        disabled && {opacity: 0.5},
        {backgroundColor: variants[activeVariant].box},
      ]}
      disabled={disabled}>
      <View style={styles.contentWrapper}>
        <Text
          style={[
            textStyle,
            styles.buttonText,
            {color: '#FFF', opacity: isLoading ? 0.5 : 1},
          ]}>
          {title}
        </Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="#FFF"
            style={styles.spinnerOverlay}
          />
        )}
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
