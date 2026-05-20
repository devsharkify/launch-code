import { Pencil, Zap, CheckCircle, ArrowRight, FileText, Globe, Bot, Cpu, Video, DollarSign } from "lucide-react";

const TOPICS = [
  { icon: Cpu, label: "Foundation Models", desc: "LLM releases, benchmarks, architecture breakthroughs" },
  { icon: Video, label: "Video AI", desc: "Text-to-video, diffusion models, generative media" },
  { icon: DollarSign, label: "AI Funding", desc: "Rounds, valuations, VC thesis, startup launches" },
  { icon: Bot, label: "AI Agents", desc: "Autonomous agents, multi-agent systems, agentic workflows" },
  { icon: Globe, label: "Open Source AI", desc: "Open weights releases, community models, fine-tuning" },
  { icon: FileText, label: "Research Deep Dives", desc: "Paper breakdowns, reproducibility, practical implications" },
];

const REQUIREMENTS = [
  "Minimum 600 words, well-structured with headers",
  "Technically accurate — cite papers, benchmarks, and sources",
  "Original content not published elsewhere",
  "Written in English, clear and concise",
  "No paid placements or undisclosed sponsored content",
  "Author bio and LinkedIn/GitHub profile required",
];

const PROCESS = [
  { step: "01", title: "Pitch your idea", desc: "Send a 2–3 sentence summary of your article idea to our editorial team." },
  { step: "02", title: "Get editorial feedback", desc: "We respond within 3 business days with direction or a green light to write." },
  { step: "03", title: "Submit your draft", desc: "Send the full article in Google Docs or Markdown. We'll edit for clarity and style." },
  { step: "04", title: "Publish & promote", desc: "We publish to 180k+ AI-focused readers and share across our social channels." },
];

export default function WriteForUs() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-3xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded bg-[#7c3aed] flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
              <Pencil size={13} className="text-white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7c3aed] font-mono">Write for Us</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-bold text-[#f0f0f0] tracking-tight leading-tight mb-4">
            Share your AI expertise<br />with 180k+ readers
          </h1>
          <p className="text-[16px] text-[#737373] leading-relaxed max-w-[52ch]">
            LaunchCode publishes original articles on AI models, funding, agents, and video generation from practitioners, researchers, and builders.
          </p>
          <a
            href="mailto:editor@launchcode.ai"
            className="inline-flex items-center gap-2 mt-6 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[14px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
          >
            Pitch your article <ArrowRight size={15} />
          </a>
        </div>

        {/* Topics we cover */}
        <section className="mb-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#404040] mb-5">Topics We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPICS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-3 p-4 rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] hover:border-[#7c3aed]/30 transition-colors">
                <div className="w-8 h-8 rounded bg-[#7c3aed]/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#7c3aed]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#f0f0f0] mb-0.5">{label}</div>
                  <div className="text-[12px] text-[#737373] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#404040] mb-5">Submission Requirements</h2>
          <div className="space-y-2">
            {REQUIREMENTS.map((req, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={14} className="text-[#22c55e] mt-0.5 shrink-0" />
                <span className="text-[13px] text-[#a3a3a3]">{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#404040] mb-5">How It Works</h2>
          <div className="space-y-4">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-md bg-[#111] border border-[#262626] flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-mono font-bold text-[#7c3aed]">{step}</span>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#f0f0f0] mb-0.5">{title}</div>
                  <div className="text-[13px] text-[#737373]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="border border-[#7c3aed]/20 bg-[#7c3aed]/5 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-[#7c3aed]" />
              <span className="text-[13px] font-bold text-[#f0f0f0]">Ready to contribute?</span>
            </div>
            <p className="text-[12px] text-[#737373]">Email your pitch to <span className="text-[#a78bfa]">editor@launchcode.ai</span></p>
          </div>
          <a
            href="mailto:editor@launchcode.ai"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all whitespace-nowrap hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
          >
            Send Pitch
          </a>
        </div>

      </div>
    </div>
  );
}
