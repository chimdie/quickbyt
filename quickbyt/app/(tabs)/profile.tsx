import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  User,
  MapPin,
  Phone,
  CreditCard,
  Bell,
  CircleHelp as HelpCircle,
  LogOut,
} from 'lucide-react-native';

import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {ProfileMenuItem} from '@/components/ProfileMenuItem';
import {userData} from '@/data/mockData';
import {Colors} from '@/constants/Colors';
import {Button} from '@/components/Button';
import {useAuthStore} from '@/store/useAuthStore';
import {router} from 'expo-router';

export default function ProfileScreen() {
  const {user, resetUser} = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleMenuItemPress = (action: string) => {
    console.log(`${action} pressed`);
    // Handle navigation or action
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      resetUser();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        {userData.profileImage ? (
          <Image
            source={{uri: userData.profileImage}}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <User size={40} color="#FFF" />
          </View>
        )}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.username || ''}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileMenuItem
            icon={User}
            title="Personal Information"
            onPress={() => handleMenuItemPress('Personal Information')}
          />
          <ProfileMenuItem
            icon={MapPin}
            title="Address"
            subtitle={userData.address}
            onPress={() => handleMenuItemPress('Address')}
          />
          <ProfileMenuItem
            icon={Phone}
            title="Phone Number"
            subtitle={userData.phone}
            onPress={() => handleMenuItemPress('Phone Number')}
          />
          <ProfileMenuItem
            icon={CreditCard}
            title="Payment Methods"
            onPress={() => handleMenuItemPress('Payment Methods')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <ProfileMenuItem
            icon={Bell}
            title="Notifications"
            onPress={() => handleMenuItemPress('Notifications')}
          />
          <ProfileMenuItem
            icon={HelpCircle}
            title="Help & Support"
            onPress={() => handleMenuItemPress('Help & Support')}
          />
        </View>
        <View style={styles.logoutButton}>
          <Button
            title="Logout"
            variant="LIGHT"
            prefixIcon={<LogOut size={20} color={Colors.primary.main} />}
            isLoading={loading}
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout', [
                {text: 'No', isPreferred: true, style: 'cancel'},
                {
                  text: 'Yes',
                  style: 'destructive',
                  onPress: handleLogout,
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey[300],
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.grey[250],
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary.light,
    borderRadius: 8,
  },
  editButtonText: {
    color: Colors.primary.main,
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    margin: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey[300],
  },
  logoutButton: {
    marginHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
