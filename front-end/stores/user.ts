import { create } from "zustand";
const ambiente = import.meta.env.VITE_AMBIENTE_API;

interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  phone: string;
  warnings_preferences: string;
  role: string;
}

interface UserState {
  user: User | null;
  loanding: boolean;
  loadUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loanding: true,
  loadUser: async () => {
    try {
      const response = await fetch(`${ambiente}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar informações do usuário atual");
      }

      const user = await response.json();
      set({ user });
    } catch (error) {
      set({user: null})
      throw new Error("Erro ao buscar informações do usuário atual");
    } finally {
      set({ loanding: false });
    }
  },
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
