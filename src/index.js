export default {
	async fetch(request, env) {

		try {
		if (request.method !== "POST") {
			return new Response("Method not allowed", { status: 405});
		}

		const { text, language } =
		   await request.json();

		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "openai/gpt-oss-120b:free",
					temperature: 0.5,
					max_tokens: 100,
					messages: [
						{
							role: "system",
							content: "You are a translator. Only return translated text.",
						},
						{
							role: "user",
							content: `Translate "${text}" into ${language}.`,
						},
					],
				}),
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			return Response.json(
				{
					error: "OpenRouter API failed",
					details: errorText,
				},
				{ status: 500 }
			);
		}

		const data = await response.json();

		console.log(JSON.stringify(data, null, 2));

		const translation = data?.choices?.[0]?.message?.content;

		if (!translation) {
			return Response.json(
				{
					error: "No translation returned",
					raw: data,
				},
				{ status: 500 }
			);
		}

		return Response.json({
			translation,
		});

	} catch (err) {
		return Response.json(
			{
				error: "Worker crashed",
				message: err.message,
			},
			{ status: 500 }
		);
	  }
	},
};