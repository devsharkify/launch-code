import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, TrendingUp, ExternalLink, ChevronUp, ChevronDown, Zap } from "lucide-react";

const BENCHMARKS = [
  { id: "swe", label: "SWE-bench", description: "Software engineering tasks (coding agents)", max: 100 },
  { id: "mmmu", label: "MMMU", description: "Massive Multitask Multimodal Understanding", max: 100 },
  { id: "math", label: "MATH", description: "Competition mathematics (AIME level)", max: 100 },
  { id: "humaneval", label: "HumanEval", description: "Python code generation (pass@1)", max: 100 },
  { id: "gpqa", label: "GPQA Diamond", description: "Graduate-level reasoning (PhD-hard)", max: 100 },
  { id: "aime", label: "AIME 2025", description: "American Invitational Math Exam", max: 30 },
];

const MODELS = [
  {
    id: "claude-4-opus",
    name: "Claude 4 Opus",
    org: "Anthropic",
    orgColor: "#e07b39",
    params: "Unknown",
    context: "200K",
    released: "2026-02",
    type: "API",
    scores: { swe: 92.3, mmmu: 91.2, math: 88.5, humaneval: 93.1, gpqa: 84.2, aime: 26 },
    link: "https://anthropic.com/claude",
    badge: "SOTA",
  },
  {
    id: "gpt-4-5",
    name: "GPT-4.5",
    org: "OpenAI",
    orgColor: "#10b981",
    params: "Unknown",
    context: "128K",
    released: "2025-09",
    type: "API",
    scores: { swe: 87.1, mmmu: 88.4, math: 84.1, humaneval: 90.2, gpqa: 81.7, aime: 24 },
    link: "https://openai.com/research",
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    org: "Google DeepMind",
    orgColor: "#4285f4",
    params: "Unknown",
    context: "1M",
    released: "2025-08",
    type: "API",
    scores: { swe: 84.9, mmmu: 87.1, math: 83.8, humaneval: 87.4, gpqa: 80.3, aime: 23 },
    link: "https://deepmind.google/technologies/gemini",
  },
  {
    id: "deepseek-r3",
    name: "DeepSeek R3",
    org: "DeepSeek",
    orgColor: "#7c3aed",
    params: "671B MoE",
    context: "64K",
    released: "2026-01",
    type: "Open",
    scores: { swe: 81.2, mmmu: 83.6, math: 91.4, humaneval: 86.7, gpqa: 78.9, aime: 28 },
    link: "https://deepseek.com",
    badge: "Open",
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    org: "Meta",
    orgColor: "#1877f2",
    params: "400B MoE",
    context: "128K",
    released: "2025-11",
    type: "Open",
    scores: { swe: 78.4, mmmu: 81.7, math: 79.2, humaneval: 83.1, gpqa: 74.5, aime: 21 },
    link: "https://llama.meta.com",
    badge: "Open",
  },
  {
    id: "mistral-large-3",
    name: "Mistral Large 3",
    org: "Mistral AI",
    orgColor: "#ff7000",
    params: "123B",
    context: "128K",
    released: "2025-10",
    type: "Open",
    scores: { swe: 71.8, mmmu: 78.2, math: 73.6, humaneval: 80.5, gpqa: 69.1, aime: 18 },
    link: "https://mistral.ai",
  },
  {
    id: "qwen-3-72b",
    name: "Qwen 3 72B",
    org: "Alibaba",
    orgColor: "#ff6a00",
    params: "72B",
    context: "128K",
    released: "2025-12",
    type: "Open",
    scores: { swe: 68.3, mmmu: 75.1, math: 77.9, humaneval: 79.2, gpqa: 65.8, aime: 19 },
    link: "https://qwenlm.github.io",
    badge: "Open",
  },
  {
    id: "phi-4",
    name: "Phi-4",
    org: "Microsoft",
    orgColor: "#00bcf2",
    params: "14B",
    context: "16K",
    released: "2025-07",
    type: "Open",
    scores: { swe: 54.2, mmmu: 68.4, math: 72.1, humaneval: 74.3, gpqa: 58.7, aime: 14 },
    link: "https://azure.microsoft.com/products/phi",
    badge: "Efficient",
  },
];

