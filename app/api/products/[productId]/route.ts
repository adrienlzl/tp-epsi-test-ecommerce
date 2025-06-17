import type { NextRequest } from 'next/server'

// URL de ton JSON-Server (fallback si la var d’env n’est pas définie)
const API_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    // 1. await context.params
    const { productId } = await context.params;

    try {
        // 2. Appel vers ton JSON-Server
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
