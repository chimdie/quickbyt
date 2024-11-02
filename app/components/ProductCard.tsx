import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {currencyParser} from '@/utils/currencyParser';

export type ProductI = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: string;
  description: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'meat' | 'seafood';
  image: string;
  isAvailable: boolean;
};

export default function ProductCard({product}: {product: ProductI}) {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 gap-4">
      <View className="absolute top-4 right-4 z-20">
        <TouchableOpacity className="p-2 rounded-lg bg-gray-50/45 overflow-hidden shadow-md">
          <Feather name="heart" size={20} color={getColor('primary')} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 gap-2">
        <Image
          source={{uri: product.image}}
          className="w-full h-40 rounded-t-lg"
          resizeMode="cover"
        />
        <Text className="text-lg font-bold" numberOfLines={1}>
          {product.name}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">
          {product.price && currencyParser(+product.price || 0)}
        </Text>
        <TouchableOpacity className="p-1 rounded-lg">
          <Feather name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
