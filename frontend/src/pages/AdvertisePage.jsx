import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Mail, Users, TrendingUp, Newspaper, Globe, Code2 } from "lucide-react";

const FORMATS = [
  {
    icon: Newspaper,
    title: "Newsletter Sponsorship",
    price: "From $2,500/issue",
    desc: "A clearly-labeled placement in the LaunchCode Daily Digest — delivered each morning to 180k AI builders, investors, and researchers. High open rates, senior-heavy audience.",
    features: ["Top or mid-issue placement", "Dedicated CTA + link", "Performance report within 48h"],
  },
  {
    icon: Globe,
    title: "Site Display",
    price: "From $1,500/week",
    desc: "Tasteful, fast-loading units on the homepage, section pages, and article sidebar. No pop-ups, no autoplay video. Your placement appears in a clean editorial environment.",
    features: ["Homepage + section placement", "Mobile-first responsive units", "Impression + click reporting"],
  },
  {
    icon: Code2,
    title: "Branded Editorial Series",
    price: "From $8,000",
    desc: "A multi-part series produced by our partnerships studio — clearly labeled as sponsored. You bring the point of view; we bring the reporting craft and the distribution.",
    features: ["3–5 article series", "Research + writing by LaunchCode editors", "Cross-promoted in newsletter + social"],
  },
  {
    icon: Zap,
    title: "Launch Announcements",
    price: "From $500",
    desc: "Get your product launch featured in the Launch Radar page and WIRE ticker — the most-read parts of the platform for AI builders tracking new releases.",
    features: ["Launch Radar listing", "WIRE ticker mention", "Category badge + link"],
  },
];

const AUDIENCE = [
  { label: "180K+", desc: "Daily Readers" },
  { label: "62%", desc: "Founders & C-suite" },
  { label: "28%", desc: "Investors & VCs" },
  { label: "4:12", desc: "Avg. session time (min:sec)" },
];

const SECTORS = [
  "AI Infrastructure & Cloud",
  "Developer Tools & APIs",
  "Enterprise Software",
  "Venture Firms & Funds",
  "Compute & Hardware",
  "Data & MLOps Platforms",
];

export default function AdvertisePage() {
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
            Reach the people building<br />
            <span className="text-[#7c3aed]">the AI frontier.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-[#737373]">
            LaunchCode's audience is intentionally narrow — AI builders, investors, and researchers who are shaping the space. They read to the end. They act on what they read.
          </p>
        </header>

        {/* Audience stats */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Our Audience
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {AUDIENCE.map(a => (
              <div key={a.label} className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] text-center">
                <div className="text-[22px] font-bold font-mono text-[#f0f0f0] mb-0.5">{a.label}</div>
                <div className="text-[10px] text-[#404040] uppercase tracking-wider">{a.desc}</div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-[#7c3aed]" />
              <h3 className="text-[12px] font-semibold text-[#f0f0f0] uppercase tracking-wider">Top Sectors in Our Readership</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map(s => (
                <span key={s} className="text-[11px] px-2.5 py-1 rounded-md bg-[#111] border border-[#262626] text-[#a3a3a3]">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Ad formats */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Ways to Partner
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="space-y-4">
            {FORMATS.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#7c3aed]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h3 className="text-[14px] font-bold text-[#f0f0f0]">{f.title}</h3>
                        <span className="text-[11px] font-mono text-[#7c3aed] shrink-0">{f.price}</span>
                      </div>
                      <p className="text-[13px] text-[#737373] leading-relaxed mb-3">{f.desc}</p>
                      <ul className="space-y-1">
                        {f.features.map(feat => (
                          <li key={feat} className="flex items-center gap-2 text-[12px] text-[#a3a3a3]">
                            <span className="w-1 h-1 rounded-full bg-[#7c3aed] shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why LaunchCode */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-5 flex items-center gap-3">
            Why LaunchCode
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: TrendingUp, title: "High-intent readers", desc: "Our audience reads LaunchCode to stay informed and make decisions — not for entertainment." },
              { icon: Globe, title: "Global reach", desc: "Coverage across SF, NYC, London, Singapore, and the global frontier AI community." },
              { icon: Users, title: "No mass-market noise", desc: "We don't chase traffic. 180k readers who care beats 10M who don't." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                <Icon size={16} className="text-[#7c3aed] mb-2" />
                <h3 className="text-[13px] font-semibold text-[#f0f0f0] mb-1">{title}</h3>
                <p className="text-[12px] text-[#737373] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Get in touch */}
        <section>
          <div className="rounded-xl p-6 bg-[#0d0d0d] border border-[#7c3aed]/20">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-[#7c3aed]" />
              <h3 className="text-[14px] font-semibold text-[#f0f0f0]">Get in touch</h3>
            </div>
            <p className="text-[13px] text-[#737373] leading-relaxed mb-4">
              Send us a short note: what you're promoting, the timeline, and what you'd like the audience to do. Our partnerships desk replies within two business days with a rate card and recommended formats.
            </p>
            <a
              href="mailto:advertise@launchcode.ai"
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]"
            >
              <Mail size={13} />
              advertise@launchcode.ai
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
