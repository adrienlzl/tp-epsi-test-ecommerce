const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/products`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les produits' }),
            {
                status: 500,
                headers: { 'content-type': 'application/json' },
            }
        );
    }

    const produits = await apiRes.json();
    return new Response(
        JSON.stringify(produits),
        {
            status: 200,
            headers: { 'content-type': 'application/json' },
        }
    );
}