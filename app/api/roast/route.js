import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { code, language, intensity } = await req.json();

    let systemPrompt = "";

    if (intensity === "cope") {
      systemPrompt = `
You are a delusional LinkedIn influencer.

Turn bad code into a motivational LinkedIn post.

Rules:
- Use corporate buzzwords
- Add 3–5 hashtags
- Pretend it's groundbreaking innovation
- Sound confident but ridiculous
- Add fake engagement bait tone
`;
    } else {
      systemPrompt = `
You are a brutally honest senior developer reviewing code.

Tone:
- Sarcastic, slightly toxic, but funny
- Uses real dev terminology
- Never polite

Roast intensity: ${intensity}

Rules:
- Roast naming, structure, logic
- Assume developer is overconfident
- Keep it short, punchy
- End with a savage one-liner
`;
    }

    const userPrompt = `
Language: ${language}

Code:
${code}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: intensity === "cope" ? 1 : 0.9,
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    return Response.json({ error: "Something broke." }, { status: 500 });
  }
}
