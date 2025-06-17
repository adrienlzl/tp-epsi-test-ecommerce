import Link from 'next/link'
import { notFound } from 'next/navigation'


interface PageProps {
    params: { productId: string }
}

export default async function PageProductDetailItem({ params }: PageProps) {
    const { productId } = params

    // 1. On récupère le produit directement via son ID
    const product = await fetch('http://localhost:3000/api/product/' + productId);

    // 2. Si pas trouvé, on affiche la page 404 Next.js
    if (!product) {
        notFound()
    }

    // 3. Sinon on affiche le composant de détail
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