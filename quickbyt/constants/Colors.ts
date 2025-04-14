/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: {
    main: '#FF6B6B',
    light: '#666',
  },
  background: '#F8F8F8',
  grey: {
    100: '#EEE',
    200: '#888',
    300: '#333',
  },
  disabled: '#444',
  termsColor: '#aaa',
  whitesmoke: '#F5F5F5',
};

export const testBorder = {
  borderWidth: 2,
  borderColor: 'red',
};
