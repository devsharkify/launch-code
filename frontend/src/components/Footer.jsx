import { useState } from "react";
import { Twitter, Linkedin, Github, Youtube, Zap } from "lucide-react";

const COVERAGE = [
  { label: "Launch Radar", href: "/launches" },
  { label: "AI Models", href: "/models" },
  { label: "Funding Wire", href: "/funding" },
  { label: "Video AI", href: "/video-ai" },
  { label: "AI Agents", href: "/agents" },
  { label: "Foundation Models", href: "/?cat=foundation-models" },
  { label: "Research", href: "/?cat=research" },
  { label: "Open Source AI", href: "/?cat=open-source" },
  { label: "AI Infrastructure", href: "/?cat=infra" },
  { label: "Computer Vision", href: "/?cat=vision" },
];

const INSIDE = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Editorial Standards", href: "/editorial-standards" },
  { label: "Submit a Startup", href: "/startup-apply" },
  { label: "Advertise", href: "/advertise" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const SOCIALS = [
  { Icon: Twitter, href: "https://twitter.com/launchcode_ai", label: "Twitter / X" },
  { Icon: Linkedin, href: "https://linkedin.com/company/launchcode-ai", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com/launchcode-ai", label: "GitHub" },
  { Icon: Youtube, href: "https://youtube.com/@launchcode-ai", label: "YouTube" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="mt-12 border-t border-[#1f1f1f] bg-[#080808]"
    >
      <div className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Newsletter band */}
        <div className="pb-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-[#1a1a1a]">
          <div className="md:col-span-2">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#f0f0f0] leading-tight tracking-tight">
              The briefing for AI builders.
            </h2>
            <p className="text-[13px] mt-2 text-[#737373] leading-relaxed">
              Daily intelligence on models, funding, and breakthroughs in AI — video, agents, and beyond.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@startup.ai"
                className="flex-1 min-w-0 rounded-md px-3 py-2 text-[13px] outline-none bg-[#111] border border-[#262626] text-[#f0f0f0] placeholder:text-[#404040] focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-md px-4 py-2 text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] whitespace-nowrap"
              >
                Join →
              </button>
            </form>
            <p className="text-[11px] mt-2 text-[#404040]">
              Free. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#7c3aed] flex items-center justify-center shadow-[0_0_8px_rgba(124,58,237,0.4)]">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="font-mono text-[16px] font-semibold text-[#f0f0f0] tracking-tight">
                Launch<span className="text-[#7c3aed]">Code</span>
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-[#737373] max-w-[26ch]">
              Intelligence for AI-native startups. From foundation models to video generation — we cover the frontier.
            </p>
            <p className="text-[12px] mt-3 text-[#404040]">
              Global · AI-first · {year}
            </p>
            <div className="flex items-center gap-4 mt-4">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#404040] hover:text-[#7c3aed] transition-colors duration-150"
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Coverage */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3 text-[#404040]">
              Coverage
            </h3>
            <nav className="flex flex-col gap-2">
              {COVERAGE.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-[#a3a3a3] hover:text-[#7c3aed] transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 - Inside */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3 text-[#404040]">
              Inside LaunchCode
            </h3>
            <nav className="flex flex-col gap-2">
              {INSIDE.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] text-[#a3a3a3] hover:text-[#7c3aed] transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 pt-5 border-t border-[#1a1a1a] flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {LEGAL.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-2">
                <a
                  href={href}
                  className="text-[11px] text-[#404040] hover:text-[#7c3aed] transition-colors duration-150"
                >
                  {label}
                </a>
                {i < LEGAL.length - 1 && (
                  <span className="text-[11px] text-[#262626]">·</span>
                )}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#333]">
            © {year} LaunchCode. Built for the AI generation.
          </p>
        </div>
      </div>
    </footer>
  );
};
