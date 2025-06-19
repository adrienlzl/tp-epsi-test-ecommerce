"use client";

import React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/components/cart/cart-store";

import { Button } from "@/components/ui/button";
import {CartItem} from "@/lib/interfaces/cart.interface";

// Cellule pour modifier la quantité
const QuantityCell = ({ row }: { row: Row<CartItem> }) => {
    const { updateQuantity, items } = useCartStore();
    const id = row.original.id;
    const quantity = row.getValue<number>("quantity");

    const decreaseQuantity = () => {
        if (quantity > 1) updateQuantity(id, -1);
    };

    const increaseQuantity = () => {
        const product = items.find((item) => item.id === id);
        if (product) updateQuantity(id, 1);
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={decreaseQuantity} aria-label="Réduire quantité">
                <Minus className="cursor-pointer" />
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} aria-label="Augmenter quantité">
                <Plus className="cursor-pointer" />
            </button>
        </div>
    );
};

// Cellule pour supprimer un article
const DeleteItemCell = ({ row }: { row: Row<CartItem> }) => {
    const { removeItem } = useCartStore();
    const id = row.original.id;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(id)}
            aria-label="Supprimer l'article"
        >
            <Trash2 />
        </Button>
    );
};

// Définition des colonnes pour la DataTable
export const OrderColumns: ColumnDef<CartItem>[] = [
    {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => {
            const productImage = row.getValue<string>("image");
            const id = row.original.id;
            const name = row.getValue<string>("name");
            const slugName = name.toLowerCase().replace(/%/g, "percent");
            return (
                <Link href={`/product/${id}`} className="hover:underline">
                    {productImage && (
                        <Image
                            src={'/zoomLiquid.jpg'}
                            alt={`Image de ${name}`}
                            width={50}
                            height={50}
                            className="rounded-md"
                        />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Produit",
        cell: ({ row }) => <span>{row.getValue<string>("name")}</span>,
    },
    {
        accessorKey: "quantity",
        header: "Quantité",
        cell: ({ row }) => <QuantityCell row={row} />,
    },
    {
        accessorKey: "price",
        header: "Prix unitaire",
        cell: ({ row }) => {
            const price = row.getValue<number>("price");
            return <span>{price.toFixed(2)} €</span>;
        },
    },
    {
        accessorFn: (row) => row.price * row.quantity,
        id: "total",
        header: "Total",
        cell: ({ row }) => {
            const total = (row.getValue<number>("price") * row.getValue<number>("quantity"));
            return <span>{total.toFixed(2)} €</span>;
        },
    },
    {
        accessorKey: "deleteItem",
        header: "",
        cell: ({ row }) => <DeleteItemCell row={row} />,
    },
];
