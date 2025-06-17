import {Address} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const apiRes = await fetch(`${API_URL}/addresses/${params.id}`);

    if (apiRes.status === 404) {
        return new Response(
            JSON.stringify({ erreur: 'Adresse non trouvée' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const adresse: Address = await apiRes.json();
    return new Response(
        JSON.stringify(adresse),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}