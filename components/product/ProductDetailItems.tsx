'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Product} from "@/lib/interfaces/interface";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";



interface ProductDetailItemsProps {
    product: Product
}

export default function ProductDetailItems({ product }: ProductDetailItemsProps) {
    // Image principale et galerie
    const [mainImage, setMainImage] = useState<string>(
        product.images[0] ?? '/placeholder.png'
    )
    const imagesWithoutFirst = useMemo(() => product.images.slice(1), [product.images])

    // Fil d’Ariane
    const breadcrumbLinks = useMemo(
        () => [
            { label: 'Accueil', url: '/' },
            { label: 'Boutique', url: '/shop' },
            { label: product.name, url: `/shop/${product.id}` },
        ],
        [product.name, product.id]
    )

    return (
        <div className="w-[90%] md:w-[70%] mx-auto mt-[100px] flex flex-col lg:flex-row gap-8">
            {/* Section Images */}
            <div className="lg:w-1/2">
                <BreadcrumbComponent links={breadcrumbLinks} />

                {/* Image principale */}
                <div className="relative w-full aspect-[3/4] mb-4">
                    <Image
                        src={'/zoomLiquid.jpg'}
                        alt={`Image de ${product.name}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Galerie */}
                <div className="grid grid-cols-4 gap-2">
                    {imagesWithoutFirst.map((url, idx) => (
                        <button
                            key={idx}
                            onClick={() => setMainImage(url)}
                            className={`relative aspect-square border-2 transition ${
                                mainImage === url ? 'border-primary' : 'border-transparent'
                            }`}
                        >
                            <Image
                                src={'/zoomLiquid.jpg'}
                                alt={`${product.name} vue ${idx + 2}`}
                                fill
                                className="object-cover"
                                sizes="25vw"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Section Infos */}
            <div className="lg:w-1/2 flex flex-col space-y-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-semibold">
                    {product.price.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: product.currency,
                    })}
                </p>
                <p className="text-base text-gray-700">{product.description_long}</p>

                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">Réf produit :</span> {product.id}
                    </p>
                    <p>
                        <span className="font-semibold">Stock disponible :</span> {product.stock}
                    </p>
                    <p>
                        <span className="font-semibold">Catégorie :</span> {product.category}
                    </p>
                    <p>
                        <span className="font-semibold">Poids :</span> {product.weight} g
                    </p>
                </div>

                <Link href="/">
          <span className="inline-block bg-black text-white py-2 px-4 rounded hover:opacity-90">
            ← Retour à la boutique
          </span>
                </Link>
            </div>
        </div>
    )
}
