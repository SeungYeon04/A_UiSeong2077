import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  isLoggedIn: boolean;
}

interface UserStore {
  user: User | null;
  login: (userData: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => {
        console.log('Login called with:', userData);
        set({
          user: {
            ...userData,
            isLoggedIn: true,
          },
        });
      },
      logout: () =>
        set({
          user: null,
        }),
      isLoggedIn: () => {
        const user = get().user;
        return user?.isLoggedIn || false;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
