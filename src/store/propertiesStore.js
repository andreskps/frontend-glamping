import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePropertiesStore = create( persist((set, get) => ({
        properties: [],
        property: null,
        setProperties: (properties) => set({ properties }),
        setProperty: (property) => set({ property }),
        removeProperty: () => set({ property: null}),
        }),
        {
        name: "properties",
        }
    )
);
