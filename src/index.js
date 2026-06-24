export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response("Only POST allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const { text, language } = await request.json();

      const prompt = `
Translate the following text into ${language}.
Return ONLY the translation.

Text:
${text}
`;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            temperature: 0.5,
            max_tokens: 150,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log("OpenRouter response:", JSON.stringify(data));

      return Response.json(
        {
          translation:
            data.choices?.[0]?.message?.content ?? "",
        },
        {
          headers: corsHeaders,
        }
      );
    } catch (err) {
      return Response.json(
        {
          error: String(err),
        },
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  },
};