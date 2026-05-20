import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, MapPin, Clock, Users, Cpu, DollarSign, Video, BookOpen, Code2, Megaphone } from "lucide-react";

const ROLES = [
  {
    title: "Senior AI Reporter",
    department: "Editorial",
    type: "Full-time",
    location: "Remote",
    icon: BookOpen,
    tags: ["Foundation Models", "Research", "Writing"],
    desc: "Cover foundation model releases, benchmark results, and lab announcements. You break stories before they hit the mainstream. You've read every Anthropic/OpenAI research paper published in the last 18 months.",
  },
  {
    title: "Video AI Correspondent",
    department: "Editorial",
    type: "Full-time",
    location: "Remote",
    icon: Video,
    tags: ["Video AI", "Generative Media", "Reporting"],
    desc: "Track Runway, Pika, Sora, Kling, and every new entrant in generative video. You understand the technical differences between diffusion architectures — and can explain them in three sentences.",
  },
  {
    title: "AI Funding Editor",
    department: "Editorial",
    type: "Full-time",
    location: "Remote / SF",
    icon: DollarSign,
    tags: ["Venture Capital", "Funding", "Startups"],
    desc: "Maintain our Funding Wire — every AI round, valuation, and strategic bet. You have VC sources, you can read SEC filings, and you know the difference between a Series A and a priced round.",
  },
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote / SF",
    icon: Code2,
    tags: ["React", "FastAPI", "TypeScript"],
    desc: "Build and ship features on a high-traffic real-time news platform. You care about performance, accessibility, and beautiful interfaces. You've built things that ran at scale.",
  },
  {
    title: "ML / Data Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    icon: Cpu,
    tags: ["Python", "NLP", "Embeddings", "RAG"],
    desc: "Power our intelligence engine — article classification, relevance ranking, automated summaries, and semantic search. You build pipelines that actually work in production.",
  },
  {
    title: "Growth & Partnerships",
    department: "Growth",
    type: "Full-time",
    location: "Remote / SF",
    icon: Megaphone,
    tags: ["B2B", "Partnerships", "GTM"],
    desc: "Own newsletter growth, partnership deals, and brand distribution. You've grown a technical media property before. You think in audience loops, not one-off campaigns.",
  },
];

const PERKS = [
  { label: "Fully remote", desc: "Work from anywhere. Async-first culture." },
  { label: "Competitive pay", desc: "Top-of-market cash + equity for everyone." },
  { label: "AI tool budget", desc: "$200/mo to spend on any AI tool you need." },
  { label: "No-nonsense equity", desc: "4-year vest, 1-year cliff, standard terms." },
  { label: "Health coverage", desc: "Full medical, dental, vision for US employees." },
  { label: "Frontier access", desc: "Early access to every model we cover." },
];

const DEPT_COLORS = {
  Editorial: "#06b6d4",
  Engineering: "#7c3aed",
  Growth: "#22c55e",
};

export default function CareersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[12px] text-[#404040] hover:text-[#7c3aed] transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          Back
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#7c3aed] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.4)]">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="font-mono text-[20px] font-bold text-[#f0f0f0] tracking-tight">
              Launch<span className="text-[#7c3aed]">Code</span>
            </span>
          </div>
          <div className="w-10 h-[3px] rounded mb-5 bg-[#7c3aed]" />
          <h1 className="text-[28px] sm:text-[36px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
            Join the team covering<br />
            <span className="text-[#7c3aed]">the AI frontier.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-[#737373]">
            We're a small, distributed team of journalists and engineers obsessed with AI. We move fast, we cover everything that matters, and we're building the intelligence layer the AI community deserves.
          </p>
        </header>

        {/* Perks */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Why LaunchCode
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PERKS.map(p => (
              <div key={p.label} className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                <div className="text-[13px] font-semibold text-[#f0f0f0] mb-1">{p.label}</div>
                <div className="text-[12px] text-[#737373] leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Open Roles
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-3">
            {ROLES.map(role => {
              const Icon = role.icon;
              const deptColor = DEPT_COLORS[role.department] || "#7c3aed";
              return (
                <div key={role.title} className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${deptColor}18`, borderColor: `${deptColor}30` }}>
                      <Icon size={16} style={{ color: deptColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-[15px] font-semibold text-[#f0f0f0]">{role.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${deptColor}18`, color: deptColor }}>
                          {role.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3 text-[11px] text-[#404040]">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {role.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {role.type}</span>
                      </div>
                      <p className="text-[13px] text-[#737373] leading-relaxed mb-3">{role.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {role.tags.map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] border border-[#262626] text-[#737373]">{t}</span>
                        ))}
                      </div>
                      <a
                        href={`mailto:careers@launchcode.ai?subject=Application: ${role.title}`}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#7c3aed] hover:text-[#a78bfa] transition-colors"
                      >
                        Apply → careers@launchcode.ai
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Don't see your role */}
        <section>
          <div className="rounded-xl p-6 bg-[#0d0d0d] border border-[#7c3aed]/20">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-[#7c3aed]" />
              <h3 className="text-[14px] font-semibold text-[#f0f0f0]">Don't see your role?</h3>
            </div>
            <p className="text-[13px] text-[#737373] mb-4 leading-relaxed">
              We hire exceptionally opinionated people who care deeply about AI. If you're obsessed with the space and think you'd make LaunchCode better, reach out.
            </p>
            <a
              href="mailto:careers@launchcode.ai?subject=Open Application"
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
            >
              Send an open application
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
