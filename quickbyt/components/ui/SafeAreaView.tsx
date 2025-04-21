import {SafeAreaView as CtxSafeAreaView} from 'react-native-safe-area-context';
import {PropsWithChildren} from 'react';
import {Platform, KeyboardAvoidingView, ViewStyle} from 'react-native';

import {Colors} from '@/constants/Colors';

export const SafeAreaView = ({
  children,
  style,
  ...rest
}: PropsWithChildren<{style?: ViewStyle}>) => {
  return (
    <CtxSafeAreaView
      style={[{flex: 1, backgroundColor: Colors.background}, style]}
      {...rest}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1}}
        keyboardVerticalOffset={10}>
        {children}
      </KeyboardAvoidingView>
    </CtxSafeAreaView>
  );
};
