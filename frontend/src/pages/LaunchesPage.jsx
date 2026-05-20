import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ExternalLink, Calendar, TrendingUp, Cpu, Video, Bot, FlaskConical, Globe, DollarSign } from "lucide-react";

const TYPE_META = {
  model: { label: "Model Release", color: "#7c3aed", bg: "#7c3aed15" },
  api: { label: "API Update", color: "#06b6d4", bg: "#06b6d415" },
  product: { label: "Product Launch", color: "#22c55e", bg: "#22c55e15" },
  research: { label: "Research", color: "#f59e0b", bg: "#f59e0b15" },
  funding: { label: "Funding", color: "#ec4899", bg: "#ec489915" },
  open_source: { label: "Open Source", color: "#3b82f6", bg: "#3b82f615" },
};

const LAUNCHES = [
  {
    id: 1,
    name: "Claude 4 Opus",
    company: "Anthropic",
    date: "2026-05-15",
    type: "model",
    category: "ai-models",
    headline: "92.3% SWE-bench Verified — #1 coding model",
    metrics: ["92.3% SWE-bench", "Extended thinking", "200k context"],
    description: "Claude 4 Opus sets a new record on SWE-bench with 92.3% accuracy on real GitHub issues. Introduces hybrid reasoning with extended thinking mode.",
    url: "https://anthropic.com/news",
  },
  {
    id: 2,
    name: "Veo 3",
    company: "Google DeepMind",
    date: "2026-05-14",
    type: "model",
    category: "video-ai",
    headline: "Native audio + video generation in one pass",
    metrics: ["4K output", "Native audio", "120s max clip"],
    description: "Veo 3 introduces synchronized audio generation alongside video, eliminating the need for separate audio synthesis. 4K at 24fps.",
    url: "https://deepmind.google/discover/blog",
  },
  {
    id: 3,
    name: "Perplexity Series D",
    company: "Perplexity AI",
    date: "2026-05-12",
    type: "funding",
    category: "funding",
    headline: "$500M at $9B valuation — largest AI funding of Q2",
    metrics: ["$500M raised", "$9B valuation", "100M MAU"],
    description: "IVP led the round with participation from NEA. Perplexity plans to expand enterprise search and launch a mobile-first AI OS.",
    url: "https://techcrunch.com",
  },
  {
    id: 4,
    name: "Llama 4 Maverick",
    company: "Meta AI",
    date: "2026-05-10",
    type: "open_source",
    category: "ai-models",
    headline: "405B MoE model — beats GPT-4o on MMLU",
    metrics: ["405B parameters", "MoE architecture", "128k context"],
    description: "Meta releases Llama 4 Maverick under the Llama 4 Community License. The MoE design activates only 17B parameters per forward pass.",
    url: "https://huggingface.co/blog",
  },
  {
    id: 5,
    name: "GPT-5",
    company: "OpenAI",
    date: "2026-05-09",
    type: "model",
    category: "ai-models",
    headline: "Enterprise preview — 10x reasoning improvement claimed",
    metrics: ["o3 successor", "Enterprise preview", "Tool use v4"],
    description: "OpenAI begins limited enterprise preview of GPT-5. Early benchmarks show significant improvement on PhD-level science questions.",
    url: "https://openai.com/blog",
  },
  {
    id: 6,
    name: "Runway Gen-4",
    company: "Runway",
    date: "2026-05-08",
    type: "model",
    category: "video-ai",
    headline: "60s video at 4K, real-time motion control",
    metrics: ["60s clips", "4K resolution", "Real-time edit"],
    description: "Gen-4 introduces a latent motion editor allowing frame-level adjustments after generation. Trained on 3M curated cinematic shots.",
    url: "https://runwayml.com/blog",
  },
  {
    id: 7,
    name: "Gemini 2.5 Pro API",
    company: "Google",
    date: "2026-05-07",
    type: "api",
    category: "ai-models",
    headline: "GA release with 2M context, $1.25/M tokens",
    metrics: ["2M context", "$1.25/M tokens", "GA release"],
    description: "Gemini 2.5 Pro enters general availability. Now includes structured output, grounding with Google Search, and function calling v3.",
    url: "https://deepmind.google/discover/blog",
  },
  {
    id: 8,
    name: "DeepSeek R3",
    company: "DeepSeek",
    date: "2026-05-05",
    type: "open_source",
    category: "research",
    headline: "AIME 2025 champion — 28/30 at $5/M tokens",
    metrics: ["28/30 AIME", "$5/M tokens", "MIT license"],
    description: "DeepSeek R3 achieves record 28/30 on AIME 2025, beating o3 while costing 90% less. Released under MIT license.",
    url: "https://huggingface.co/blog",
  },
  {
    id: 9,
    name: "Mistral Large 3",
    company: "Mistral AI",
    date: "2026-05-03",
    type: "model",
    category: "ai-models",
    headline: "Function calling v3 + JSON mode at 30K tokens/sec",
    metrics: ["30K tokens/sec", "256k context", "$0.80/M tokens"],
    description: "Mistral Large 3 ships with a redesigned function calling API and massive inference speed improvements via speculative decoding.",
    url: "https://huggingface.co/blog",
  },
  {
    id: 10,
    name: "Stable Diffusion 4",
    company: "Stability AI",
    date: "2026-05-01",
    type: "open_source",
    category: "video-ai",
    headline: "Native video generation, 1B parameter image model",
    metrics: ["1B params", "Video + image", "Open weights"],
    description: "SD4 unifies image and video generation in a single architecture. Trains in 24 hours on a single A100 node via staged diffusion.",
    url: "https://huggingface.co/blog",
  },
  {
    id: 11,
    name: "Together AI Inference API",
    company: "Together AI",
    date: "2026-04-28",
    type: "api",
    category: "infra",
    headline: "Llama 4 at $0.18/M — cheapest open-model inference",
    metrics: ["$0.18/M tokens", "128 models", "99.9% SLA"],
    description: "Together launches serverless API with 128 open-source models. Llama 4 Maverick at $0.18/M tokens is now the cheapest available.",
    url: "https://venturebeat.com",
  },
  {
    id: 12,
    name: "ElevenLabs Series C",
    company: "ElevenLabs",
    date: "2026-04-25",
    type: "funding",
    category: "funding",
    headline: "$250M at $3B valuation — AI voice infrastructure",
    metrics: ["$250M raised", "$3B valuation", "1M+ creators"],
    description: "ElevenLabs is building AI voice infrastructure for developers. The round will accelerate its real-time conversational voice API.",
    url: "https://techcrunch.com",
  },
];

