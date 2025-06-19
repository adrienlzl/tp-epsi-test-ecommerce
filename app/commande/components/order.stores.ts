import { create } from "zustand";
import type { Order } from "@/lib/interfaces/interface";

interface OrderState {
    order: Order | null;
    setOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    order: null,
    setOrder: (order) => set({ order }),
}));