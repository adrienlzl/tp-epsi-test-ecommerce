
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {CartItem, CartState} from "@/lib/interfaces/cart.interface";

interface CartStore extends CartState {
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, increment: number) => void;
    clearCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? {...i, quantity: i.quantity + item.quantity}
                                    : i
                            ),
                        };
                    }
                    return {items: [...state.items, item]};
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, increment) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === id
                                ? {...item, quantity: Math.max(0, item.quantity + increment)}
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),
            clearCart: () => set({items: []}),
            setIsOpen: (isOpen) => set({isOpen}),
        }),
        {
            name: 'cart-storage',
        }
    )
);
