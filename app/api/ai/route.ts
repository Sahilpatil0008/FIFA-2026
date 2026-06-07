import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';

const TOURNAMENT_CONTEXT = `
FIFA World Cup 2026 - Current Status (June 2026):
- Tournament: Group Stage in progress (Matchday 2)
- Host countries: USA, Canada, Mexico
- 48 teams, 104 matches, 16 venues
- Tournament runs: June 11 - July 19, 2026
- Final venue: MetLife Stadium, New Jersey

Current Group Standings (after 2 matches each):
Group A: Mexico 6pts, Korea Republic 3pts, South Africa 3pts, Czechia 0pts
Group B: Switzerland 6pts, Canada 3pts, Qatar 3pts, Bosnia and Herzegovina 0pts
Group C: Brazil 6pts, Morocco 4pts, Scotland 1pt, Haiti 0pts
Group D: USA 6pts, Türkiye 3pts, Australia 3pts, Paraguay 0pts
Group E: Germany 6pts, Côte d'Ivoire 4pts, Ecuador 1pt, Curaçao 0pts
Group F: Netherlands 6pts, Japan 3pts, Sweden 3pts, Tunisia 0pts
Group G: Belgium 4pts, Egypt 4pts, Iran 1pt, New Zealand 1pt
Group H: Spain 6pts, Uruguay 4pts, Saudi Arabia 1pt, Cabo Verde 0pts
Group I: France 6pts, Norway 3pts, Senegal 3pts, Iraq 0pts
Group J: Argentina 6pts, Austria 4pts, Algeria 1pt, Jordan 0pts
Group K: Portugal 6pts, Colombia 3pts, Uzbekistan 3pts, DR Congo 0pts
Group L: England 6pts, Croatia 4pts, Ghana 1pt, Panama 0pts

Top Scorers: Mbappé (France) 5, Messi (Argentina) 4, Vinícius Júnior (Brazil) 4, Bellingham (England) 3, Lamine Yamal (Spain) 3
Key Results: Brazil beat Haiti 3-0, Spain beat Cabo Verde 3-0, England beat Panama 3-0, Argentina beat Jordan 3-1, Germany beat Curaçao 3-0, France beat Iraq 2-0, Norway beat Senegal 3-1 (Haaland brace)
`;

const SYSTEM_PROMPT = `You are an elite FIFA World Cup 2026 analyst. You are sharp, data-driven, and engaging, providing expert football analysis with specific statistics and confident predictions.

Current tournament data:
${TOURNAMENT_CONTEXT}

Guidelines:
- Reference specific players, teams, and stats from the data above.
- When asked for predictions, give probability percentages (Home Win % / Draw % / Away Win %) and a predicted scoreline.
- Use football terminology appropriately.
- Format responses with **bold** for key points and bullet points for lists.
- Be concise but insightful — aim for under 400 words unless asked for detailed analysis.
- Use relevant emojis (⚽🏆📊🎯) sparingly to keep responses engaging.`;

const OFFLINE_RESPONSE =
  "⚠️ **AI Analyst Offline**\n\nTo enable AI analysis, add your Anthropic API key to `.env.local`:\n```\nANTHROPIC_API_KEY=your-key-here\n```\n\nGet your key at console.anthropic.com\n\n**Meanwhile, here's what I know:**\n\n🏆 **Tournament leaders:** France, England, Brazil, Spain & Argentina all on 6 pts\n\n⚽ **Top scorer:** Kylian Mbappé with 5 goals\n\n📊 **Most impressive:** Spain — 5 goals scored, 0 conceded through 2 games";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  let message: string;
  let history: ChatMessage[] = [];

  try {
    const body = await request.json();
    message = typeof body.message === 'string' ? body.message.trim() : '';
    if (Array.isArray(body.history)) {
      history = body.history
        .filter(
          (m: unknown): m is ChatMessage =>
            !!m &&
            typeof (m as ChatMessage).content === 'string' &&
            ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant'),
        )
        .slice(-10);
    }
  } catch {
    return NextResponse.json({ response: 'Invalid request body.' }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ response: 'Please enter a question.' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Graceful, non-error fallback so the UI always has something to show.
    return NextResponse.json({ response: OFFLINE_RESPONSE });
  }

  const client = new Anthropic({ apiKey });

  // Conversation history is already in alternating user/assistant order; the
  // latest user turn is appended last.
  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: message },
  ];

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      thinking: { type: 'adaptive' },
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    return NextResponse.json({ response: text || 'No response generated. Please try rephrasing.' });
  } catch (error) {
    console.error('AI API error:', error);

    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { response: '⚠️ The configured Anthropic API key is invalid. Please check `ANTHROPIC_API_KEY`.' },
        { status: 500 },
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { response: '⏳ The AI is handling a lot of requests right now. Please try again in a few seconds.' },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { response: '⚠️ The AI service returned an error. Please try again shortly.' },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { response: '⚠️ AI service temporarily unavailable. Please try again later.' },
      { status: 500 },
    );
  }
}
