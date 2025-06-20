import type { NextRequest } from 'next/server'

const API_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    const { productId } = await context.params;

    try {
        const apiRes = await fetch(`${API_URL}/products/${productId}`);
        if (apiRes.status === 404) {
            return new Response(
                JSON.stringify({ erreur: 'Produit non trouvé' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
        if (!apiRes.ok) {
            return new Response(
                JSON.stringify({ erreur: 'Erreur lors de la récupération du produit' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const product = await apiRes.json();
        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de contacter le serveur de données' }),
            { status: 502, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    // 1. On attend que params soit résolu
    const { productId } = await context.params;
    const { stockDelta } = await req.json();

    // 2. On appelle ton API externe pour récupérer l’état actuel du produit
    const getRes = await fetch(`${API_URL}/products/${productId}`);
    if (!getRes.ok) {
        return new Response(
            JSON.stringify({ erreur: "Impossible de récupérer le produit" }),
            { status: getRes.status, headers: { "Content-Type": "application/json" } }
        );
    }
    const product = await getRes.json();

    // 3. On met à jour le stock
    const newStock = (product.stock ?? 0) + stockDelta;
    const updateRes = await fetch(`${API_URL}/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
    });
    if (!updateRes.ok) {
        return new Response(
            JSON.stringify({ erreur: "Erreur lors de la mise à jour du stock" }),
            { status: updateRes.status, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}