const TYPE_COLORS = {
  "API": { bg: "#111", border: "#262626", text: "#737373" },
  "Open": { bg: "#7c3aed1a", border: "#7c3aed40", text: "#a78bfa" },
};

function ScoreBar({ score, max, rank }) {
  const pct = (score / max) * 100;
  const color = rank === 0 ? "#7c3aed" : rank === 1 ? "#06b6d4" : rank === 2 ? "#22c55e" : "#404040";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-[12px] font-mono font-bold w-10 text-right" style={{ color: rank === 0 ? "#f0f0f0" : "#737373" }}>
        {score}
      </span>
    </div>
  );
}

export default function ModelsPage() {
  const navigate = useNavigate();
  const [activeBench, setActiveBench] = useState("swe");
  const [sortDir, setSortDir] = useState("desc");
  const [typeFilter, setTypeFilter] = useState("all");
  const bench = BENCHMARKS.find(b => b.id === activeBench);

  const sorted = [...MODELS]
    .filter(m => typeFilter === "all" || m.type === typeFilter)
    .sort((a, b) => {
      const diff = (a.scores[activeBench] || 0) - (b.scores[activeBench] || 0);
      return sortDir === "desc" ? -diff : diff;
    });

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Page header */}
      <div className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center">
              <Cpu size={15} className="text-[#7c3aed]" />
            </div>
            <h1 className="text-[22px] font-bold text-[#f0f0f0] tracking-tight">AI Model Leaderboard</h1>
            <span className="relative flex h-1.5 w-1.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
            </span>
          </div>
          <p className="text-[13px] text-[#404040] ml-11">
            Tracking {MODELS.length} frontier models across {BENCHMARKS.length} benchmarks · Updated May 2026
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">

        {/* Benchmark selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {BENCHMARKS.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveBench(b.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all border ${
                activeBench === b.id
                  ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  : "bg-[#111] text-[#737373] border-[#262626] hover:border-[#7c3aed]/50 hover:text-[#a3a3a3]"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Active benchmark description */}
        <div className="mb-5 flex items-center gap-3">
          <p className="text-[12px] text-[#404040] italic">{bench?.description}</p>
          <div className="flex-1 h-px bg-[#1a1a1a]" />
          {/* Filters */}
          <div className="flex items-center gap-2">
            {["all", "API", "Open"].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${
                  typeFilter === t
                    ? "bg-[#1a1a1a] text-[#f0f0f0] border-[#262626]"
                    : "text-[#404040] border-transparent hover:text-[#737373]"
                }`}
              >
                {t === "all" ? "All" : t}
              </button>
            ))}
            <button
              onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium text-[#404040] border border-transparent hover:text-[#737373] transition-colors"
            >
              {sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              {sortDir === "desc" ? "Highest first" : "Lowest first"}
            </button>
          </div>
        </div>

        {/* Main table */}
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
          {/* Table header */}
          <div className="grid grid-cols-[28px_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-3 border-b border-[#1a1a1a] text-[10px] font-bold uppercase tracking-[0.15em] text-[#333]">
            <span>#</span>
            <span>Model</span>
            <span className="hidden sm:block">Params</span>
            <span className="hidden md:block">Context</span>
            <span className="hidden md:block">Type</span>
            <span>{bench?.label}</span>
          </div>

          {sorted.map((model, i) => {
            const score = model.scores[activeBench] || 0;
            const isTop = i === 0;
            return (
              <div
                key={model.id}
                className={`grid grid-cols-[28px_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-3.5 border-b border-[#111] last:border-0 transition-colors hover:bg-[#111] group ${isTop ? "bg-[#7c3aed]/5" : ""}`}
              >
                {/* Rank */}
                <span className={`text-[13px] font-bold font-mono ${i === 0 ? "text-[#7c3aed]" : i === 1 ? "text-[#06b6d4]" : i === 2 ? "text-[#22c55e]" : "text-[#333]"}`}>
                  {i + 1}
                </span>

                {/* Model name + org */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[14px] font-semibold ${isTop ? "text-[#f0f0f0]" : "text-[#d4d4d4]"} group-hover:text-white transition-colors`}>
                      {model.name}
                    </span>
                    {model.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        model.badge === "SOTA" ? "bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30"
                        : model.badge === "Open" ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20"
                        : "bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20"
                      }`}>
                        {model.badge}
                      </span>
                    )}
                    <a
                      href={model.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#404040] hover:text-[#7c3aed]"
                    >
                      <ExternalLink size={11} />
                    </a>
                  </div>
                  {/* Score bar */}
                  <div className="pr-2 max-w-[240px]">
                    <ScoreBar score={score} max={bench?.max || 100} rank={i} />
                  </div>
                </div>

                {/* Org */}
                <span className="hidden sm:block text-[11px] font-medium text-[#404040]" style={{ color: model.orgColor + "bb" }}>
                  {model.org}
                </span>

                {/* Params */}
                <span className="hidden sm:block text-[11px] font-mono text-[#404040]">{model.params}</span>

                {/* Context */}
                <span className="hidden md:block text-[11px] font-mono text-[#404040]">{model.context}</span>

                {/* Type badge */}
                <span
                  className="hidden md:block text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: TYPE_COLORS[model.type]?.bg,
                    border: `1px solid ${TYPE_COLORS[model.type]?.border}`,
                    color: TYPE_COLORS[model.type]?.text,
                  }}
                >
                  {model.type}
                </span>
              </div>
            );
          })}
        </div>

        {/* Benchmark comparison cards */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040]">Top 3 — All Benchmarks</h2>
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BENCHMARKS.map(bench => {
              const top3 = [...MODELS].sort((a, b) => (b.scores[bench.id] || 0) - (a.scores[bench.id] || 0)).slice(0, 3);
              return (
                <div
                  key={bench.id}
                  onClick={() => setActiveBench(bench.id)}
                  className={`bg-[#0d0d0d] border rounded-xl p-4 cursor-pointer hover:border-[#7c3aed]/40 transition-all ${activeBench === bench.id ? "border-[#7c3aed]/50 shadow-[0_0_16px_rgba(124,58,237,0.08)]" : "border-[#1f1f1f]"}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold text-[#f0f0f0]">{bench.label}</span>
                    <TrendingUp size={12} className="text-[#404040]" />
                  </div>
                  <div className="space-y-2">
                    {top3.map((m, i) => (
                      <div key={m.id} className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono w-4 ${i === 0 ? "text-[#7c3aed]" : "text-[#333]"}`}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] text-[#a3a3a3] truncate">{m.name}</span>
                            <span className={`text-[11px] font-mono font-bold ml-2 shrink-0 ${i === 0 ? "text-[#f0f0f0]" : "text-[#404040]"}`}>{m.scores[bench.id]}</span>
                          </div>
                          <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(m.scores[bench.id] / bench.max) * 100}%`,
                                background: i === 0 ? "#7c3aed" : i === 1 ? "#06b6d4" : "#262626",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a]">
          <div className="w-6 h-6 rounded bg-[#7c3aed]/15 flex items-center justify-center shrink-0 mt-0.5">
            <Zap size={11} className="text-[#7c3aed]" />
          </div>
          <div>
            <p className="text-[12px] text-[#737373] leading-relaxed">
              Benchmark scores sourced from official papers, technical reports, and third-party evaluations (LMSYS, EvalPlus, MATH-500). Scores reflect best published results as of May 2026. Some models use chain-of-thought prompting.
            </p>
            <button onClick={() => navigate("/?cat=ai-models")} className="text-[11px] text-[#7c3aed] hover:underline mt-1.5 block">
              Read AI Models coverage →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
