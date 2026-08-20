'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const defaultUser: User = { name: 'Oleg P.', email: 'oleg@lingocrm.de' };

function getInitialUser(): User {
  if (typeof window === 'undefined') return defaultUser;
  const stored = localStorage.getItem('lingo-user');
  return stored ? JSON.parse(stored) : defaultUser;
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User>(getInitialUser);

  const updateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('lingo-user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
