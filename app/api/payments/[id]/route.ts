const API_URL = process.env.JSON_SERVER_URL!;

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const apiRes = await fetch(`${API_URL}/payments/${params.id}`);

    if (apiRes.status === 404) {
        return new Response(
            JSON.stringify({ erreur: 'Paiement non trouvé' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const paiement = await apiRes.json();
    return new Response(
        JSON.stringify(paiement),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}