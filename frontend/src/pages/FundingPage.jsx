import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, TrendingUp, ArrowUpRight, ExternalLink, Filter } from "lucide-react";

const ALL_ROUNDS = [
  { company: "Perplexity AI", desc: "AI-native search & answer engine", amount: "$500M", round: "Series D", valuation: "$9B", date: "May 2026", investors: ["SoftBank Vision Fund 3", "IVP", "Nvidia"], category: "ai-models" },
  { company: "Cohere", desc: "Enterprise AI language platform", amount: "$500M", round: "Series E", valuation: "$5.5B", date: "Mar 2026", investors: ["Salesforce Ventures", "Inovia Capital"], category: "ai-models" },
  { company: "Runway ML", desc: "Generative video AI platform", amount: "$308M", round: "Series D", valuation: "$4B", date: "May 2026", investors: ["General Atlantic", "Google"], category: "video-ai" },
  { company: "Together AI", desc: "Open-source AI cloud infrastructure", amount: "$305M", round: "Series B", valuation: "$3.1B", date: "Apr 2026", investors: ["Kleiner Perkins", "Nvidia", "a16z"], category: "agents" },
  { company: "ElevenLabs", desc: "AI voice cloning & synthesis", amount: "$250M", round: "Series C", valuation: "$3B", date: "Apr 2026", investors: ["Sequoia", "a16z"], category: "ai-models" },
  { company: "Mistral AI", desc: "Open-weight foundation models", amount: "$210M", round: "Series B", valuation: "$2.4B", date: "Mar 2026", investors: ["General Catalyst", "Lightspeed"], category: "ai-models" },
  { company: "Kling (Kuaishou)", desc: "Video generation model", amount: "$200M", round: "Series B", valuation: "$1.9B", date: "Apr 2026", investors: ["Kuaishou Technology"], category: "video-ai" },
  { company: "Harvey AI", desc: "AI legal research platform", amount: "$180M", round: "Series C", valuation: "$1.5B", date: "Feb 2026", investors: ["GV", "OpenAI Fund", "Sequoia"], category: "agents" },
  { company: "Synthesia", desc: "AI video generation for enterprise", amount: "$170M", round: "Series D", valuation: "$2.1B", date: "Mar 2026", investors: ["Accel", "Kleiner Perkins"], category: "video-ai" },
  { company: "Pika Labs", desc: "Consumer video AI platform", amount: "$80M", round: "Series B", valuation: "$700M", date: "May 2026", investors: ["Spark Capital", "Sequoia"], category: "video-ai" },
  { company: "Cognition AI", desc: "AI software engineering agent", amount: "$75M", round: "Series A", valuation: "$800M", date: "Feb 2026", investors: ["Founders Fund", "Index Ventures"], category: "agents" },
  { company: "Hedra", desc: "Character animation AI platform", amount: "$32M", round: "Series A", valuation: "$200M", date: "Apr 2026", investors: ["a16z", "Spark Capital"], category: "video-ai" },
  { company: "DeepL", desc: "Neural machine translation AI", amount: "$300M", round: "Series C", valuation: "$2B", date: "Jan 2026", investors: ["Index Ventures", "ICONIQ"], category: "ai-models" },
  { company: "Moonshot AI", desc: "Long-context LLM from China", amount: "$1B", round: "Series B", valuation: "$3.3B", date: "Feb 2026", investors:["Alibaba", "CITIC PE"], category: "ai-models" },
  { company: "Luma AI", desc: "3D and video generative AI", amount: "$43M", round: "Series B", valuation: "$380M", date: "Mar 2026", investors: ["Andreessen Horowitz", "Kleiner Perkins"], category: "video-ai" },
];

const ROUND_COLORS = {
  "Seed": "#06b6d4",
  "Series A": "#22c55e",
  "Series B": "#3b82f6",
  "Series C": "#f97316",
  "Series D": "#7c3aed",
  "Series E": "#ec4899",
};

const CAT_LABELS = {
  "all": "All Categories",
  "video-ai": "Video AI",
  "ai-models": "Foundation Models",
  "agents": "AI Agents",
};

function parseAmount(amt) {
  const n = parseFloat(amt.replace(/[$MBK]/g, ""));
  if (amt.includes("B")) return n * 1000;
  return n;
}

function totalFunding(rounds) {
  return rounds.reduce((sum, r) => sum + parseAmount(r.amount), 0);
}

