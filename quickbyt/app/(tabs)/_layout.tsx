import {StyleSheet} from 'react-native';
import {Tabs} from 'expo-router';
import {ShoppingCart, Clock, User, Chrome} from 'lucide-react-native';
import {Colors} from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.main,
        tabBarInactiveTintColor: Colors.grey[200],
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color, size}) => <Chrome size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: 'Plate',
          tabBarIcon: ({color, size}) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: 'History',
          tabBarIcon: ({color, size}) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
          href: null,
          // tabBarStyle: {display: 'none'},
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFF',
    height: 60,
    paddingBottom: 12,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  headerStyle: {
    backgroundColor: '#FFF',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: Colors.grey[300],
  },
});
