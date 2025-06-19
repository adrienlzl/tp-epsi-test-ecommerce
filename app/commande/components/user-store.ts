import { create } from "zustand";
import type { Customer } from "@/lib/interfaces/interface";

interface UserState {
    customer: Customer | null;
    setCustomer: (c: Customer) => void;
}

export const useUserStore = create<UserState>((set) => ({
    customer: null,
    setCustomer: (customer) => set({ customer }),
}));