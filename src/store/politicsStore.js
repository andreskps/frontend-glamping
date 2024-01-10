import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePoliticsStore = create( persist((set, get) => ({
        politics: [],
        setPolitics: (politics) => set({ politics }),
        getPolitics: () => get().politics,
        }),
        {
        name: "politics",
        }
    )
);
