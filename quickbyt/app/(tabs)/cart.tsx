import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  // useWindowDimensions,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {CartItem} from '@/components/CartItem';
import {CartItem as CartItemType} from '@/types';
import {Colors} from '@/constants/Colors';
import {cartData} from '@/data/mockData';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(cartData);
  const [totalAmount, setTotalAmount] = useState(0);
  const listRef = useRef<FlashList<number> | null>(null);
  // const {width, height} = useWindowDimensions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalAmount(total);
  };

  const handleIncrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));

    // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
    listRef.current?.prepareForLayoutAnimationRender();
    // After removing the item, we can start the animation.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderCartItem = ({item}: {item: CartItemType}) => (
    <CartItem
      id={item.id}
      name={item.name}
      price={item.price}
      image={item.image}
      quantity={item.quantity}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onRemove={handleRemove}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length > 0 && (
          <Text style={styles.itemCount}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Text>
        )}
      </View>

      {cartItems.length > 0 ? (
        <>
          <View style={{flex: 1}}>
            <FlashList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.cartList}
              estimatedItemSize={40}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 16,
    color: Colors.primary.light,
    marginTop: 4,
  },
  cartList: {
    paddingHorizontal: 20,
  },
  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[100],
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.main,
  },
  checkoutButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.primary.light,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  shopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
