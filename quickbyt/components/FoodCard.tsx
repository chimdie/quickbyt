import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ShoppingCart} from 'lucide-react-native';
import {Colors} from '@/constants/Colors';

type FoodCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: (id: string) => void;
};

export function FoodCard({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
}: FoodCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(id)}>
            <ShoppingCart size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey[300],
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.grey[250],
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.main,
  },
  addButton: {
    backgroundColor: Colors.primary.main,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
