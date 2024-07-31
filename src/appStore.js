import { create } from "zustand";

export const appStore = create((set) => ({
    a: 0,
    b: 0,

    setA: (a) => set({ a }),
    setB: (b) => set({ b }),
}));