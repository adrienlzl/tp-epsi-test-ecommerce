// components/cart/CartItem.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CartItem as CartItemType } from '@/lib/interfaces/cart.interface';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import {Product} from "@/lib/interfaces/interface";
import {getProductById} from "@/lib/queries/product";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, increment: number) => void;
}

export function CartItem({ item, onUpdateQuantity }: CartItemProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    // Récupère les détails du produit (notamment le stock)
    const { data: product, isLoading, error } = useQuery<Product, Error>({
        queryKey: ['product', item.id],
        queryFn: () => getProductById(item.id),
        refetchInterval: 30_000,
        retry: 2,
    });

    const availableStock = product?.stock;

    const handleQuantityUpdate = async (increment: number) => {
        const newQuantity = item.quantity + increment;
        if (newQuantity < 0) return;

        if (availableStock !== undefined && newQuantity > availableStock) {
            toast.warning(`Stock insuffisant : il reste ${availableStock} unité(s).`);
            return;
        }

        setIsUpdating(true);
        try {
            onUpdateQuantity(item.id, increment);
        } catch {
            toast.error("Impossible de mettre à jour la quantité");
        } finally {
            setIsUpdating(false);
        }
    };

    const isDisabled = isUpdating || isLoading;
    const reachedStockLimit =
        availableStock !== undefined && item.quantity >= availableStock;

    if (error) {
        toast.error("Impossible de vérifier le stock disponible");
    }

    return (
        <div className="flex w-full flex-col sm:flex-row items-center space-x-4 p-4 border rounded-lg">
            {/* Image et infos produit */}
            <div className="flex items-center">
                {item.image && (
                    <Image
                        src={'/zoomLiquid.jpg'}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                    />
                )}
                <div className="ml-4">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm">{item.price.toFixed(2)} €</p>
                    {availableStock !== undefined && (
                        <p className="text-xs text-gray-400">
                            {availableStock} unité(s) en stock
                        </p>
                    )}
                </div>
            </div>

            {/* Contrôle de quantité */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityUpdate(-1)}
                    disabled={isDisabled || item.quantity <= 1}
                    className="relative"
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <span className="w-8 text-center">
          {isUpdating ? '...' : item.quantity}
        </span>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityUpdate(1)}
                    disabled={isDisabled || reachedStockLimit}
                    className="relative"
                >
                    <Plus className="h-4 w-4" />
                </Button>

                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleQuantityUpdate(-item.quantity)}
                    disabled={isDisabled}
                    className="relative"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
