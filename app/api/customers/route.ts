// import type { Customer } from "@/lib/interfaces/interface";

const API_URL = process.env.JSON_SERVER_URL!;

// GET /api/customers
export async function GET() {
    const upstream = await fetch(`${API_URL}/customers`);
    const text = await upstream.text();

    if (!upstream.ok) {
        return new Response(text, {
            status: upstream.status,
            headers: { "Content-Type": "text/plain" },
        });
    }

    // upstream.text() est déjà un JSON valide
    return new Response(text, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

// POST /api/customers
export async function POST(req: Request) {
    console.log("📩 Route POST /api/customers appelée");
    // 1. On lit le body JSON
    const body = await req.json();
    console.log("🔍 Body reçu :", body);

    // 2. On forwarde vers le JSON-Server
    const upstream = await fetch(`${API_URL}/customers`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
    });

    // 3. On lit toujours la réponse sous forme de texte
    const text = await upstream.text();

    // 4. En cas d’erreur upstream, on renvoie ce texte et le code identique
    if (!upstream.ok) {
        console.error("❌ Erreur proxy JSON Server :", upstream.status, text);
        return new Response(text, {
            status: upstream.status,
            headers: { "Content-Type": "text/plain" },
        });
    }

    // 5. Tout va bien, on renvoie le JSON tel quel
    return new Response(text, {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

// export async function POST(req: Request) {
//     console.log("✅ route API montée !");
//     return new Response(JSON.stringify({ ok: true }), {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//     });
// }
