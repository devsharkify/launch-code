import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Zap, ArrowRight, Code2, Globe, FileText, Cpu, Terminal, DollarSign } from "lucide-react";

const USE_CASES = [
  { icon: Code2, label: "Software Engineering", desc: "Devin, SWE-agent, Claude Code — agents that write, debug, and deploy.", color: "#7c3aed" },
  { icon: FileText, label: "Legal & Research", desc: "Harvey, Casetext — document review and synthesis at lawyer-grade quality.", color: "#06b6d4" },
  { icon: Globe, label: "Web Browsing", desc: "Operator-class agents that navigate UIs, fill forms, and complete tasks.", color: "#22c55e" },
  { icon: DollarSign, label: "Finance", desc: "Quantitative analysis, earnings calls, portfolio reasoning over private data.", color: "#f97316" },
  { icon: Terminal, label: "DevOps & Infra", desc: "Agents that provision cloud resources, monitor systems, and self-heal.", color: "#ec4899" },
  { icon: Cpu, label: "Multi-Agent Orchestration", desc: "LangChain, AutoGen, CrewAI — frameworks for coordinating agent swarms.", color: "#a78bfa" },
];

const COMPANIES = [
  {
    name: "Cognition AI",
    product: "Devin",
    round: "Series A · $75M",
    val: "$800M",
    desc: "The first AI software engineer. 13.86% on SWE-bench, fully autonomous codebase changes.",
    badge: "SOTA SWE",
    color: "#7c3aed",
  },
  {
    name: "Harvey AI",
    product: "Harvey",
    round: "Series C · $180M",
    val: "$1.5B",
    desc: "AI legal research and drafting. Trained on case law, contracts, and regulatory filings.",
    badge: "Enterprise",
    color: "#06b6d4",
  },
  {
    name: "Adept AI",
    product: "ACT-2",
    round: "Series B · $350M",
    val: "$1B",
    desc: "Browser-native agents that control software via keyboard and mouse. Acquired by Databricks.",
    badge: null,
    color: "#f97316",
  },
  {
    name: "Cohere",
    product: "Command R Agents",
    round: "Series E · $500M",
    val: "$5.5B",
    desc: "Enterprise RAG agents with 128K context. Used by global banks and law firms.",
    badge: "Enterprise",
    color: "#22c55e",
  },
  {
    name: "Together AI",
    product: "Together Inference",
    round: "Series B · $305M",
    val: "$3.1B",
    desc: "Open-source AI cloud — run any open model for agents at scale, sub-100ms latency.",
    badge: "Infrastructure",
    color: "#ec4899",
  },
  {
    name: "Dust.tt",
    product: "Dust Assistants",
    round: "Series A",
    val: "—",
    desc: "Enterprise agent builder. Connect to Notion, Slack, GitHub, Salesforce — no-code agentic workflows.",
    badge: null,
    color: "#a78bfa",
  },
];

const BENCHMARKS = [
  { name: "SWE-bench Verified", leader: "Claude 4 Opus", score: "92.3%", desc: "GitHub issue resolution" },
  { name: "WebArena", leader: "GPT-4o + Tools", score: "59.1%", desc: "Web navigation tasks" },
  { name: "OSWorld", leader: "Claude Computer Use", score: "28.8%", desc: "Desktop computer control" },
  { name: "AgentBench", leader: "GPT-4 Turbo", score: "5.77", desc: "Multi-environment avg" },
  { name: "GAIA", leader: "GPT-4o + Plugins", score: "74.2%", desc: "General AI assistants" },
];

const FRAMEWORKS = [
  { name: "LangChain / LangGraph", desc: "Most popular orchestration framework. 95k GitHub stars.", stars: "95k" },
  { name: "AutoGen (Microsoft)", desc: "Multi-agent conversation framework. Built for collaborative agents.", stars: "31k" },
  { name: "CrewAI", desc: "Role-based multi-agent teams. Fast-growing alternative to LangGraph.", stars: "22k" },
  { name: "Semantic Kernel", desc: "Microsoft's enterprise SDK. Azure-native, .NET and Python.", stars: "21k" },
  { name: "Haystack (deepset)", desc: "NLP pipelines and RAG. Popular in search and document agents.", stars: "16k" },
];

