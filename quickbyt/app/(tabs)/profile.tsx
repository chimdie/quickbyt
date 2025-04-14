import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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

export default function ProfileScreen() {
  const handleMenuItemPress = (action: string) => {
    console.log(`${action} pressed`);
    // Handle navigation or action
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
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
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

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleMenuItemPress('Logout')}>
          <LogOut size={20} color={Colors.primary.main} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    color: '#333',
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
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.primary.light,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFE8E8',
    borderRadius: 8,
  },
  editButtonText: {
    color: Colors.primary.main,
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE8E8',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.main,
  },
});
