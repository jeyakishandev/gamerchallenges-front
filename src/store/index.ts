import { create } from 'zustand';
import { IUser } from '../@types';

interface AuthStore {
    token: string | null;
    user: IUser | null;
    login: (token: string, user: IUser) => void;
    logout: () => void;
}
const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    login: (token: string, user: IUser) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
  }));

export default useAuthStore;