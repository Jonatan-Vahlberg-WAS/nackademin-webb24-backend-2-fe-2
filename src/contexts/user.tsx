"use client";

import AuthService from "@/utils/authService";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type UserState = {
  user: UserProfile | null;
  loading: boolean;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
};

const initialState: UserState = {
  user: null,
  loading: true,
  actions: {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {}
  },
};

const UserContext = createContext(initialState);

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(initialState.user);
  const [loading, setLoading] = useState(initialState.loading)

  useEffect(() => {
    _getUserProfile()
  },[])

  const _onSuccessAuth = () => {
    _getUserProfile()
  }

  const login: typeof initialState.actions.login = async (email, password) => {
    console.log("Login", email, password)
    const response = await new AuthService().login(email, password)
    if(response.ok) {
        _onSuccessAuth()
        return
    }
    //TODO HANDLE ERRORS
    console.log("RESPONSE", response)
  };

  const register: typeof initialState.actions.login = async (email, password) => {
    console.log("Register", email, password)
    const response = await new AuthService().register(email, password)
    if(response.ok) {
        _onSuccessAuth()
        return
    }
    //TODO HANDLE ERRORS
    console.log("RESPONSE", response)
  };

  const _getUserProfile = async () => {
    const response = await new AuthService().getUserProfile()
    if(response.ok) {
        const userProfile: UserProfile | null = await response.json()
        setUser(userProfile)
        setTimeout(() => setLoading(false), 200)
        return
    }
    setUser(null)
    setTimeout(() => setLoading(false), 200)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        actions: {
          login,
          register,
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
