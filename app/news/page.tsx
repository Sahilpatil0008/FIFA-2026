import Link from 'next/link';

export const metadata = {
  title: 'News | FIFA World Cup 2026',
};

const newsArticles = [
  { id: 1, title: "Mbappé & Griezmann Fire France Past Iraq in Group I", summary: "The Real Madrid star delivers a vintage performance as France dominate Iraq 2-0 to take control of Group I.", category: 'Results', time: '2h ago', sentiment: '😊', team: 'France', teamFlag: '🇫🇷' },
  { id: 2, title: "Messi Magic: Argentina Captain Inspires Win Over Jordan", summary: "The 38-year-old legend opens the scoring early as Argentina cruise to a 3-1 win over debutants Jordan in Group J.", category: 'Results', time: '5h ago', sentiment: '😊', team: 'Argentina', teamFlag: '🇦🇷' },
  { id: 3, title: "England Cruise Past Panama in Group L Opener", summary: "Bellingham orchestrates, Kane scores, and England look like serious contenders after a 3-0 win in their Group L opener.", category: 'Analysis', time: '8h ago', sentiment: '😊', team: 'England', teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 4, title: "Brazil's New Generation Shines: Vinícius Scores, Endrick Impresses", summary: "The Seleção's new-look attack featuring teenage sensation Endrick has tournament fans buzzing about Brazil's title chances after a 3-0 win over Haiti.", category: 'Analysis', time: '10h ago', sentiment: '😊', team: 'Brazil', teamFlag: '🇧🇷' },
  { id: 5, title: "Lamine Yamal at 18: Spain's Prodigy Runs World Cup Show", summary: "Born July 13, 2007 — the youngest player at this tournament has already registered 3 goals and 4 assists.", category: 'Feature', time: '12h ago', sentiment: '😊', team: 'Spain', teamFlag: '🇪🇸' },
  { id: 6, title: "Azteca Magic Returns: Mexico Open With a Win Over South Africa", summary: "The 87,000-capacity Azteca creates an electric atmosphere as El Tri begin Group A with a confident 2-0 victory.", category: 'Results', time: '1d ago', sentiment: '😊', team: 'Mexico', teamFlag: '🇲🇽' },
  { id: 7, title: "Musiala & Wirtz: Germany's Dream Midfield Partnership Clicks Into Gear", summary: "The Bayern-Leverkusen axis showed exactly why Germany are considered genuine title contenders after their dominant 3-0 win over Curaçao.", category: 'Analysis', time: '1d ago', sentiment: '😊', team: 'Germany', teamFlag: '🇩🇪' },
  { id: 8, title: "Modrić at 40: Croatia Legend Defies Time at His Fifth World Cup", summary: "Against all expectations, the Real Madrid midfielder continues to perform at the highest level for his nation.", category: 'Feature', time: '1d ago', sentiment: '😊', team: 'Croatia', teamFlag: '🇭🇷' },
  { id: 9, title: "Haaland's Brace Stuns Senegal: Norway Announce Themselves", summary: "On their return to the World Cup, Norway ride an Erling Haaland double to a statement 3-1 win over Senegal in Group I.", category: 'Analysis', time: '1d ago', sentiment: '😊', team: 'Norway', teamFlag: '🇳🇴' },
  { id: 10, title: "Türkiye Edge Australia: Montella's Dark Horses Make Group D Tricky", summary: "Vincenzo Montella's Türkiye side beat Australia 2-1 to throw down a marker in a competitive Group D alongside the USA.", category: 'Analysis', time: '2d ago', sentiment: '😊', team: 'Türkiye', teamFlag: '🇹🇷' },
  { id: 11, title: "Japan's Press Tactics: How Moriyasu's Side Causes Problems for Europe", summary: "Japan's high-press counter-attack system has tactical experts raving. Can they replicate their Germany-Spain heroics from 2022?", category: 'Tactics', time: '2d ago', sentiment: '😊', team: 'Japan', teamFlag: '🇯🇵' },
  { id: 12, title: "Ronaldo at 41: The Veteran's Final World Cup Dance", summary: "Cristiano Ronaldo has scored twice but the question remains: is this his last chance at the ultimate glory?", category: 'Feature', time: '2d ago', sentiment: '😐', team: 'Portugal', teamFlag: '🇵🇹' },
];

