'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const presets = [
  { icon: '🔮', label: 'Predict the winner', prompt: 'Who will win the FIFA World Cup 2026? Give me your top 5 predictions with probability percentages and reasoning.' },
  { icon: '⚽', label: 'Best XI so far', prompt: 'Who would be your best XI of the tournament so far? Pick the strongest starting lineup based on current performances.' },
  { icon: '🎯', label: 'Golden Boot prediction', prompt: 'Who will win the Golden Boot at WC 2026? Compare the top contenders and give probability estimates.' },
  { icon: '🧠', label: 'Biggest upset so far', prompt: 'What has been the biggest upset of the tournament so far? Analyze the shock results.' },
  { icon: '📊', label: 'Compare Messi vs Mbappé', prompt: 'Compare Lionel Messi and Kylian Mbappé\'s performances at WC 2026 with stats and analysis.' },
  { icon: '🏟️', label: 'Spain tactics breakdown', prompt: 'Break down Spain\'s tactical system at WC 2026 — formation, pressing style, key players and patterns.' },
];

export default function AIAnalystPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "⚽ **Welcome to the WC 2026 AI Analyst!**\n\nI'm your expert football analyst with access to all the tournament data. I can help you with:\n\n• **Match predictions** and tactical breakdowns\n• **Player analysis** — form, stats, impact\n• **Tournament predictions** — who wins the World Cup?\n• **Historical comparisons** and records\n\nWhat would you like to know? Try one of the quick questions below, or ask me anything!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-10),
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ I\'m having trouble connecting to the AI backend. Please make sure your Anthropic API key is configured in the environment variables. In the meantime, here are some quick facts:\n\n🏆 **Tournament leaders:** France (6 pts, Group C), Argentina (6 pts, Group B), Brazil (6 pts, Group G)\n\n⚽ **Top scorer:** Kylian Mbappé with 5 goals\n\n🎯 **Keep watching** — this tournament is just getting started!',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• /gm, '&bull; ')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tools</span><span>/</span><span>AI Analyst</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">🤖 AI Analyst</h1>
        <p style={{ color: '#8899AA' }}>Claude-powered football intelligence. Ask anything about WC 2026.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-5">
          <div className="glass-card p-5">
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-4" style={{ color: '#8899AA' }}>Quick Questions</h3>
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => sendMessage(preset.prompt)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5 flex items-center gap-3"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-lg shrink-0">{preset.icon}</span>
                  <span style={{ color: '#8899AA' }}>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5" style={{ borderTop: '2px solid rgba(96,165,250,0.3)' }}>
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-3" style={{ color: '#8899AA' }}>Powered By</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(96,165,250,0.1)' }}>🤖</div>
              <div>
                <div className="font-bold text-sm">Claude Sonnet</div>
                <div className="text-xs" style={{ color: '#8899AA' }}>Anthropic AI</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8899AA' }}>
              Context-aware football analysis with real-time tournament data integration
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="xl:col-span-3 flex flex-col">
          <div className="glass-card flex flex-col" style={{ height: '70vh', minHeight: 500 }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-1" style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.2)' }}>🤖</div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                    style={{
                      background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent), var(--accent))' : 'rgba(13,27,62,0.8)',
                      color: msg.role === 'user' ? '#0a0e1a' : 'white',
                      border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-1" style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.2)' }}>👤</div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.2)' }}>🤖</div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm" style={{ background: 'rgba(13,27,62,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#60A5FA', animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#60A5FA', animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#60A5FA', animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder="Ask anything about WC 2026... Who will win? Who's the best player?"
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                  disabled={loading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent))', color: '#0a0e1a' }}
                >
                  Send
                </button>
              </div>
              <p className="text-xs mt-2 text-center" style={{ color: '#8899AA' }}>
                Powered by Claude AI · Configure ANTHROPIC_API_KEY in .env.local to enable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
