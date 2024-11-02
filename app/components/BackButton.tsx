import React from 'react';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {Pressable, PressableProps} from 'react-native';

type Props = {
  name?: React.ComponentProps<typeof Feather>['name'];
  color?: string;
  size?: number;
} & PressableProps;

export default function BackButton(props: Props) {
  return (
    <Pressable {...props}>
      <Feather
        name={props.name ?? 'arrow-left'}
        size={props.size ?? 32}
        color={props.color ?? getColor('black')}
      />
    </Pressable>
  );
}