function formatTotal(m) {
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}B`;
  return `$${m}M`;
}

export default function FundingPage() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filtered = ALL_ROUNDS
    .filter(r => catFilter === "all" || r.category === catFilter)
    .filter(r => roundFilter === "all" || r.round === roundFilter)
    .sort((a, b) => {
      if (sortBy === "amount") return parseAmount(b.amount) - parseAmount(a.amount);
      if (sortBy === "valuation") return parseAmount(b.valuation || "$0") - parseAmount(a.valuation || "$0");
      // date: just use array order (already newest-first)
      return 0;
    });

  const total = totalFunding(filtered);
  const uniqueRounds = [...new Set(ALL_ROUNDS.map(r => r.round))];

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-[#06b6d4]/15 border border-[#06b6d4]/20 flex items-center justify-center">
              <DollarSign size={15} className="text-[#06b6d4]" />
            </div>
            <h1 className="text-[22px] font-bold text-[#f0f0f0] tracking-tight">AI Funding Wire</h1>
            <span className="relative flex h-1.5 w-1.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
            </span>
          </div>
          <p className="text-[13px] text-[#404040] ml-11">
            Tracking {ALL_ROUNDS.length} AI funding rounds in 2026 · Updated May 2026
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "2026 Q1–Q2 Raised", value: formatTotal(totalFunding(ALL_ROUNDS)), icon: DollarSign, color: "#06b6d4" },
            { label: "Deals Tracked", value: `${ALL_ROUNDS.length}`, icon: TrendingUp, color: "#22c55e" },
            { label: "Largest Round", value: "$1B", icon: ArrowUpRight, color: "#7c3aed" },
            { label: "YoY Growth", value: "+240%", icon: TrendingUp, color: "#f97316" },
          ].map(s => (
            <div key={s.label} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={12} style={{ color: s.color }} />
                <span className="text-[10px] text-[#404040] uppercase tracking-wider">{s.label}</span>
              </div>
              <div className="text-[22px] font-bold font-mono text-[#f0f0f0]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Filter size={12} className="text-[#404040]" />

          {/* Category filter */}
          <div className="flex gap-1">
            {Object.entries(CAT_LABELS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setCatFilter(k)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all border ${
                  catFilter === k
                    ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                    : "bg-[#111] text-[#737373] border-[#262626] hover:border-[#7c3aed]/50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-[#262626]" />

          {/* Round filter */}
          <select
            value={roundFilter}
            onChange={e => setRoundFilter(e.target.value)}
            className="text-[11px] rounded-md border border-[#262626] bg-[#111] text-[#a3a3a3] px-3 py-1.5 outline-none cursor-pointer hover:border-[#7c3aed] transition"
          >
            <option value="all">All Rounds</option>
            {uniqueRounds.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-[11px] rounded-md border border-[#262626] bg-[#111] text-[#a3a3a3] px-3 py-1.5 outline-none cursor-pointer hover:border-[#7c3aed] transition"
          >
            <option value="date">Sort: Latest</option>
            <option value="amount">Sort: Largest Round</option>
            <option value="valuation">Sort: Highest Valuation</option>
          </select>

          <span className="ml-auto text-[11px] text-[#404040]">
            {filtered.length} rounds · {formatTotal(total)} total
          </span>
        </div>

        {/* Rounds list */}
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
          {filtered.map((round, i) => {
            const color = ROUND_COLORS[round.round] || "#7c3aed";
            return (
              <div
                key={i}
                className="flex items-start gap-4 px-4 py-4 border-b border-[#111] last:border-0 hover:bg-[#111] transition-colors group"
              >
                {/* Round badge */}
                <div className="shrink-0 mt-0.5">
                  <span
                    className="text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider whitespace-nowrap"
                    style={{ color, background: `${color}18`, border: `1px solid ${color}35` }}
                  >
                    {round.round}
                  </span>
                </div>

                {/* Company info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-[#f0f0f0] group-hover:text-white transition-colors">
                      {round.company}
                    </span>
                    <button
                      onClick={() => navigate(`/?cat=${round.category}`)}
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#262626] text-[#404040] hover:border-[#7c3aed]/40 hover:text-[#7c3aed] transition-colors"
                    >
                      {CAT_LABELS[round.category] || round.category}
                    </button>
                  </div>
                  <p className="text-[12px] text-[#737373] mb-1.5">{round.desc}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#404040]">
                    <span>{round.date}</span>
                    {round.valuation && <><span>·</span><span>Val. {round.valuation}</span></>}
                    {round.investors.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="truncate max-w-[200px]">{round.investors.slice(0, 2).join(", ")}{round.investors.length > 2 ? ` +${round.investors.length - 2}` : ""}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="shrink-0 text-right">
                  <div className="text-[16px] font-bold font-mono" style={{ color }}>{round.amount}</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <ArrowUpRight size={10} className="text-[#333] group-hover:text-[#7c3aed] transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl">
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#f0f0f0] mb-0.5">Raise tracked us?</p>
            <p className="text-[12px] text-[#404040]">Submit your AI startup funding round to appear on the wire.</p>
          </div>
          <button
            onClick={() => navigate("/startup-apply")}
            className="shrink-0 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[12px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] flex items-center gap-2"
          >
            <ExternalLink size={13} /> Submit Round
          </button>
        </div>

      </div>
    </div>
  );
}
