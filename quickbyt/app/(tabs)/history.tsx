import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {OrderHistoryItem} from '@/components/OrderHistoryItem';
import {pastOrders} from '@/data/mockData';
import {Order, OrderStatus} from '@/types';
import {Colors} from '@/constants/Colors';

type OrderTabStatus = 'ALL' | OrderStatus;

type TabItemProp = {
  tabTitle: string;
  activeTab: OrderTabStatus;
  currentTab: OrderTabStatus;
  setActiveTab: React.Dispatch<React.SetStateAction<OrderTabStatus>>;
};

const TabItem = (props: TabItemProp) => {
  const {tabTitle, activeTab, currentTab, setActiveTab} = props;
  return (
    <TouchableOpacity
      style={[styles.tab, activeTab === currentTab && styles.activeTab]}
      onPress={() => setActiveTab(currentTab)}>
      <Text
        style={[
          styles.tabText,
          activeTab === currentTab && styles.activeTabText,
        ]}>
        {tabTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default function HistoryScreen() {
  const [orders] = useState<Order[]>(pastOrders); // setOrders
  const [activeTab, setActiveTab] = useState<OrderTabStatus>('ALL');
  const {height} = useWindowDimensions();

  const filteredOrders =
    activeTab === 'ALL'
      ? orders
      : orders.filter(order => order.status === activeTab);

  const handleOrderPress = (orderId: string) => {
    console.log(`Order ${orderId} pressed`);
  };

  const renderOrderItem = ({item}: {item: Order}) => (
    <OrderHistoryItem
      id={item.id}
      date={new Date(item.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
      totalItems={item.items.reduce((sum, item) => sum + item.quantity, 0)}
      totalAmount={item.totalAmount}
      status={item.status}
      onPress={handleOrderPress}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TabItem
          tabTitle="All"
          activeTab={activeTab}
          currentTab="ALL"
          setActiveTab={setActiveTab}
        />
        <TabItem
          tabTitle="Delivered"
          activeTab={activeTab}
          currentTab="DELIVERED"
          setActiveTab={setActiveTab}
        />
        <TabItem
          tabTitle="Processing"
          activeTab={activeTab}
          currentTab="PROCESSING"
          setActiveTab={setActiveTab}
        />
        <TabItem
          tabTitle="Cancelled"
          activeTab={activeTab}
          currentTab="CANCELLED"
          setActiveTab={setActiveTab}
        />
      </View>

      {filteredOrders.length > 0 ? (
        <View style={{minHeight: height}}>
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.ordersList}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
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
    color: Colors.grey[300],
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  activeTab: {
    backgroundColor: Colors.primary.light,
  },
  tabText: {
    fontSize: 14,
    color: Colors.grey[250],
  },
  activeTabText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey[250],
  },
});