export default function AgentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("companies");

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">

      {/* Hero */}
      <section className="border-b border-[#1a1a1a]">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <Bot size={10} className="text-[#7c3aed]" />
              AI Agents Coverage
            </span>
          </div>
          <h1 className="text-[32px] md:text-[52px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
            Autonomous AI.<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#22c55e] bg-clip-text text-transparent">
              The agentic frontier.
            </span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-[#737373] max-w-xl leading-relaxed mb-6">
            Software engineers, legal researchers, browser navigators — AI agents that act. Track every company, framework, and benchmark that matters.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/?cat=agents")}
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
            >
              <Zap size={13} fill="white" /> Read Agents news
            </button>
            <button
              onClick={() => navigate("/launches")}
              className="inline-flex items-center gap-2 bg-[#111] border border-[#262626] hover:border-[#7c3aed]/40 text-[#a3a3a3] hover:text-[#f0f0f0] px-4 py-2 rounded-md text-[13px] font-medium transition-all"
            >
              Launch Radar <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-[#1a1a1a]">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-wrap gap-6 text-[13px]">
            <div><span className="font-bold text-[#f0f0f0] font-mono">$1.5B+</span> <span className="text-[#404040]">raised by agent-first companies in 2026</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">92.3%</span> <span className="text-[#404040]">SWE-bench SOTA (Claude 4 Opus)</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">5</span> <span className="text-[#404040]">major orchestration frameworks</span></div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* Use case pills */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040]">Use Cases</h2>
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {USE_CASES.map(({ icon: Icon, label, desc, color }) => (
              <button
                key={label}
                onClick={() => navigate("/?cat=agents")}
                className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/40 transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <p className="text-[12px] font-semibold text-[#e5e5e5] group-hover:text-white transition-colors leading-snug">{label}</p>
                <p className="text-[10px] text-[#404040] mt-1 leading-snug hidden sm:block">{desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#1a1a1a]">
          {[
            { id: "companies", label: "Companies" },
            { id: "frameworks", label: "Frameworks" },
            { id: "benchmarks", label: "Benchmarks" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-[13px] font-medium transition-colors -mb-px border-b-2 ${
                activeTab === tab.id
                  ? "text-[#f0f0f0] border-[#7c3aed]"
                  : "text-[#737373] border-transparent hover:text-[#d4d4d4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "companies" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPANIES.map(c => (
              <div key={c.name} className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-[14px] font-bold text-[#f0f0f0]">{c.name}</h3>
                      {c.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md" style={{ background: `${c.color}20`, color: c.color }}>
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-[#7c3aed]">{c.product}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-[#737373]">{c.round}</p>
                    {c.val !== "—" && <p className="text-[10px] text-[#404040]">Val. {c.val}</p>}
                  </div>
                </div>
                <p className="text-[12px] text-[#737373] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "frameworks" && (
          <div className="space-y-3">
            {FRAMEWORKS.map((f, i) => (
              <div key={f.name} className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                <div className="w-7 h-7 rounded-md bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-[11px] font-mono font-bold text-[#7c3aed] shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#f0f0f0]">{f.name}</p>
                  <p className="text-[12px] text-[#737373]">{f.desc}</p>
                </div>
                <span className="text-[12px] font-mono text-[#404040] shrink-0">★ {f.stars}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "benchmarks" && (
          <div className="space-y-3">
            {BENCHMARKS.map(b => (
              <div key={b.name} className="px-5 py-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-[13px] font-semibold text-[#f0f0f0]">{b.name}</p>
                  <span className="font-mono text-[14px] font-bold text-[#7c3aed]">{b.score}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#737373]">
                  <span>Leader: <span className="text-[#a3a3a3]">{b.leader}</span></span>
                  <span className="text-[#262626]">·</span>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
