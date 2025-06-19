import {OrderItem} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/orderItems`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les éléments de commande' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const items: OrderItem[] = await apiRes.json();
    return new Response(
        JSON.stringify(items),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}

export async function POST(req: Request) {
    const body = await req.json();
    const upstream = await fetch(`${API_URL}/order-items`, {
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