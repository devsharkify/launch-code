import { useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, Globe, Cpu, Video, DollarSign, FlaskConical, Bot } from "lucide-react";

const COVERAGE = [
  { icon: Cpu, label: "Foundation Models", desc: "GPT, Claude, Gemini, Llama — benchmarks, capabilities, and what ships next." },
  { icon: Video, label: "Video AI", desc: "Sora, Runway, Pika, Kling — the companies racing to own generative video." },
  { icon: DollarSign, label: "AI Funding", desc: "Seed to Series D — every round, every valuation, every strategic bet." },
  { icon: Bot, label: "AI Agents", desc: "Agentic workflows, autonomous systems, and the infrastructure enabling them." },
  { icon: FlaskConical, label: "Research", desc: "Arxiv-to-product pipelines, open-source breakthroughs, and lab leaks." },
  { icon: Globe, label: "Global AI", desc: "DeepSeek, Mistral, startups outside the Valley — the global intelligence race." },
];

const PRINCIPLES = [
  {
    title: "Signal, not noise",
    body: "Every headline in the WIRE ticker and every article in the feed is curated for AI builders, investors, and researchers. No lifestyle fluff, no vague 'AI is transforming X' takes.",
  },
  {
    title: "Primary sources",
    body: "We pull from funding filings, API changelogs, benchmark papers, and founders themselves — not secondary press release rewrites.",
  },
  {
    title: "Independent",
    body: "LaunchCode has no strategic investors in the companies we cover. Our editorial decisions are never influenced by paid placements or portfolio conflicts.",
  },
];

const STATS = [
  { value: "2,400+", label: "AI Funding Rounds Tracked" },
  { value: "340+", label: "Models Benchmarked" },
  { value: "180K", label: "Daily Readers" },
  { value: "620+", label: "Video AI Startups" },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[12px] text-[#404040] hover:text-[#7c3aed] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          Back to feed
        </button>

        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Zap size={20} className="text-white" fill="white" />
            </div>
            <span className="font-mono text-[22px] font-bold text-[#f0f0f0] tracking-tight">
              Launch<span className="text-[#7c3aed]">Code</span>
            </span>
          </div>
          <div className="w-12 h-[3px] rounded mb-6 bg-[#7c3aed]" />
          <p className="text-[28px] sm:text-[34px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
            The world's AI is moving fast.<br />
            <span className="text-[#7c3aed]">Stay ahead of it.</span>
          </p>
          <p className="text-[15px] leading-relaxed text-[#737373] mt-4">
            LaunchCode is the intelligence briefing for AI builders, investors, and researchers. We track foundation models, video AI, autonomous agents, and the funding that powers them — all in one dark, dense, no-noise feed.
          </p>
          <p className="text-[15px] leading-relaxed text-[#737373] mt-3">
            We built LaunchCode because the AI space moves at a pace that breaks traditional news cycles. By the time a weekly newsletter lands, three more models have dropped, two more mega-rounds have closed, and at least one benchmark has been obliterated. This feed is always on.
          </p>
        </header>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 text-center">
                <div className="text-[22px] font-bold font-mono text-[#f0f0f0] mb-1">{s.value}</div>
                <div className="text-[10px] text-[#404040] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What we cover */}
        <section className="mb-12">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040] mb-5 flex items-center gap-3">
            Coverage
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERAGE.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/40 transition-colors">
                <div className="w-8 h-8 rounded-md bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={14} className="text-[#7c3aed]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[#f0f0f0] mb-1">{label}</h3>
                  <p className="text-[12px] text-[#737373] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial principles */}
        <section className="mb-12">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040] mb-5 flex items-center gap-3">
            Editorial Principles
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-4">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="border-l-2 border-[#7c3aed] pl-5">
                <h3 className="text-[14px] font-semibold text-[#f0f0f0] mb-1">{p.title}</h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <div className="rounded-xl p-6 bg-[#0d0d0d] border border-[#1f1f1f]">
            <h2 className="text-[14px] font-bold mb-4 text-[#f0f0f0]">Get in touch</h2>
            <div className="space-y-2 text-[13px] text-[#737373]">
              <p>
                <span className="text-[#a3a3a3] font-medium">Press & partnerships:</span>{" "}
                <a href="mailto:hello@launchcode.ai" className="text-[#7c3aed] hover:underline">hello@launchcode.ai</a>
              </p>
              <p>
                <span className="text-[#a3a3a3] font-medium">Submit your startup:</span>{" "}
                <button onClick={() => navigate("/startup-apply")} className="text-[#7c3aed] hover:underline">Apply here →</button>
              </p>
              <p className="text-[#404040]">San Francisco · Remote-first · Built for the AI generation.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
          >
            <Zap size={14} fill="currentColor" />
            Read the feed
          </button>
          <button
            onClick={() => navigate("/startup-apply")}
            className="flex items-center gap-2 bg-transparent border border-[#262626] hover:border-[#7c3aed] text-[#a3a3a3] hover:text-[#f0f0f0] px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all"
          >
            Submit your startup
          </button>
        </div>

      </div>
    </div>
  );
}
