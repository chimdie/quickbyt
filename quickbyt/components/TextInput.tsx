import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import React from 'react';
import {Colors} from '@/constants/Colors';

type InputT = {
  placeholder: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  label?: string;
  hasError?: boolean;
  erroMessage?: string;
  hasErrorClearButton?: boolean;
  value?: string;
  clearTextInput?: () => void;
  formatValue?: (value: string) => string;
} & TextInputProps;

export function TextInput(props: InputT) {
  return (
    <RNTextInput
      {...props}
      style={styles.input}
      placeholderTextColor={Colors.grey[200]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.whitesmoke,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 0.2,
  },
});
