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
        <div className="bg-white">
            <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="w-fit ml-4 mt-6 text-sm text-gray-600 hover:text-black cursor-pointer"
            >
                ← Retour à la boutique
            </Button>
            <div className="flex mx-auto my-8 items-center justify-center">
                <h1 className="text-2xl font-bold">Choix du transporteur</h1>
            </div>
            <p className="pl-16">Poids total : {totalWeightKg.toFixed(2)} kg</p>

            {/* Transporteurs */}
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-16">
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
                                    <p className="text-sm">Jusqu&apos;à {carrier["max-weight"]} kg</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Paiement */}
            <div className="mt-8">
                <div className="flex mx-auto my-8 items-center justify-center">
                    <h1 className="text-2xl font-bold">Choix du moyen de paiement</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-16">
                    {paymentMethods.map((method) => {
                        const isSelected = method === selectedPaymentMethod;
                        return (
                            <Card
                                key={method}
                                className={`cursor-pointer border transition-shadow hover:shadow-lg text-center py-3 ${
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

            <div className="flex justify-center items-center gap-8 mt-8">
                {/* Bouton revenir à l'étape précédente */}
                <div className="flex justify-center mt-4 mb-12">
                    <Button
                        onClick={() => router.push("/commande")}
                        className="cursor-pointer"
                    >
                        Etape précédente
                    </Button>
                </div>

                {/* Bouton final */}
                <div className="flex justify-center mt-4 mb-12">
                    <Button
                        onClick={handlePushCommand}
                        disabled={!selectedCarrierId || !selectedPaymentMethod}
                        className="cursor-pointer disabled:cursor-not-allowed"
                    >
                        Passer la commande
                    </Button>
                </div>
            </div>
        </div>
    );
}
