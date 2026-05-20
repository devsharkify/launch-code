import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Eye, RefreshCw, AlertCircle } from "lucide-react";

const STANDARDS = [
  {
    icon: Eye,
    title: "Independence",
    body: "LaunchCode accepts no sponsored editorial content. We do not allow sources to review or approve coverage before publication. Our advertising and editorial teams are entirely separate.",
  },
  {
    icon: Shield,
    title: "Accuracy",
    body: "Every factual claim we publish — benchmark scores, funding amounts, valuation figures — is verified against at least two independent primary sources before publication. We do not relay press releases without independent verification.",
  },
  {
    icon: RefreshCw,
    title: "Corrections",
    body: "When we get something wrong, we correct it transparently. Corrections appear at the top of the affected article, with a timestamp and a description of what changed. We do not quietly edit factual errors.",
  },
  {
    icon: AlertCircle,
    title: "Conflicts of Interest",
    body: "No LaunchCode editorial staff member holds equity in any company we cover. Reporters disclose when they have personal relationships with sources. We have no investors who are active in AI startups.",
  },
];

const SOURCING = [
  {
    label: "Primary sources",
    desc: "Direct interviews, official filings (SEC, Companies House), API changelogs, benchmark papers, and company blog posts are preferred over secondary reporting.",
  },
  {
    label: "Anonymous sources",
    desc: "We use anonymous sources only when the information is of significant public interest and cannot be obtained on the record. We require corroboration from at least one additional source.",
  },
  {
    label: "AI-assisted writing",
    desc: "We do not use AI to generate editorial content. AI tools may assist with transcription or research summaries, but all published writing is authored and edited by human journalists.",
  },
  {
    label: "Embargoes",
    desc: "We may accept embargoes from companies when the information is newsworthy and the embargo period is reasonable (typically under 7 days). We do not sign NDAs that restrict our editorial coverage.",
  },
];

export default function EditorialStandardsPage() {
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
            Editorial Standards
          </h1>
          <p className="text-[15px] leading-relaxed text-[#737373]">
            LaunchCode covers the AI industry for builders, investors, and researchers who depend on accurate intelligence. These standards define how we operate.
          </p>
          <p className="text-[12px] text-[#404040] mt-3">
            Last updated: May 2026 · Questions: <a href="mailto:editor@launchcode.ai" className="text-[#7c3aed] hover:underline">editor@launchcode.ai</a>
          </p>
        </header>

        {/* Core principles */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Core Principles
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-3">
            {STANDARDS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex gap-4 p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                  <div className="w-9 h-9 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#7c3aed]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#f0f0f0] mb-1.5">{s.title}</h3>
                    <p className="text-[13px] text-[#737373] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sourcing policy */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Sourcing & Methods
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-4">
            {SOURCING.map(s => (
              <div key={s.label} className="border-l-2 border-[#7c3aed] pl-5">
                <h3 className="text-[13px] font-semibold text-[#f0f0f0] mb-1">{s.label}</h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advertising */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Advertising
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
            <p className="text-[13px] text-[#737373] leading-relaxed mb-3">
              LaunchCode is supported by advertising and sponsorships. All paid placements are clearly labeled as "Sponsored" or "Advertisement." Advertisers have no influence over our editorial coverage.
            </p>
            <p className="text-[13px] text-[#737373] leading-relaxed">
              We do not accept advertising from companies under active editorial scrutiny. If a sponsorship creates an apparent conflict, we disclose it.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="rounded-xl p-6 bg-[#0d0d0d] border border-[#1f1f1f]">
            <h3 className="text-[14px] font-semibold text-[#f0f0f0] mb-3">Reach the newsroom</h3>
            <div className="space-y-2 text-[13px] text-[#737373]">
              <p><span className="text-[#a3a3a3] font-medium">Corrections & complaints:</span>{" "}
                <a href="mailto:editor@launchcode.ai" className="text-[#7c3aed] hover:underline">editor@launchcode.ai</a>
              </p>
              <p><span className="text-[#a3a3a3] font-medium">Press inquiries:</span>{" "}
                <a href="mailto:hello@launchcode.ai" className="text-[#7c3aed] hover:underline">hello@launchcode.ai</a>
              </p>
              <p><span className="text-[#a3a3a3] font-medium">Tip line (confidential):</span>{" "}
                <a href="mailto:tips@launchcode.ai" className="text-[#7c3aed] hover:underline">tips@launchcode.ai</a>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
