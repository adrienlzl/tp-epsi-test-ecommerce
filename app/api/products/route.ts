export async function GET() {
    console.log('→ JSON_SERVER_URL =', process.env.JSON_SERVER_URL);
    try {
        const apiRes = await fetch(`${process.env.JSON_SERVER_URL}/products`);
        console.log('→ fetch status:', apiRes.status);
        if (!apiRes.ok) {
            return new Response(
                JSON.stringify({ erreur: 'Impossible de récupérer les produits' }),
                { status: 500 }
            );
        }
        const produits = await apiRes.json();
        return new Response(JSON.stringify(produits), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (err) {
        console.error('Fetch error:', err);
        return new Response(
            JSON.stringify({ erreur: 'Erreur réseau vers JSON-Server' }),
            { status: 502 /* bad gateway */ }
        );
    }
}