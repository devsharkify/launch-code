import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { Settings, LogOut, Search, ChevronLeft, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "AI Models", slug: "ai-models" },
  { label: "Funding", slug: "funding" },
  { label: "Video AI", slug: "video-ai" },
  { label: "Agents", slug: "agents" },
  { label: "Research", slug: "research" },
];

const TICKER_ITEMS = [
  "Runway ML raises $308M Series D at $4B valuation",
  "Sora by OpenAI now open to all Plus subscribers",
  "Mistral releases Codestral 2.1 — 256k context",
  "Google DeepMind Veo 3 outperforms Sora on ELO benchmarks",
  "Pika Labs closes $80M Series B",
  "Stability AI acquired by Harmony Intelligence",
  "Anthropic Claude 4 Opus achieves 92.3% on SWE-bench",
];

export const Header = () => {
  const { isAdmin, isLoggedIn, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const tickerStream = (
    <div className="flex whitespace-nowrap shrink-0 pr-16">
      <span className="text-[#737373]">{formattedDate}</span>
      <span className="px-2 text-[#333]">·</span>
      <span className="text-[#7c3aed] font-bold">LIVE</span>
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-3 text-[#333]">·</span>
          <span className="text-[#d4d4d4]">{item}</span>
        </span>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#1f1f1f]">
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

      {/* Primary bar */}
      <div className="h-14 flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 w-full flex items-center justify-between gap-4">

          {/* LEFT: logo */}
          <div className="flex items-center gap-2 min-w-0">
            {!isHomePage && (
              <button
                onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}
                className="p-1.5 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 select-none group"
              aria-label="Launch Code home"
            >
              <div className="w-7 h-7 rounded-md bg-[#7c3aed] flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.7)] transition-shadow">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <span className="font-mono text-[17px] font-semibold text-[#f0f0f0] tracking-tight leading-none">
                Launch<span className="text-[#7c3aed]">Code</span>
              </span>
            </button>
          </div>

          {/* CENTER: nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.slug}
                type="button"
                onClick={() => navigate(`/?cat=${link.slug}`)}
                className="group relative px-3.5 py-1.5 text-[13px] font-medium text-[#a3a3a3] hover:text-[#f0f0f0] transition-colors rounded-md hover:bg-[#1a1a1a]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* RIGHT: actions */}
          <div className="flex items-center gap-0.5">
            <button
              className="p-2 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="p-2 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
                aria-label="Admin"
              >
                <Settings size={16} />
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-[#737373] hover:text-red-400 hover:bg-[#1a1a1a] transition-colors"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            )}

            <button className="ml-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.5)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="h-7 flex items-center overflow-hidden relative bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <span className="shrink-0 bg-[#7c3aed] text-white px-3 h-7 flex items-center text-[10px] font-bold uppercase tracking-widest z-10">
          WIRE
        </span>
        <div
          className="flex text-[11px] font-medium tracking-wide pl-4"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {tickerStream}
          {tickerStream}
        </div>
      </div>
    </header>
  );
};
