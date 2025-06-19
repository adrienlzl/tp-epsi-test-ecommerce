import {Address} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET() {
    const apiRes = await fetch(`${API_URL}/addresses`);

    if (!apiRes.ok) {
        return new Response(
            JSON.stringify({ erreur: 'Impossible de récupérer les adresses' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const adresses: Address[] = await apiRes.json();
    return new Response(
        JSON.stringify(adresses),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}