import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ChevronRight, LucideIcon} from 'lucide-react-native';
import {Colors} from '@/constants/Colors';

type ProfileMenuItemProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onPress: () => void;
} & TouchableOpacityProps;

export function ProfileMenuItem({
  icon,
  title,
  subtitle,
  ...props
}: ProfileMenuItemProps) {
  const Icon = icon;

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={Colors.primary.main} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.whitesmoke,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grey[300],
  },
  subtitle: {
    fontSize: 14,
    color: Colors.grey[250],
    marginTop: 2,
  },
});
