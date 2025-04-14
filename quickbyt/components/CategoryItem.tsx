import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {CategoryT} from '@/types';

type CategoryItemProps = {
  name: string;
  image: string;
  selectedCategory: CategoryT | null;
} & TouchableOpacityProps;

export function CategoryItem({
  name,
  image,
  selectedCategory,
  ...props
}: CategoryItemProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, selectedCategory && styles.selected]}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={[styles.name, selectedCategory && styles.selectedText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
    backgroundColor: Colors.whitesmoke,
    borderRadius: 12,
    padding: 8,
  },
  selected: {
    backgroundColor: '#FFE8E8',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  selectedText: {
    color: Colors.primary.main,
    fontWeight: 'bold',
  },
});
