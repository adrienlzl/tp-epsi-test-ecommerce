const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/payments`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les paiements' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const paiements = await apiRes.json();
    return new Response(
        JSON.stringify(paiements),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}