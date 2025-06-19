import {Customer} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/customers`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les clients' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const clients: Customer[] = await apiRes.json();
    return new Response(
        JSON.stringify(clients),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}