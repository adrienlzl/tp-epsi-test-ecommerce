const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/carriers`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les transporteurs' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const transporteurs = await apiRes.json();
    return new Response(
        JSON.stringify(transporteurs),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}