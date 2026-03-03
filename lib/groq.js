import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeSentiment (movieTitle, plot, ratings) {
  const ratingsText = ratings?.map(r => `${r.Source}: ${r.Value}`).join(', ') || 'No ratings';
  
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',   // fastest Groq model
    messages: [
      {
        role: 'system',
        content: 'You are a film critic AI. Return ONLY valid JSON, no markdown, no extra text: {"summary": "2-3 sentence summary", "classification": "positive or mixed or negative"}'
      },
      {
        role: 'user',
        content: `Movie: "${movieTitle}"\nPlot: ${plot}\nRatings: ${ratingsText}\nReturn JSON only.`
      }
    ],
    temperature: 0.5,
    max_tokens: 200,
  });
  
  const raw = completion.choices[0]?.message?.content?.trim() || '';
  const clean = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}