const categories = ['All', 'Results', 'Analysis', 'Tactics', 'Feature'];

export default function NewsPage() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
          <span>Tournament</span><span>/</span><span>News</span>
        </div>
        <h1 className="font-display text-5xl text-white mb-3">📰 News & Updates</h1>
        <p style={{ color: '#8899AA' }}>Latest news from FIFA World Cup 2026 · AI-powered summaries</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all" style={{
            background: cat === 'All' ? 'rgba(0,102,255,0.2)' : 'rgba(255,255,255,0.05)',
            border: cat === 'All' ? '1px solid rgba(0,102,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
            color: cat === 'All' ? 'var(--accent)' : '#8899AA'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      <div className="glass-card p-6 md:p-8 mb-8" style={{ borderTop: '3px solid var(--accent)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)', color: 'var(--accent)' }}>
            FEATURED
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8899AA' }}>
            {featured.category}
          </span>
          <span className="text-xl">{featured.teamFlag}</span>
          <span className="text-xs" style={{ color: '#8899AA' }}>{featured.time}</span>
          <span className="ml-auto">{featured.sentiment}</span>
        </div>
        <h2 className="font-display text-4xl text-white mb-3">{featured.title}</h2>
        <p className="text-lg leading-relaxed" style={{ color: '#8899AA' }}>{featured.summary}</p>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}>
            🤖 AI Summary
          </div>
          <span className="text-xs" style={{ color: '#8899AA' }}>Source: Sports news aggregated via AI</span>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map(article => (
          <div key={article.id} className="glass-card p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#8899AA' }}>{article.category}</span>
              <span className="text-lg">{article.teamFlag}</span>
              <span className="text-base">{article.sentiment}</span>
              <span className="ml-auto text-xs" style={{ color: '#8899AA' }}>{article.time}</span>
            </div>
            <h3 className="font-bold text-base leading-snug mb-2 flex-1">{article.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8899AA' }}>{article.summary}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(96,165,250,0.08)', color: '#60A5FA' }}>🤖 AI Summary</div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily AI Digest */}
      <div className="glass-card p-6 mt-8" style={{ borderTop: '2px solid rgba(96,165,250,0.3)' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤖</span>
          <div>
            <h2 className="font-display text-2xl text-white">Daily AI Briefing</h2>
            <p className="text-xs" style={{ color: '#8899AA' }}>Generated daily at 07:00 UTC</p>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p style={{ color: '#8899AA' }} className="leading-relaxed">
            <strong className="text-white">Morning, football fans!</strong> Day 9 of the World Cup and the tournament is delivering drama in spades.
          </p>
          <br />
          <p style={{ color: '#8899AA' }} className="leading-relaxed">
            <strong className="text-white">📊 Yesterday&apos;s headline:</strong> Spain lead Group H with a perfect record (6 points, 5 goals, 0 conceded) — they look frighteningly good. Lamine Yamal at 18 is producing performances that defy his age.
          </p>
          <br />
          <p style={{ color: '#8899AA' }} className="leading-relaxed">
            <strong className="text-white">🔥 Today to watch:</strong> Argentina vs Austria (Group J) is the match of the day — will Messi add to his tally? Germany vs Côte d&apos;Ivoire (Group E) is the tactical battle of the round.
          </p>
          <br />
          <p style={{ color: '#8899AA' }} className="leading-relaxed">
            <strong className="text-white">🏆 Title race:</strong> My top 5 — Spain (25%), France (22%), Brazil (18%), England (15%), Argentina (12%). The remaining 8% belongs to the dark horses.
          </p>
        </div>
        <Link href="/ai" className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-xl text-sm font-semibold transition-all" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}>
          Get Full AI Analysis →
        </Link>
      </div>
    </div>
  );
}
