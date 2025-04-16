import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDto} from '@/sdk/generated';
import {StoredKeys} from '@/constants/keys';

type InitialAuthState = {
  token: string | null;
  user: UserDto | null;
  setUser: (user: {token: string; user: UserDto}) => void;
  resetUser: () => void;
};

export const useAuthStore = create<InitialAuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      setUser: ({token, user}) => set({token, user}),
      resetUser: () => set({token: null, user: null}),
    }),
    {
      name: StoredKeys['auth-user'],
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
