import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;
