import {Redirect} from 'expo-router';
import {useState} from 'react';

export default function Index() {
  const [user] = useState(false);
  return <Redirect href={user ? '/(tabs)' : '/auth/login'} />;
}
