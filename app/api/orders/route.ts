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

export async function POST(req: Request) {
    const body = await req.json();
    const upstream = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
    });
}