const FILTER_TYPES = [
  { value: "all", label: "All", icon: Zap },
  { value: "model", label: "Models", icon: Cpu },
  { value: "video-ai", label: "Video AI", icon: Video },
  { value: "open_source", label: "Open Source", icon: Globe },
  { value: "funding", label: "Funding", icon: DollarSign },
  { value: "research", label: "Research", icon: FlaskConical },
  { value: "api", label: "APIs", icon: Bot },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function daysAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff}d ago`;
}

function LaunchCard({ launch }) {
  const meta = TYPE_META[launch.type] || TYPE_META.model;
  return (
    <article className="group flex gap-4 p-4 rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] hover:border-[#7c3aed]/30 hover:bg-[#111] transition-all duration-200">
      {/* Left: type indicator */}
      <div className="shrink-0 flex flex-col items-center gap-2 pt-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: meta.bg, border: `1px solid ${meta.color}30` }}
        >
          <Zap size={13} style={{ color: meta.color }} />
        </div>
        <div className="w-px flex-1 bg-[#1a1a1a]" style={{ minHeight: "24px" }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ color: meta.color, background: meta.bg }}
            >
              {meta.label}
            </span>
            <span className="text-[11px] text-[#333] font-mono">{daysAgo(launch.date)}</span>
          </div>
          <a
            href={launch.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-[#333] hover:text-[#7c3aed] transition-colors"
          >
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="mb-1">
          <h3 className="text-[15px] font-bold text-[#f0f0f0] inline mr-2">{launch.name}</h3>
          <span className="text-[12px] text-[#555]">by {launch.company}</span>
        </div>

        <p className="text-[13px] text-[#7c3aed] font-medium mb-1.5">{launch.headline}</p>
        <p className="text-[12px] text-[#737373] leading-relaxed mb-3">{launch.description}</p>

        {/* Metrics chips */}
        <div className="flex flex-wrap gap-1.5">
          {launch.metrics.map((m, i) => (
            <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-[#111] border border-[#1f1f1f] text-[#a3a3a3] font-mono">
              {m}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function LaunchesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? LAUNCHES
    : LAUNCHES.filter(l => l.type === activeFilter || l.category === activeFilter);

  const thisWeek = filtered.filter(l => {
    const diff = (Date.now() - new Date(l.date)) / 86400000;
    return diff <= 7;
  });
  const older = filtered.filter(l => {
    const diff = (Date.now() - new Date(l.date)) / 86400000;
    return diff > 7;
  });

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded bg-[#7c3aed] flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)]">
              <Zap size={13} className="text-white" fill="white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7c3aed] font-mono">Launch Radar</span>
          </div>
          <h1 className="text-[32px] md:text-[38px] font-bold text-[#f0f0f0] tracking-tight leading-tight mb-2">
            AI Launch Radar
          </h1>
          <p className="text-[14px] text-[#737373] leading-relaxed">
            Every model release, API update, funding round, and product launch tracked in real time.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Tracked this month", value: LAUNCHES.length },
            { label: "Model releases", value: LAUNCHES.filter(l => l.type === "model").length },
            { label: "Funding events", value: LAUNCHES.filter(l => l.type === "funding").length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-3 text-center">
              <div className="text-[22px] font-bold text-[#f0f0f0] font-mono">{value}</div>
              <div className="text-[10px] text-[#404040] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTER_TYPES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                activeFilter === value
                  ? "bg-[#7c3aed] text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  : "bg-[#111] border border-[#1f1f1f] text-[#737373] hover:text-[#f0f0f0] hover:border-[#262626]"
              }`}
            >
              <Icon size={11} />
              {label}
            </button>
          ))}
        </div>

        {/* This week */}
        {thisWeek.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
                </span>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22c55e]">This Week</h2>
              </div>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="text-[11px] text-[#333] font-mono">{thisWeek.length} launches</span>
            </div>
            <div className="space-y-3">
              {thisWeek.map(l => <LaunchCard key={l.id} launch={l} />)}
            </div>
          </section>
        )}

        {/* Older */}
        {older.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#404040]">Earlier</h2>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>
            <div className="space-y-3">
              {older.map(l => <LaunchCard key={l.id} launch={l} />)}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <Zap size={32} className="text-[#333]" />
            <p className="text-[#555] text-[14px]">No launches matching this filter</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 border border-[#7c3aed]/20 bg-[#7c3aed]/5 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-[13px] font-bold text-[#f0f0f0] mb-0.5">Know of a launch we missed?</div>
            <p className="text-[12px] text-[#737373]">Submit a startup or AI product launch</p>
          </div>
          <button
            onClick={() => navigate("/startup-apply")}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all whitespace-nowrap hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
          >
            Submit →
          </button>
        </div>
      </div>
    </div>
  );
}
