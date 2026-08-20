'use client';

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from 'react';

interface User {
  name: string;
  email: string;
  avatar: string | null;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const defaultUser: User = {
  name: 'Oleg P.',
  email: 'oleg@lingocrm.de',
  avatar: null,
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

function subscribe(callback: () => void) {
  window.addEventListener('lingo-user-change', callback);
  return () => window.removeEventListener('lingo-user-change', callback);
}

function getSnapshot(): string {
  return localStorage.getItem('lingo-user') ?? JSON.stringify(defaultUser);
}

function getServerSnapshot(): string {
  return JSON.stringify(defaultUser);
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const user: User = JSON.parse(raw);

  const setUser = (newUser: User) => {
    localStorage.setItem('lingo-user', JSON.stringify(newUser));
    window.dispatchEvent(new Event('lingo-user-change'));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
