import {create} from 'zustand'
import type { User } from '../types/use.types';

type AuthStore = {
  isAuthenticated: boolean
  user: User | null;
  accessToken: string|null;
  setAuth: (user: User , access_token: string ) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  setAuth: (user , accessToken) => 
    set({ isAuthenticated: true, user ,accessToken}),
  clearAuth: () => 
    set({ isAuthenticated: false , user: null , accessToken: null})
}))