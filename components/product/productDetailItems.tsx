'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/interfaces/interface'
import ProductQuantityComponent from '@/components/product/productQuantityComponent'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCartStore } from '@/components/cart/cart-store'

interface ProductDetailItemsProps {
    product: Product
}

export default function ProductDetailItems({ product }: ProductDetailItemsProps) {
    // Image principale et thumbnails
    const [mainImage, setMainImage] = useState<string>(
        product.images[0] ?? '/placeholder.png'
    )
    // Quantité sélectionnée
    const [quantity, setQuantity] = useState<number>(1)

    // Récupère la fonction addItem du store
    const addItem = useCartStore(state => state.addItem)

    // Prépare le payload à passer au store
    const cartPayload = {
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        image: product.images[0],
    }

    // Handler du clic “Ajouter au panier”
    const handleAddToCart = () => {
        addItem(cartPayload)
        toast.success('Article ajouté au panier !')  // Sonner toast
    }

    const thumbnailImages = product.images.slice(1)

    return (
        <div className="w-[90%] md:w-[70%] mx-auto mt-16 flex flex-col lg:flex-row gap-8">
            {/* --- Galerie d'images --- */}
            <div className="lg:w-1/2">
                <div className="relative w-full aspect-[3/4] mb-4">
                    <Image
                        src={'/zoomLiquid.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {thumbnailImages.map((url, i) => (
                        <button
                            key={i}
                            onClick={() => setMainImage(url)}
                            className={`relative aspect-square border-2 transition ${
                                mainImage === url ? 'border-primary' : 'border-transparent'
                            }`}
                        >
                            <Image
                                src={'/zoomLiquid.jpg'}
                                alt={`${product.name} vue ${i + 2}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Informations et actions --- */}
            <div className="lg:w-1/2 flex flex-col space-y-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>

                <p className="text-2xl font-semibold">
                    {product.price.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: product.currency,
                    })}
                </p>

                <p className="text-gray-700">{product.description_long}</p>

                <div className="space-y-1">
                    <p>
                        <span className="font-semibold">Stock :</span> {product.stock}
                    </p>
                    <p>
                        <span className="font-semibold">Catégorie :</span> {product.category}
                    </p>
                    <p>
                        <span className="font-semibold">Poids :</span> {product.weight} g
                    </p>
                </div>

                {/* Quantité */}
                <ProductQuantityComponent onQuantityChange={setQuantity} />

                {/* Bouton Ajouter au panier */}
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full mt-4"
                >
                    Ajouter au panier
                </Button>

                {/* Retour à la boutique */}
                <Link href="/">
          <span className="inline-block text-sm text-primary hover:underline mt-6">
            ← Retour à la boutique
          </span>
                </Link>
            </div>
        </div>
    )
}
