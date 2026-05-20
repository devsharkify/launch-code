import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical, Zap, ArrowRight, ExternalLink, BookOpen, Brain, ChevronRight } from "lucide-react";

const FEATURED_PAPERS = [
  {
    title: "Scaling Laws for Neural Language Models (Kaplan et al., extended 2026)",
    authors: "Google DeepMind & Stanford",
    abstract: "Extends the original OpenAI scaling laws paper to verify that smooth power-law scaling persists at the 1T+ parameter scale. Key finding: emergent capabilities do not disrupt scaling curves — more compute still buys predictable, measurable gains.",
    venue: "arXiv 2026",
    tags: ["Scaling", "Foundation Models", "Compute"],
    days: 4,
    link: "https://arxiv.org",
    impact: "High",
  },
  {
    title: "Constitutional AI 2.0: Scalable Oversight via Debate",
    authors: "Anthropic",
    abstract: "Proposes a new training paradigm where AI systems critique each other's outputs using a constitutional set of principles. Reduces harmful output rates by 67% on red-team benchmarks vs RLHF baseline. Claude 4 training used a variant of this approach.",
    venue: "ICML 2026",
    tags: ["Alignment", "RLHF", "Safety"],
    days: 11,
    link: "https://arxiv.org",
    impact: "Very High",
  },
  {
    title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
    authors: "Princeton & Google DeepMind",
    abstract: "Presents a framework allowing LLMs to explore reasoning as tree search — generating multiple partial thoughts, evaluating them, and backtracking. Significant improvements on math, code, and creative writing tasks with GPT-4 and Gemini backends.",
    venue: "NeurIPS 2025",
    tags: ["Reasoning", "Prompting", "Chain of Thought"],
    days: 21,
    link: "https://arxiv.org",
    impact: "High",
  },
  {
    title: "VideoScore: Evaluating Video Generation via Multi-Dimensional Human Preferences",
    authors: "Google DeepMind",
    abstract: "A new automatic evaluation metric for video generation that correlates with human preferences across 5 dimensions: visual quality, motion smoothness, temporal consistency, prompt alignment, and physical plausibility. Used to rank Veo 3 above Sora.",
    venue: "CVPR 2026",
    tags: ["Video AI", "Evaluation", "Benchmarks"],
    days: 15,
    link: "https://arxiv.org",
    impact: "High",
  },
  {
    title: "SWE-bench Verified: A Reliable Benchmark for Software Engineering Agents",
    authors: "Princeton NLP & Meta AI",
    abstract: "Addresses contamination and ambiguity issues in the original SWE-bench. A human-verified subset of 500 real GitHub issues. Claude 4 Opus is the first model to exceed 90% on this new standard, with full end-to-end autonomous resolution.",
    venue: "arXiv 2026",
    tags: ["Agents", "Code", "Benchmarks"],
    days: 8,
    link: "https://arxiv.org",
    impact: "Very High",
  },
  {
    title: "Mixture of Experts at Scale: Efficiency Gains and Capability Ceilings",
    authors: "DeepSeek & Tsinghua University",
    abstract: "Systematically analyzes the tradeoffs in Mixture-of-Experts (MoE) architectures at the 600B+ parameter scale. Finds that per-token compute efficiency gains plateau around 8 experts per token — beyond which routing overhead dominates. DeepSeek R3's design reflects these findings.",
    venue: "ICLR 2026",
    tags: ["Architecture", "MoE", "Efficiency"],
    days: 29,
    link: "https://arxiv.org",
    impact: "High",
  },
];

const TOPICS = [
  { id: "alignment", label: "Alignment & Safety", count: 84, color: "#ec4899" },
  { id: "scaling", label: "Scaling Laws", count: 62, color: "#7c3aed" },
  { id: "agents", label: "Agentic Reasoning", count: 71, color: "#f97316" },
  { id: "multimodal", label: "Multimodal", count: 58, color: "#06b6d4" },
  { id: "video-gen", label: "Video Generation", count: 49, color: "#22c55e" },
  { id: "moe", label: "Mixture of Experts", count: 37, color: "#a78bfa" },
  { id: "rlhf", label: "RLHF / RLAIF", count: 43, color: "#f59e0b" },
  { id: "reasoning", label: "Chain of Thought", count: 55, color: "#e879f9" },
];

const LABS = [
  { name: "Anthropic", recent: 12, papers: "Constitutional AI, Alignment, Claude evals" },
  { name: "Google DeepMind", recent: 24, papers: "Gemini, Veo, AlphaCode, scaling" },
  { name: "OpenAI", recent: 18, papers: "GPT evals, RLHF, Sora, safety" },
  { name: "Meta AI", recent: 15, papers: "Llama, open-weight training, multimodal" },
  { name: "Microsoft Research", recent: 9, papers: "Phi, AutoGen, Semantic Kernel" },
  { name: "DeepSeek", recent: 7, papers: "MoE architectures, reasoning, efficiency" },
];

const IMPACT_COLORS = {
  "Very High": "#22c55e",
  "High": "#06b6d4",
  "Medium": "#f59e0b",
};

