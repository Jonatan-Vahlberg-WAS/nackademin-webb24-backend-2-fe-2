"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type UserState = {
  user: UserProfile | null;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
};

const initialState: UserState = {
  user: null,
  actions: {
    login: () => Promise.resolve(),
    logout: () => {}
  },
};

const UserContext = createContext(initialState);

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(initialState.user);

  useEffect(() => {
    _getUserProfile()
  },[])

  const login: typeof initialState.actions.login = async (email, password) => {
    console.log("Login", email, password)
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!
    const url = `${baseUrl}/auth/login/`
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email, password})

    })
    if(response.ok) {
        _getUserProfile()
        return
    }
    //TODO HANDLE ERRORS
    console.log("RESPONSE", response)
  };

  const _getUserProfile = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!
    const url = `${baseUrl}/auth/me/`
    const response = await fetch(url,{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
    })
    if(response.ok) {
        const userProfile: UserProfile | null = await response.json()
        setUser(userProfile)
        return
    }
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        actions: {
          login,
          logout: () => {}
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
