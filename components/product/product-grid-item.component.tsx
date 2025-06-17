'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {Product} from "@/lib/interfaces/interface";
import Pagination from "@/components/product/pagination";


interface ProductGridItemsProps {
    products: Product[]
}

export default function ProductGridItems({ products }: ProductGridItemsProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 21

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * pageSize
    const visibleProducts = products.slice(startIndex, startIndex + pageSize)

    const breadcrumbLinks = [
        { label: 'Accueil', url: '/' },
        { label: 'Boutique', url: '/boutique' },
    ]

    if (visibleProducts.length === 0) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <p className="text-3xl my-12">Aucun produit disponible.</p>
                <Link href="/">
                    <span className="black-button mb-12 p-[15px]">Retour à la boutique</span>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col">


            {/* Grille produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-0 lg:ml-16 gap-4">
                {visibleProducts.map((product) => (
                    <div key={product.id} className="cursor-pointer">
                        <Link href={`/shop/${product.id}`}>
                            <div className="flex justify-center relative">
                                <Image
                                    src={'/zoomLiquid.jpg'}
                                    alt={product.name}
                                    height={300}
                                    width={400}
                                    className="brightness-90 hover:brightness-100 transition-all duration-300 hover:shadow-lg h-[300px] object-cover"
                                />
                            </div>
                            <p className="text-center pt-4 text-xl font-semibold">{product.name}</p>
                            <p className="text-center pt-2 text-lg">
                                {product.price.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: product.currency,
                                })}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
                <Pagination
                    items={products.length}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}
