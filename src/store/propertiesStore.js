import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePropertiesStore = create( persist((set, get) => ({
        property: null,
        setProperty: (property) => set({ property }),
        removeProperty: () => set({ property: null}),
        getProperty: () => get().property,
        }),
        {
        name: "properties",
        }
    )
);
