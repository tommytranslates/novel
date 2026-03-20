// GET /api/chapters/:novelId
// Returns all chapters for a given novel, ordered by chapter number
export async function onRequestGet({ env, params }) {
  try {
    const response = await fetch(
      `${env.SUPABASE_URL}/rest/v1/chapters?novel_id=eq.${params.novelId}&select=*&order=chapter_number.asc`,
      {
        headers: {
          apikey: env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
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
