import {Product} from "@/lib/interfaces/interface";
import StoreViewWrapper from "@/components/product/product-store-view-wrapper.component";


export default async function Page() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const res = await fetch(`${base}/api/products`, { cache: 'no-store' })

  console.log(res)
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des produits')
  }
  const produits: Product[] = await res.json()

  return <StoreViewWrapper products={produits} />
}
