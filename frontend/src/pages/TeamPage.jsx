import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Twitter, Linkedin } from "lucide-react";

const TEAM = [
  {
    name: "Ava Chen",
    role: "Editor-in-Chief",
    bio: "Former ML researcher at DeepMind. Covered AI for The Information for four years. Joined to build the publication she always wanted to read.",
    avatar: "AC",
    color: "#7c3aed",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
  {
    name: "Marcus Webb",
    role: "Senior Reporter, Foundation Models",
    bio: "Ex-OpenAI comms. Has a standing call with someone at every major AI lab. If a model dropped in the last 24 hours, Marcus has the context.",
    avatar: "MW",
    color: "#06b6d4",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
  {
    name: "Yuki Tanaka",
    role: "Video AI Correspondent",
    bio: "Studied computer vision at Stanford. Spent two years at Runway before pivoting to journalism. She builds the things she writes about.",
    avatar: "YT",
    color: "#ec4899",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
  {
    name: "Rahul Mehta",
    role: "Funding Editor",
    bio: "Former VC analyst at Sequoia covering AI. Tracked $11B in AI funding rounds before joining LaunchCode. Knows every cap table.",
    avatar: "RM",
    color: "#22c55e",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
  {
    name: "Lena Fischer",
    role: "Research Correspondent",
    bio: "PhD in ML from ETH Zurich. Translates arxiv into things builders can actually use. The reason our benchmark coverage is always right.",
    avatar: "LF",
    color: "#f97316",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
  {
    name: "Jordan Park",
    role: "Lead Engineer",
    bio: "Built real-time news feeds at scale before joining LaunchCode. Obsessed with latency, beautiful UIs, and ships every Friday.",
    avatar: "JP",
    color: "#a78bfa",
    twitter: "https://twitter.com/launchcode_ai",
    linkedin: "https://linkedin.com/company/launchcode-ai",
  },
];

const ADVISORS = [
  { name: "Sarah Kim", title: "AI Ethics & Policy", org: "Former OpenAI Policy Lead" },
  { name: "David Osei", title: "AI Infrastructure", org: "Co-founder, Together AI" },
  { name: "Priya Nair", title: "Venture & GTM", org: "Partner, Greylock" },
];

export default function TeamPage() {
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
            The team.
          </h1>
          <p className="text-[15px] leading-relaxed text-[#737373]">
            Journalists, engineers, and former AI researchers — all obsessed with the same question: what's happening at the frontier, and what does it mean?
          </p>
        </header>

        {/* Team grid */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Editorial & Engineering
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM.map(member => (
              <div
                key={member.name}
                className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-[14px] font-bold text-white shrink-0"
                    style={{ background: `${member.color}25`, border: `1px solid ${member.color}40`, color: member.color }}
                  >
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-[#f0f0f0] leading-tight">{member.name}</h3>
                    <p className="text-[11px] font-medium mb-2 mt-0.5" style={{ color: member.color }}>{member.role}</p>
                    <p className="text-[12px] text-[#737373] leading-relaxed mb-3">{member.bio}</p>
                    <div className="flex items-center gap-3">
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                        className="text-[#404040] hover:text-[#7c3aed] transition-colors">
                        <Twitter size={13} strokeWidth={1.75} />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="text-[#404040] hover:text-[#7c3aed] transition-colors">
                        <Linkedin size={13} strokeWidth={1.75} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisors */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Advisors
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-3">
            {ADVISORS.map(a => (
              <div key={a.name} className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                <div className="w-9 h-9 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center font-mono text-[11px] font-bold text-[#7c3aed] shrink-0">
                  {a.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#f0f0f0]">{a.name}</p>
                  <p className="text-[11px] text-[#737373]">{a.title} · <span className="text-[#404040]">{a.org}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join us CTA */}
        <section>
          <div className="rounded-xl p-6 bg-[#0d0d0d] border border-[#7c3aed]/20">
            <p className="text-[14px] text-[#f0f0f0] font-semibold mb-1">Want to join?</p>
            <p className="text-[13px] text-[#737373] mb-4">We're always looking for sharp people who are obsessed with AI.</p>
            <button
              onClick={() => navigate("/careers")}
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
            >
              View open roles →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
