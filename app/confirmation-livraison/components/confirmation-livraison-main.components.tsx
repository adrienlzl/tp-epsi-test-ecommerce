"use client"

import {useUserStore} from "@/app/commande/components/user-store";
import {useOrderStore} from "@/app/commande/components/order.stores";


export default function ConfirmationLivraisonMainComponent() {
    const customer = useUserStore((s) => s.customer);
    const order = useOrderStore((s) => s.order)

    if (!customer) {
        return <p>Aucun client trouvé.</p>;
    }

    if (!order) {
        return <p>Aucune commande trouvée.</p>;
    }

    console.log("customer",customer)
    console.log("order", order)

    return (
        <>
        </>
    )
}