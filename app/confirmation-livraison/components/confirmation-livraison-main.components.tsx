"use client";

import React, { useState, useEffect } from "react";
import type { OrderInformation } from "@/lib/utils/order-information";
import type { Carrier } from "@/lib/interfaces/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ConfirmationLivraisonMainComponent() {
    const [orderInfo, setOrderInfo] = useState<OrderInformation | null>(null);
    const [totalWeightKg, setTotalWeightKg] = useState<number>(0);
    const [carriers, setCarriers] = useState<Carrier[]>([]);
    const [availableCarriers, setAvailableCarriers] = useState<Carrier[]>([]);
    const [selectedCarrierId, setSelectedCarrierId] = useState<string>("");

    const paymentMethods = [
        "Carte Bancaire",
        "PayPal",
        "Virement Bancaire",
        "Apple Pay",
    ];
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

    const router = useRouter();
    // 1. Récupération de OrderInformation et calcul du poids
    useEffect(() => {
        const stored = localStorage.getItem("orderInformation");
        if (stored) {
            const info: OrderInformation = JSON.parse(stored);
            setOrderInfo(info);
            const totalGrams = info.cartItems.reduce(
                (sum, item) => sum + (item as any).weight * item.quantity,
                0
            );
            setTotalWeightKg(totalGrams / 1000);
        }
    }, []);

    // 2. Chargement des transporteurs
    useEffect(() => {
        fetch("/api/carriers")
            .then((res) => res.json())
            .then((data: Carrier[]) => setCarriers(data))
            .catch(console.error);
    }, []);

    // 3. Filtrage selon le poids
    useEffect(() => {
        setAvailableCarriers(
            carriers.filter((c) => c["max-weight"] >= totalWeightKg)
        );
    }, [carriers, totalWeightKg]);



    const handlePushCommand = async () => {
        if (!orderInfo) return;

        try {
            const { customer, addresses, order, orderItems } = orderInfo;


            const custRes = await fetch(`/api/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });
            if (!custRes.ok) {
                const errData = await custRes.json().catch(() => ({}));
                console.error("Erreur API /api/customers :", custRes.status, errData);
                throw new Error("Échec création customer");
            }
            // if (!custRes.ok) throw new Error("Échec création customer");
            const createdCustomer = await custRes.json();

            await Promise.all(
                addresses.map((addr) =>
                    fetch("/api/addresses", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...addr, userId: createdCustomer.id }),
                    })
                )
            );

            const orderPayload = {
                ...order,
                customerId: createdCustomer.id,
                carrierId: selectedCarrierId,
                paymentId: selectedPaymentMethod,
            };
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });
            if (!orderRes.ok) throw new Error("Échec création order");
            const createdOrder = await orderRes.json();

            await Promise.all(
                orderItems.map((oi) =>
                    fetch("/api/order-items", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...oi, orderId: createdOrder.id }),
                    })
                )
            );

            await Promise.all(
                orderItems.map((oi) =>
                    fetch(`/api/products/${oi.productId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ stockDelta: -oi.quantity }),
                    })
                )
            );

            router.push("/fin-commande");
        } catch (err) {
            console.error("handlePushCommand:", err);
            // TODO: afficher un toast ou un message d'erreur à l'utilisateur
        }
    };

    if (!orderInfo) return <p>Chargement des informations...</p>;

    return (
        <div className="p-8 bg-white">
            <h1 className="text-2xl font-bold mb-4">Confirmation de la livraison</h1>
            <p>Poids total : {totalWeightKg.toFixed(2)} kg</p>

            {/* Transporteurs */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Choisissez un transporteur</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableCarriers.map((carrier) => {
                        const isSelected = carrier.id === selectedCarrierId;
                        return (
                            <Card
                                key={carrier.id}
                                className={`cursor-pointer border transition-shadow hover:shadow-lg ${
                                    isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-gray-200"
                                }`}
                                onClick={() => setSelectedCarrierId(carrier.id)}
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg">{carrier.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm mb-1">{carrier.service_type}</p>
                                    <p className="text-sm">Jusqu'à {carrier["max-weight"]} kg</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Paiement */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Moyen de paiement</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => {
                        const isSelected = method === selectedPaymentMethod;
                        return (
                            <Card
                                key={method}
                                className={`cursor-pointer border transition-shadow hover:shadow-lg text-center py-4 ${
                                    isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-gray-200"
                                }`}
                                onClick={() => setSelectedPaymentMethod(method)}
                            >
                                <CardContent>
                                    <p className="font-medium">{method}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Bouton final */}
            <div className="flex justify-center">
                <Button
                    onClick={handlePushCommand}
                    disabled={!selectedCarrierId || !selectedPaymentMethod}
                    className="mt-8 cursor-pointer disabled:cursor-not-allowed"
                >
                    Passer la commande
                </Button>
            </div>
        </div>
    );
}
