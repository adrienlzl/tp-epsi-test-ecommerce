"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { OrderInformation } from "@/lib/utils/order-information";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Carrier} from "@/lib/interfaces/interface";

export default function ConfirmationLivraisonMainComponent() {
    const router = useRouter();
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

    // Récupérer OrderInformation depuis localStorage
    useEffect(() => {
        const stored = localStorage.getItem("orderInformation");
        if (stored) {
            const info: OrderInformation = JSON.parse(stored);
            setOrderInfo(info);

            // Calcul poids total en grammes puis conversion en kilos
            const totalGrams = info.orderItems.reduce((sum, item) => {
                const weight = (item as any).weight ?? 0;
                return sum + weight * item.quantity;
            }, 0);
            setTotalWeightKg(totalGrams / 1000);
        }
    }, []);

    // Charger les transporteurs
    useEffect(() => {
        fetch("/api/carriers")
            .then((res) => res.json())
            .then((data: Carrier[]) => setCarriers(data))
            .catch(console.error);
    }, []);

    // Filtrer selon le poids
    useEffect(() => {
        setAvailableCarriers(
            carriers.filter((c) => c["max-weight"] >= totalWeightKg)
        );
    }, [carriers, totalWeightKg]);


    // Handler temporaire
    const handlePasserCommande = () => {
        // TODO: implémenter l'appel final

        // Par exemple: router.push('/confirmation-finale');
    };

    return (
        <div className="p-8 bg-white">
            <h1 className="text-2xl font-bold mb-4">Confirmation de la livraison</h1>
            <p>Poids total&nbsp;: {totalWeightKg.toFixed(2)} kg</p>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Choisissez un transporteur</CardTitle>
                </CardHeader>
                <CardContent>
                    {availableCarriers.map((carrier) => (
                        <label
                            key={carrier.id}
                            className="flex items-start gap-3 mb-4"
                        >
                            <input
                                type="radio"
                                name="carrier"
                                value={carrier.id}
                                checked={selectedCarrierId === carrier.id}
                                onChange={() => setSelectedCarrierId(carrier.id)}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-medium">{carrier.name}</p>
                                <p className="text-sm">
                                    {carrier.service_type} - Jusqu'à {carrier["max-weight"]} kg
                                </p>
                            </div>
                        </label>
                    ))}
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Moyen de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                    {paymentMethods.map((method) => (
                        <label
                            key={method}
                            className="flex items-center gap-3 mb-4"
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={method}
                                checked={selectedPaymentMethod === method}
                                onChange={() => setSelectedPaymentMethod(method)}
                                className="mt-1"
                            />
                            <span>{method}</span>
                        </label>
                    ))}
                </CardContent>
            </Card>

            <Button
                onClick={handlePasserCommande}
                disabled={!selectedCarrierId || !selectedPaymentMethod}
                className="mt-6"
            >
                Passer la commande
            </Button>
        </div>
    );
}
