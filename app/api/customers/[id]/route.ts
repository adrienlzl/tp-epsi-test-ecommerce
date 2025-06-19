import {Customer} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const apiRes = await fetch(`${API_URL}/customers/${params.id}`);

    if (apiRes.status === 404) {
        return new Response(
            JSON.stringify({ erreur: 'Client non trouvé' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const client: Customer = await apiRes.json();
    return new Response(
        JSON.stringify(client),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}