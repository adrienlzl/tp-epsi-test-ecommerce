"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import { motion } from "framer-motion";
import {useOrderStore} from "@/lib/store/order-stores";

export default function EndCommandeMainComponent() {
    const order = useOrderStore((s) => s.order);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
        >
            <Card className="max-w-md w-full text-center p-8 rounded-2xl shadow-xl bg-white">
                <CardHeader>
                    <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
                    <CardTitle className="text-2xl md:text-4xl font-bold">
                        Merci pour votre commande !
                    </CardTitle>
                    {order?.id && (
                        <CardDescription className="mt-2 text-gray-600">
                            Numéro de commande : <span className="font-mono text-gray-800">{order.id}</span>
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <p className="mt-4 text-gray-700">
                        Votre commande a bien été prise en compte. Nous vous enverrons une confirmation
                        par email sous peu. Vous pouvez suivre l’avancement de votre livraison dans votre
                        compte client.
                    </p>
                    <Button asChild className="mt-8 w-full" variant="secondary">
                        <Link href="/">Retour à l’accueil</Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
