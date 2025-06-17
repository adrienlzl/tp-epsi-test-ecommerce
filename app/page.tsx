import {Product} from "@/lib/interfaces/interface";
import StoreViewWrapper from "@/components/product/product-store-view-wrapper.component";


export default async function Page() {
  const res = await fetch('/api/products', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des produits')
  }
  const produits: Product[] = await res.json()

  return <StoreViewWrapper products={produits} />
}
