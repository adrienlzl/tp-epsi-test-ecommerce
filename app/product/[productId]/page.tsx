// app/product/[productId]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Product } from '@/lib/interfaces/interface'
import ProductDetailItems from '@/components/product/productDetailItems'

interface PageProps {
    // params est maintenant un Promise
    params: Promise<{ productId: string }>
}

export default async function PageProductDetailItem({ params }: PageProps) {
    // 🔑 On attend que params soit résolu
    const { productId } = await params

    // Récupération du produit
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        return notFound()
    }

    const product: Product = await res.json()
    if (!product) {
        return notFound()
    }

    return (
        <div className="px-6 lg:px-20 py-10">
            <ProductDetailItems product={product} />
            <div className="mt-8">
                <Link href="/">
          <span className="inline-block bg-black text-white py-2 px-4 rounded hover:opacity-80">
            ← Retour à la boutique
          </span>
                </Link>
            </div>
        </div>
    )
}
