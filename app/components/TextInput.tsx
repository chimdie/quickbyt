import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  Text,
  View,
} from 'react-native';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
// import {getColor} from '@/config/theme';

type InputT = {
  label?: string;
  placeholder: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  hasError?: boolean;
  erroMessage?: string;
  hasErrorClearButton?: boolean;
  value?: string;
  clearTextInput?: () => void;
  formatValue?: (value: string) => string;
} & TextInputProps;

export function ControlledTextInput<T extends FieldValues>({
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
    <UnControlledTextInput
      {...props}
      value={field.value}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      clearTextInput={clearTextInput}
      erroMessage={props.erroMessage}
    />
  );
}

export function UnControlledTextInput(prop: InputT) {
  return (
    <View className="gap-1">
      <Text className="text-sm font-medium text-gray-500">{prop.label}</Text>
      <View
        className={`px-4 flex-row rounded-xl items-center justify-center bg-gray-200 dark:bg-gray-600 border border-gray-200 dark:border-white ${
          prop.hasError ? 'border-red-200' : ''
        }`}>
        {prop.startContent}
        <RNTextInput
          {...prop}
          className={`flex-1 font-medium bg-gray-200 dark:bg-gray-600 h-14 text-black dark:text-white ${prop.startContent && 'pl-4'} ${prop.className}`}
          // placeholderTextColor={getColor('')}
          placeholderClassName="text-base"
          placeholder={prop.placeholder || ''}
          // cursorColor={getColor('pax-primary')}
        />
        {prop.endContent}
      </View>
      {prop.hasError && (
        <Text className="text-xs text-red-500">{prop.erroMessage}</Text>
      )}
    </View>
  );
}
