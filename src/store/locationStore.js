import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useLocationStore = create( persist((set, get) => ({
        location: {},
        setLocation: (location) => set({ location }),
        getLocation: () => get().location,
        }),
        {
        name: "location",
        }
    )
);