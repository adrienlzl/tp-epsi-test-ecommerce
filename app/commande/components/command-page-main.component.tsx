"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "@/components/cart/cart-store";
import {Address, Order, OrderItem} from "@/lib/interfaces/interface";
import {DataTable} from "@/app/commande/components/simple-data-table.component";
import {OderColumns} from "@/app/commande/components/order-colums.component";



const DEFAULT_CARRIER_ID = "carrier-uuid-par-defaut";
const DEFAULT_PAYMENT_ID = "payment-uuid-par-defaut";

export default function CommandPageMainComponent() {
    const { items, clearCart } = useCartStore();
    const totalPrice = items.reduce((t, i) => t + i.price * i.quantity, 0);

    // Génération d'un customerId et d'un orderId
    const [customerId] = useState<string>(uuidv4());
    const [orderId] = useState<string>(uuidv4());

    // États pour les adresses
    const [billingAddress, setBillingAddress] = useState<Address>({
        id: uuidv4(),
        street: "",
        city: "",
        zipCode: "",
        country: "FR",
        addressType: "billing",
        userId: customerId,
    });
    const [useSameAddress, setUseSameAddress] = useState<boolean>(true);
    const [shippingAddress, setShippingAddress] = useState<Address>({
        id: uuidv4(),
        street: "",
        city: "",
        zipCode: "",
        country: "FR",
        addressType: "shipping",
        userId: customerId,
    });

    const handleConfirmOrder = async () => {
        try {
            if (items.length === 0) {
                throw new Error("Le panier est vide.");
            }

            // Si même adresse, on duplique les infos
            const finalShipping = useSameAddress
                ? { ...billingAddress, id: billingAddress.id, addressType: "shipping" as const }
                : shippingAddress;

            // Construction de l'objet Order
            const order: Order = {
                id: orderId,
                orderDate: new Date().toISOString(),
                status: "pending",
                customerId,
                shippingAddressId: finalShipping.id,
                billingAddressId: billingAddress.id,
                carrierId: DEFAULT_CARRIER_ID,
                paymentId: DEFAULT_PAYMENT_ID,
                orderTotal: Math.round(totalPrice),
            };

            // Construction des OrderItem
            const orderItems: OrderItem[] = items.map((item) => ({
                id: uuidv4(),
                orderId,
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.price,
                totalPrice: item.price * item.quantity,
            }));

            // Envoi au nouvel endpoint
            const payload = { order, addresses: [billingAddress, finalShipping], items: orderItems };
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la commande");
            }

            clearCart();
            // router.push('/commande/confirmation-client');
        } catch (error) {
            console.error(error);
            // Ici, vous pouvez afficher un message d'erreur ou un composant dédié
        }
    };

    return (
        <div className="flex flex-col bg-white mb-12">
            <div className="flex mx-auto my-20 items-center">
                <p className="tendre-black font-bold text-xl mx-4">
                    Finaliser votre commande en ligne
                </p>
                <Dialog>
                    <DialogTrigger>
                        <FontAwesomeIcon icon={faCircleInfo} className="p-1 rounded-full ml-2 text-[25px]" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-3xl md:text-5xl font-bold">
                                Notre engagement de livraison
                            </DialogTitle>
                            <p className="pt-6">Une fois votre commande validée :</p>
                            <p className="pt-4">Nous nous engageons à préparer votre commande en moins de 24 heures</p>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 mx-auto w-[70%]">
                <div>
                    <DataTable
                        columns={OderColumns}
                        data={items.map((item) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image || "",
                            variation: item.variation,
                        }))}
                    />
                </div>
                <Card className="w-[30%]">
                    <CardHeader>
                        <CardTitle className="mx-auto">Total de votre panier :</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col my-14">
                        <div className="flex justify-between">
                            <p>Total :</p>
                            <p className="font-bold">{totalPrice.toFixed(2)} €</p>
                        </div>
                        {/* Formulaire d'adresse */}
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Adresse de facturation</h3>
                            <input
                                type="text"
                                placeholder="Rue et numéro"
                                value={billingAddress.street}
                                onChange={(e) =>
                                    setBillingAddress({ ...billingAddress, street: e.target.value })
                                }
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Ville"
                                value={billingAddress.city}
                                onChange={(e) =>
                                    setBillingAddress({ ...billingAddress, city: e.target.value })
                                }
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Code postal"
                                value={billingAddress.zipCode}
                                onChange={(e) =>
                                    setBillingAddress({ ...billingAddress, zipCode: e.target.value })
                                }
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={useSameAddress}
                                    onChange={(e) => setUseSameAddress(e.target.checked)}
                                    id="same-address"
                                    className="mr-2"
                                />
                                <label htmlFor="same-address">
                                    Utiliser la même adresse pour la livraison
                                </label>
                            </div>
                            {!useSameAddress && (
                                <>
                                    <h3 className="font-bold mt-4 mb-2">Adresse de livraison</h3>
                                    <input
                                        type="text"
                                        placeholder="Rue et numéro"
                                        value={shippingAddress.street}
                                        onChange={(e) =>
                                            setShippingAddress({ ...shippingAddress, street: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ville"
                                        value={shippingAddress.city}
                                        onChange={(e) =>
                                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Code postal"
                                        value={shippingAddress.zipCode}
                                        onChange={(e) =>
                                            setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 border rounded"
                                    />
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center my-10">
                <Button onClick={handleConfirmOrder} className="mx-auto">
                    Confirmer la commande
                </Button>
            </div>
        </div>
    );
}
