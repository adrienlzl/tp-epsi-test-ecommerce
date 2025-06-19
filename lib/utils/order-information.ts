import type { Customer, Order, Address, OrderItem } from "@/lib/interfaces/interface";
import {CartItem} from "@/lib/interfaces/cart.interface";

export interface OrderInformation {
    customer: Customer;
    order: Order;
    addresses: Address[];
    orderItems: OrderItem[];
    cartItems: CartItem[];
}

export function buildOrderInformation(
    customer: Customer,
    order: Order,
    addresses: Address[],
    orderItems: OrderItem[],
    cartItems: CartItem[]
): OrderInformation {
    return { customer, order, addresses, orderItems, cartItems };
}

export function saveOrderInformation(info: OrderInformation) {
    try {
        localStorage.setItem("orderInformation", JSON.stringify(info));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde de orderInformation", e);
    }
}