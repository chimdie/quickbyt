import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronRight} from 'lucide-react-native';
import {OrderStatus} from '@/types';
import {Colors} from '@/constants/Colors';

type OrderHistoryItemProps = {
  id: string;
  date: string;
  totalItems: number;
  totalAmount: number;
  status: OrderStatus;
  onPress: (id: string) => void;
};

export function OrderHistoryItem({
  id,
  date,
  totalItems,
  totalAmount,
  status,
  onPress,
}: OrderHistoryItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'DELIVERED':
        return '#4CAF50';
      case 'PROCESSING':
        return '#FF9800';
      case 'CANCELLED':
        return '#F44336';
      default:
        return Colors.grey[300];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered';
      case 'PROCESSING':
        return 'Processing';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{id.slice(-6)}</Text>
          <Text style={[styles.status, {color: getStatusColor()}]}>
            {getStatusText()}
          </Text>
        </View>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.details}>
          <Text style={styles.items}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
          <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.grey[300],
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: Colors.primary.light,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    fontSize: 14,
    color: Colors.primary.light,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary.main,
  },
});
