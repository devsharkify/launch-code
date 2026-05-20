import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Cpu, Video, DollarSign, Bot, FlaskConical, Globe, ChevronRight, BookOpen } from "lucide-react";

const TODAY = new Date(2026, 4, 21); // May 21 2026
const DATE_STR = TODAY.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const DIGEST = {
  issue: 847,
  date: DATE_STR,
  readTime: "4 min read",
  headline: "Veo 3 vs Sora, Harvey's $180M, and the multi-agent framework wars",
  lede: "Google's Veo 3 beats Sora on ELO after six months of trailing it. Harvey closes the biggest legal AI round ever. And LangGraph, CrewAI, and AutoGen are all shipping major updates within the same week — here's what it means.",
};

const SECTIONS = [
  {
    id: "models",
    icon: Cpu,
    color: "#7c3aed",
    label: "Foundation Models",
    items: [
      {
        headline: "Google DeepMind Veo 3 overtakes Sora in ELO benchmarks",
        body: "After six months of trailing OpenAI's Sora in human preference evaluations, Google's Veo 3 has taken the top spot on the ELO video quality leaderboard with a score of 1,423 vs Sora's 1,391. Key upgrades: 4K resolution support, 30-second clips, and improved motion physics. Announced at Google I/O alongside a new API for enterprise access.",
        source: "Google DeepMind Blog",
        tag: "BENCHMARK SHIFT",
        tagColor: "#7c3aed",
      },
      {
        headline: "Anthropic ships Claude 4 Opus — 92.3% on SWE-bench",
        body: "The new Opus model achieves state-of-the-art on software engineering tasks, legal reasoning, and graduate-level STEM benchmarks. Context window extends to 200K tokens. Available via API now; pricing is $15/M input, $75/M output tokens.",
        source: "Anthropic Blog",
        tag: "NEW RELEASE",
        tagColor: "#06b6d4",
      },
    ],
  },
  {
    id: "video-ai",
    icon: Video,
    color: "#ec4899",
    label: "Video AI",
    items: [
      {
        headline: "Runway Gen-3 Alpha Turbo: 4× faster, same quality",
        body: "Runway's new Turbo variant delivers image-to-video outputs in 12 seconds vs 48s for the base model, with comparable perceptual quality on VBench. Available to all Pro subscribers immediately. The speed improvement comes from a distillation-based inference approach, not a smaller model.",
        source: "Runway Blog",
        tag: "PRODUCT UPDATE",
        tagColor: "#ec4899",
      },
    ],
  },
  {
    id: "funding",
    icon: DollarSign,
    color: "#22c55e",
    label: "Funding Wire",
    items: [
      {
        headline: "Harvey AI closes $180M Series C at $1.5B valuation",
        body: "The AI legal research company raised from GV, OpenAI Fund, and Sequoia. Now deployed at 100+ law firms and legal departments globally, including Allen & Overy and Google's in-house team. CEO Winston Weinberg says the next focus is 'full-matter AI' — agents that handle entire case workflows end-to-end.",
        source: "The Information",
        tag: "SERIES C",
        tagColor: "#22c55e",
      },
      {
        headline: "Pika Labs closes $80M Series B at $700M",
        body: "The consumer video AI platform, known for its viral lip-sync and style-transfer features, is now processing over 2M videos per day. Investors include Spark Capital and Sequoia. The company plans to use the funding for compute and a new 'Pika Studio' professional tier.",
        source: "TechCrunch",
        tag: "SERIES B",
        tagColor: "#22c55e",
      },
    ],
  },
  {
    id: "agents",
    icon: Bot,
    color: "#f97316",
    label: "AI Agents",
    items: [
      {
        headline: "LangGraph 0.4 ships with native multi-agent interrupts",
        body: "The update adds first-class support for human-in-the-loop interrupts, allowing agent workflows to pause, request human input, and resume. Also new: a visual studio interface for designing agent graphs. The release comes two days after CrewAI's 0.30 and one day before AutoGen 0.5 — all three frameworks shipping concurrent major updates.",
        source: "LangChain Blog",
        tag: "FRAMEWORK",
        tagColor: "#f97316",
      },
    ],
  },
  {
    id: "research",
    icon: FlaskConical,
    color: "#a78bfa",
    label: "Research",
    items: [
      {
        headline: "Scaling laws paper: 1T-parameter models still follow power laws",
        body: "A new paper from Google DeepMind and Stanford shows that the neural scaling laws documented by Kaplan et al. continue to hold at the 1-trillion parameter scale — contradicting earlier predictions that emergent capabilities would disrupt the smooth scaling curves. Implications: more compute still buys predictable capability gains.",
        source: "arXiv",
        tag: "PAPER",
        tagColor: "#a78bfa",
      },
    ],
  },
  {
    id: "global",
    icon: Globe,
    color: "#06b6d4",
    label: "Global AI",
    items: [
      {
        headline: "Moonshot AI's Kimi raises $1B at $3.3B valuation",
        body: "The Chinese long-context LLM company — known for its 1M-token context window — closed a $1B Series B led by Alibaba and CITIC PE. The model is widely used in China's enterprise market as a domestic alternative to GPT-4. CEO Yang Zhilin says a Kimi API for global developers is launching next quarter.",
        source: "Reuters",
        tag: "FUNDING",
        tagColor: "#06b6d4",
      },
    ],
  },
];

