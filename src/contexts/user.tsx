"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type UserState = {
  user: UserProfile | null;
  actions: {
    login: (email: string, password: string) => Promise<void>;
  };
};

const initialState: UserState = {
  user: null,
  actions: {
    login: () => Promise.resolve(),
  },
};

const UserContext = createContext(initialState);

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(initialState.user);

  const login = async () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        actions: {
          login,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const user = useContext(UserContext);
  return user;
}

export { UserProvider, useUser };
