"use client";

import React, { useState, useEffect } from "react";
import type { OrderInformation } from "@/lib/utils/order-information";
import type { Carrier } from "@/lib/interfaces/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";


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
            const totalGrams = info.cartItems.reduce<number>(
                (sum, item) => sum + ( (item.weight ?? 0) * item.quantity ),
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

    const selectedCarrier = carriers.find((c) => c.id === selectedCarrierId);
    const shippingPrice = selectedCarrier?.price ?? 0;
    const orderTotal = orderInfo?.order.orderTotal ?? 0;
    const finalTotal = orderTotal + shippingPrice;

    const handlePushCommand = async () => {
        if (!orderInfo) return;

        try {
            const { customer, addresses, order, orderItems } = orderInfo;

            const custRes = await fetch(`/api/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });
            if (!custRes.ok) throw new Error("Échec création customer");
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
            localStorage.removeItem("orderInformation");
            localStorage.removeItem("cart-storage");
            router.push("/fin-commande");
        } catch (err) {
            console.error("handlePushCommand:", err);
            // TODO: afficher un toast ou un message d'erreur à l'utilisateur
        }
    };

    if (!orderInfo) return <p>Chargement des informations...</p>;

    return (
        <div className="p-8 bg-white space-y-8">
            <h1 className="text-3xl font-bold">Confirmation de la livraison</h1>
            <Link href={"/commande"}>
            <Button variant="outline" className={"my-8 cursor-pointer"}>Retour à la page précédente</Button>
            </Link>
            <p className="text-gray-600">
                Poids total : <span className="font-semibold">{totalWeightKg.toFixed(2)} kg</span>
            </p>

            {/* Récapitulatif des prix */}
            <Card className="bg-gray-50">
                <CardContent className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                        <span>Total commande :</span>
                        <span className="font-bold">{orderTotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Frais de livraison :</span>
                        <span className="font-bold">
              {selectedCarrierId ? shippingPrice.toFixed(2) : "—"} €
            </span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span>Total à payer :</span>
                        <span className="font-bold">{finalTotal.toFixed(2)} €</span>
                    </div>
                </CardContent>
            </Card>

            {/* Transporteurs */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Choisissez un transporteur</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {availableCarriers.map((carrier) => {
                        const isSelected = carrier.id === selectedCarrierId;
                        return (
                            <Card
                                key={carrier.id}
                                className={`cursor-pointer border transition-shadow hover:shadow-lg p-4 text-sm ${
                                    isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-gray-200"
                                }`}
                                onClick={() => setSelectedCarrierId(carrier.id)}
                            >
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle className="text-base">{carrier.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-1">
                                    <p>{carrier.service_type}</p>
                                    <p>Jusqu&aposà {carrier["max-weight"]} kg</p>
                                    <p className="font-semibold">{carrier.price.toFixed(2)} €</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Paiement */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Moyen de paiement</h2>
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
                    className="mt-4 disabled:cursor-not-allowed"
                >
                    Passer la commande
                </Button>
            </div>
        </div>
    );
}
