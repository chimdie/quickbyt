import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDto} from '@/sdk/generated';
import {StoredKeys} from '@/constants/keys';

type InitialAuthState = {
  token: string | null;
  user: UserDto | null;
  hasHydrated: boolean;
  setUser: (user: {token: string; user: UserDto}) => void;
  resetUser: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};

export const useAuthStore = create<InitialAuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      hasHydrated: false,
      setUser: ({token, user}) => set({token, user}),
      resetUser: () => set({token: null, user: null}),
      setHasHydrated: hydrated => set({hasHydrated: hydrated}),
    }),
    {
      name: StoredKeys['auth-user'],
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