export default function ResearchPage() {
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(null);

  const filtered = activeTopic
    ? FEATURED_PAPERS.filter(p => p.tags.some(t => t.toLowerCase().includes(TOPICS.find(tp => tp.id === activeTopic)?.label.split(" ")[0].toLowerCase() || "")))
    : FEATURED_PAPERS;

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">

      {/* Hero */}
      <section className="border-b border-[#1a1a1a]">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <FlaskConical size={10} className="text-[#7c3aed]" />
              AI Research Coverage
            </span>
          </div>
          <h1 className="text-[32px] md:text-[52px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
            From arxiv to product.<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent">
              The papers that matter.
            </span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-[#737373] max-w-xl leading-relaxed mb-6">
            Alignment, scaling laws, agentic reasoning, video generation — we track the research that ends up in deployed models. Curated for builders, not academics.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/?cat=research")}
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
            >
              <Zap size={13} fill="white" /> Read Research news
            </button>
            <button
              onClick={() => navigate("/models")}
              className="inline-flex items-center gap-2 bg-[#111] border border-[#262626] hover:border-[#7c3aed]/40 text-[#a3a3a3] hover:text-[#f0f0f0] px-4 py-2 rounded-md text-[13px] font-medium transition-all"
            >
              Model Leaderboard <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a]">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-wrap gap-6 text-[13px]">
            <div><span className="font-bold text-[#f0f0f0] font-mono">1,240+</span> <span className="text-[#404040]">papers tracked in 2026</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">6</span> <span className="text-[#404040]">major labs monitored</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">8</span> <span className="text-[#404040]">research tracks</span></div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

        {/* Main */}
        <main>

          {/* Topic filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTopic(null)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all border ${!activeTopic ? "bg-[#7c3aed] text-white border-[#7c3aed]" : "bg-[#111] border-[#262626] text-[#737373] hover:border-[#404040]"}`}
            >
              All Topics
            </button>
            {TOPICS.slice(0, 5).map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(activeTopic === t.id ? null : t.id)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all border ${activeTopic === t.id ? "text-white border-transparent" : "bg-[#111] border-[#262626] text-[#737373] hover:border-[#404040]"}`}
                style={activeTopic === t.id ? { background: t.color, borderColor: t.color } : {}}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Papers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040]">Featured Papers</h2>
              <div className="flex-1 h-px bg-[#1f1f1f]" />
            </div>
            <div className="space-y-4">
              {(filtered.length > 0 ? filtered : FEATURED_PAPERS).map((paper, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/30 transition-colors group cursor-pointer"
                  onClick={() => navigate("/?cat=research")}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain size={14} className="text-[#7c3aed]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-[#404040]">{paper.days}d ago</span>
                        <span className="text-[#262626]">·</span>
                        <span className="text-[10px] text-[#737373]">{paper.venue}</span>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md" style={{ background: `${IMPACT_COLORS[paper.impact]}18`, color: IMPACT_COLORS[paper.impact] }}>
                          {paper.impact} Impact
                        </span>
                      </div>
                      <h3 className="text-[14px] font-bold text-[#f0f0f0] leading-snug group-hover:text-white transition-colors">
                        {paper.title}
                        <ChevronRight size={13} className="inline ml-1 text-[#333] group-hover:text-[#7c3aed] transition-colors align-middle" />
                      </h3>
                      <p className="text-[11px] text-[#404040] mt-0.5">{paper.authors}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#737373] leading-relaxed mb-3">{paper.abstract}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] border border-[#262626] text-[#737373]">{t}</span>
                      ))}
                    </div>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] text-[#404040] hover:text-[#7c3aed] transition-colors shrink-0 ml-3"
                    >
                      <BookOpen size={11} /> arXiv <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* Sidebar */}
        <aside className="space-y-5">

          {/* Research topics */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#1a1a1a]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0f0f0]">Research Topics</h3>
            </div>
            <div className="p-2">
              {TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(activeTopic === t.id ? null : t.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#111] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                    <span className="text-[12px] text-[#a3a3a3] group-hover:text-[#f0f0f0] transition-colors">{t.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#404040]">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Labs tracker */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#1a1a1a]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0f0f0]">Lab Activity</h3>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {LABS.map(l => (
                <div key={l.name} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[12px] font-semibold text-[#e5e5e5]">{l.name}</p>
                    <span className="text-[10px] font-mono text-[#7c3aed]">{l.recent} papers</span>
                  </div>
                  <p className="text-[10px] text-[#404040] leading-snug">{l.papers}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0d0d0d] border border-[#7c3aed]/20 rounded-xl p-4">
            <p className="text-[13px] font-semibold text-[#f0f0f0] mb-1">Stay on top of research</p>
            <p className="text-[12px] text-[#737373] mb-3">The Daily Digest covers the most important papers every morning.</p>
            <button
              onClick={() => navigate("/digest")}
              className="w-full py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-md text-[12px] font-semibold transition-all"
            >
              Read the Digest →
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
