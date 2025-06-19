import {Product} from "@/lib/interfaces/interface";


export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error(`Produit ${id} introuvable (status ${res.status})`)
    }

    return res.json()
}