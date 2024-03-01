import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create( persist((set, get) => ({
      token: "",
      profile: null,
      isAuth: false,
      setProfile: (profile) => set({ profile }),
      setToken: (token) => set({
        token,
        isAuth: true,
      }),
      removeToken: () => set({ token: "" , isAuth: false}),
    }),
    {
      name: "auth",
    }
  )

);
