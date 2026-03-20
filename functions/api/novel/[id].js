// GET /api/novel/:id
// Returns a single novel by its UUID
export async function onRequestGet({ env, params }) {
  try {
    const response = await fetch(
      `${env.SUPABASE_URL}/rest/v1/novels?id=eq.${params.id}&select=*`,
      {
        headers: {
          apikey: env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data[0] ?? null), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
