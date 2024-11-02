import React from 'react';
import {Button as ButtonUI, ButtonProps} from '@rneui/themed';
import {getColor} from '@/config/theme';

const variants = {
  primary: {
    text: getColor('white'),
    box: getColor('primary'),
  },
  light: {
    text: getColor('white'),
    box: getColor('gray'),
  },
  ghost: {
    text: getColor('black'),
    box: 'transparent', // TODO
  },
  danger: {
    text: getColor('white'),
    box: 'transparent', // TODO
  },
};

type ButtonT = {
  variant?: keyof typeof variants;
} & ButtonProps;

export default function Button(props: ButtonT) {
  const boxStyle = variants[props.variant || 'primary'].box;
  const textStyle = variants[props.variant || 'primary'].text;

  return (
    <ButtonUI
      {...props}
      size={props.size || 'lg'}
      radius={8}
      color={boxStyle}
      titleStyle={{
        color: textStyle,
        fontWeight: 500,
        fontSize: 16,
      }}>
      {props.title}
    </ButtonUI>
  );
}
