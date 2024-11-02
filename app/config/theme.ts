import cols from 'tailwindcss/colors';
import colors from '@/color';

export type ColorI = keyof typeof colors;

export const getColor = (key: ColorI) => {
  return cols[key as keyof typeof cols] as never;
};
