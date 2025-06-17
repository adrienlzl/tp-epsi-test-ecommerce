import {Order} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/orders`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les commandes' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const commandes: Order[] = await apiRes.json();
    return new Response(
        JSON.stringify(commandes),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}