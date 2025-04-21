import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
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
} & TextInputProps;

export function TextInputWithControl<T extends FieldValues>({
  name,
  control,
  ...props
}: InputT & {name: FieldPath<T>; control: Control<T>}) {
  const {field} = useController({
    control,
    name,
  });

  const clearTextInput = () => {
    field.onChange('');
  };

  return (
    <TextInput
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      erroMessage={props.erroMessage}
      clearTextInput={clearTextInput}
    />
  );
}

export function TextInput(props: InputT) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {props.prefixIcon}
        <RNTextInput
          {...props}
          style={styles.input}
          placeholderTextColor={Colors.grey[200]}
          cursorColor={Colors.primary.main}
        />
        {props.suffixIcon}
      </View>
      {props.hasError && props.erroMessage ? (
        <Text style={styles.errorMessage}>{props.erroMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 16,
  },
  inputWrapper: {
    paddingHorizontal: 12,
    backgroundColor: Colors.whitesmoke,
    borderWidth: 0.2,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  container: {
    gap: 4,
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
  },
});
