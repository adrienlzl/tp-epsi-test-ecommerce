export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    variantId?: string;
    variation?: string | { id: string; name: string; barcode: string };
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}
