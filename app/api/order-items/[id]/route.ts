import {OrderItem} from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const apiRes = await fetch(`${API_URL}/orderItems/${params.id}`);

    if (apiRes.status === 404) {
        return new Response(
            JSON.stringify({ erreur: 'Élément de commande non trouvé' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const item: OrderItem = await apiRes.json();
    return new Response(
        JSON.stringify(item),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}