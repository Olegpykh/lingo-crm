import { StateCreator } from 'zustand';
import { User } from '@/entities/user/types';
export type { User };

const defaultUser: User = {
  name: 'Oleg P.',
  email: 'oleg@lingocrm.de',
  avatar: null,
};

export interface UserSlice {
  user: User;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: defaultUser,
  setUser: (user) => set({ user }),
});