const PAST_ISSUES = [
  { issue: 846, date: "May 20, 2026", headline: "Sora's biggest competitor, $500M for Perplexity, and the RAG-vs-fine-tuning debate" },
  { issue: 845, date: "May 19, 2026", headline: "Llama 4 Scout tops the open-source leaderboard, Mistral raises €200M" },
  { issue: 844, date: "May 18, 2026", headline: "OpenAI's Sam Altman on compute bottlenecks, Claude's new code agent" },
  { issue: 843, date: "May 17, 2026", headline: "The agentic future arrives: Cognition's Devin hits 92% on SWE-bench" },
  { issue: 842, date: "May 16, 2026", headline: "Stability AI acquired, Runway's IPO timeline, and the video AI stack" },
];

export default function DigestPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">

      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-screen-lg mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-[#7c3aed] flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.4)]">
                  <Zap size={13} className="text-white" fill="white" />
                </div>
                <span className="font-mono text-[16px] font-bold text-[#f0f0f0]">
                  Launch<span className="text-[#7c3aed]">Code</span>
                  <span className="text-[#737373] font-normal ml-1.5">Daily Digest</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#404040]">
                <span className="font-mono">Issue #{DIGEST.issue}</span>
                <span>·</span>
                <span>{DIGEST.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><BookOpen size={10} /> {DIGEST.readTime}</span>
              </div>
            </div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 shrink-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Get it in your inbox"
                  className="px-3 py-1.5 rounded-md text-[12px] bg-[#111] border border-[#262626] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] transition-colors w-44"
                />
                <button type="submit" className="px-4 py-1.5 rounded-md text-[12px] font-semibold bg-[#7c3aed] hover:bg-[#6d28d9] text-white transition-all whitespace-nowrap">
                  Subscribe free →
                </button>
              </form>
            ) : (
              <div className="text-[12px] text-[#22c55e] font-medium shrink-0">✓ You're subscribed</div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

        {/* Main digest */}
        <main>

          {/* Lede */}
          <section className="mb-8 pb-8 border-b border-[#1a1a1a]">
            <h1 className="text-[24px] sm:text-[30px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
              {DIGEST.headline}
            </h1>
            <p className="text-[15px] text-[#a3a3a3] leading-relaxed">{DIGEST.lede}</p>
          </section>

          {/* Sections */}
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <section key={section.id} className="mb-8 pb-8 border-b border-[#1a1a1a] last:border-0 last:mb-0 last:pb-0">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${section.color}20`, border: `1px solid ${section.color}30` }}>
                    <Icon size={12} style={{ color: section.color }} />
                  </div>
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#737373]">{section.label}</h2>
                </div>

                <div className="space-y-5">
                  {section.items.map((item, i) => (
                    <div key={i} className="group cursor-pointer" onClick={() => navigate("/?cat=" + section.id)}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ background: `${item.tagColor}18`, color: item.tagColor }}>
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-bold text-[#f0f0f0] leading-snug mb-2 group-hover:text-white transition-colors">
                        {item.headline}
                        <ChevronRight size={14} className="inline ml-1 text-[#333] group-hover:text-[#7c3aed] transition-colors align-middle" />
                      </h3>
                      <p className="text-[13px] text-[#737373] leading-relaxed mb-2">{item.body}</p>
                      <p className="text-[11px] text-[#404040] font-medium">{item.source}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Bottom CTA */}
          <div className="mt-8 p-6 rounded-xl bg-[#0d0d0d] border border-[#7c3aed]/20">
            <p className="text-[14px] font-bold text-[#f0f0f0] mb-1">Read the full feed</p>
            <p className="text-[13px] text-[#737373] mb-4">This digest covers the headlines. The feed has the full stories, analysis, and context.</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
            >
              <Zap size={13} fill="white" />
              Go to the feed
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="space-y-5">

          {/* Past issues */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b border-[#1a1a1a]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0f0f0]">Past Issues</h3>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {PAST_ISSUES.map(issue => (
                <div key={issue.issue} className="px-4 py-3 hover:bg-[#111] transition-colors cursor-pointer group">
                  <p className="text-[10px] text-[#404040] font-mono mb-0.5">#{issue.issue} · {issue.date}</p>
                  <p className="text-[12px] text-[#d4d4d4] group-hover:text-white leading-snug transition-colors line-clamp-2">{issue.headline}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#1a1a1a]">
              <button className="text-[11px] text-[#7c3aed] hover:text-[#a78bfa] transition-colors flex items-center gap-1">
                Browse all issues <ArrowRight size={11} />
              </button>
            </div>
          </div>

          {/* Section nav */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b border-[#1a1a1a]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0f0f0]">In This Issue</h3>
            </div>
            <div className="py-2">
              {SECTIONS.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-4 py-2 hover:bg-[#111] transition-colors group">
                    <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: `${s.color}18` }}>
                      <Icon size={10} style={{ color: s.color }} />
                    </div>
                    <span className="text-[12px] text-[#a3a3a3] group-hover:text-[#f0f0f0] transition-colors">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0f0f0] mb-3">Quick Links</h3>
            {[
              { label: "Launch Radar", path: "/launches" },
              { label: "Model Leaderboard", path: "/models" },
              { label: "Funding Wire", path: "/funding" },
              { label: "Video AI Tracker", path: "/video-ai" },
              { label: "Agents Landscape", path: "/agents" },
            ].map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="w-full flex items-center justify-between text-[12px] text-[#737373] hover:text-[#f0f0f0] transition-colors py-1 group"
              >
                <span>{link.label}</span>
                <ArrowRight size={11} className="text-[#333] group-hover:text-[#7c3aed] transition-colors" />
              </button>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
