import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { Settings, LogOut, Search, ChevronLeft, Zap } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

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
  "Perplexity AI raises $500M at $9B valuation",
  "Meta Llama 4 Scout tops open-source leaderboard",
  "DeepSeek R3 beats o3 on AIME 2025 at $5/M tokens",
];

export const Header = () => {
  const { isAdmin, isLoggedIn, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [cmdOpen, setCmdOpen] = useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
    <>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#1f1f1f]">
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

        {/* Primary bar */}
        <div className="h-14 flex items-center">
          <div className="max-w-screen-xl mx-auto px-4 w-full flex items-center justify-between gap-4">

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
              <button onClick={() => navigate("/")} className="flex items-center gap-2 select-none group" aria-label="LaunchCode home">
                <div className="w-7 h-7 rounded-md bg-[#7c3aed] flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.7)] transition-shadow">
                  <Zap size={14} className="text-white" fill="white" />
                </div>
                <span className="font-mono text-[17px] font-semibold text-[#f0f0f0] tracking-tight leading-none">
                  Launch<span className="text-[#7c3aed]">Code</span>
                </span>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.slug}
                  onClick={() => navigate(`/?cat=${link.slug}`)}
                  className="group relative px-3.5 py-1.5 text-[13px] font-medium text-[#a3a3a3] hover:text-[#f0f0f0] transition-colors rounded-md hover:bg-[#1a1a1a]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-0.5">
              {/* Search with ⌘K hint */}
              <button
                onClick={() => setCmdOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#1f1f1f] bg-[#111] text-[#404040] hover:border-[#262626] hover:text-[#737373] transition-colors text-[12px] mr-1"
                aria-label="Search"
              >
                <Search size={13} />
                <span>Search</span>
                <kbd className="ml-1 text-[10px] font-mono bg-[#1a1a1a] border border-[#262626] px-1 py-0.5 rounded">⌘K</kbd>
              </button>
              <button
                onClick={() => setCmdOpen(true)}
                className="sm:hidden p-2 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              {isAdmin && (
                <button onClick={() => navigate("/admin")} className="p-2 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors" aria-label="Admin">
                  <Settings size={16} />
                </button>
              )}
              {isLoggedIn && (
                <button onClick={handleLogout} className="p-2 rounded-md text-[#737373] hover:text-red-400 hover:bg-[#1a1a1a] transition-colors" aria-label="Log out">
                  <LogOut size={16} />
                </button>
              )}
              <button
                onClick={() => navigate("/startup-apply")}
                className="ml-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.5)]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Ticker strip */}
        <div className="h-7 flex items-center overflow-hidden relative bg-[#0d0d0d] border-t border-[#1a1a1a]">
          <span className="shrink-0 bg-[#7c3aed] text-white px-3 h-7 flex items-center text-[10px] font-bold uppercase tracking-widest z-10">
            WIRE
          </span>
          <div className="flex text-[11px] font-medium tracking-wide pl-4" style={{ animation: "marquee 50s linear infinite" }}>
            {tickerStream}{tickerStream}
          </div>
        </div>
      </header>
    </>
  );
};
