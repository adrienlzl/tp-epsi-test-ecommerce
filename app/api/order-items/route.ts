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