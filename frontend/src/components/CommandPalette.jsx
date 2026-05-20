import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Cpu, DollarSign, Video, Zap, BookOpen, X } from "lucide-react";
import { AppContext } from "../App";

const QUICK_LINKS = [
  { icon: Cpu, label: "AI Model Leaderboard", sub: "Benchmarks: SWE-bench, MMMU, MATH…", path: "/models" },
  { icon: DollarSign, label: "Funding Wire", sub: "$4.2B tracked · 15 rounds in 2026", path: "/funding" },
  { icon: Video, label: "Video AI", sub: "Runway, Pika, Sora, Veo — all coverage", path: "/?cat=video-ai" },
  { icon: Zap, label: "AI Agents", sub: "Autonomous agent ecosystem", path: "/?cat=agents" },
  { icon: BookOpen, label: "Research", sub: "Papers, benchmarks, arxiv breakdowns", path: "/?cat=research" },
];

export const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { openArticle } = useContext(AppContext);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl mx-4 bg-[#111] border border-[#262626] rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideDown 0.15s ease-out" }}
      >
        <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>

        {/* Search row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1f1f1f]">
          <Search size={16} className="text-[#404040] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI news, models, startups..."
            className="flex-1 bg-transparent text-[14px] text-[#f0f0f0] placeholder:text-[#333] outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#404040] hover:text-[#f0f0f0]">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-[#1a1a1a] border border-[#262626] text-[#404040] text-[10px] px-1.5 py-0.5 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Content */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {!query && (
            <>
              <div className="px-4 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#404040]">Quick Navigation</span>
              </div>
              {QUICK_LINKS.map(({ icon: Icon, label, sub, path }) => (
                <button
                  key={label}
                  onClick={() => handleNavigate(path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1a] transition-colors group"
                >
                  <div className="w-7 h-7 rounded-md bg-[#1a1a1a] border border-[#262626] flex items-center justify-center shrink-0 group-hover:border-[#7c3aed]/40 transition-colors">
                    <Icon size={13} className="text-[#7c3aed]" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#f0f0f0]">{label}</div>
                    <div className="text-[11px] text-[#404040] truncate">{sub}</div>
                  </div>
                  <ArrowRight size={13} className="text-[#333] group-hover:text-[#7c3aed] transition-colors" />
                </button>
              ))}
            </>
          )}

          {query && query.length < 2 && (
            <div className="px-4 py-6 text-center text-[13px] text-[#404040]">
              Keep typing to search…
            </div>
          )}

          {query && query.length >= 2 && (
            <button
              onClick={() => handleNavigate(`/search?q=${encodeURIComponent(query)}`)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors group"
            >
              <Search size={14} className="text-[#7c3aed] shrink-0" />
              <span className="text-[13px] text-[#f0f0f0]">
                Search for <span className="text-[#7c3aed] font-semibold">"{query}"</span>
              </span>
              <ArrowRight size={13} className="text-[#333] group-hover:text-[#7c3aed] ml-auto transition-colors" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#1f1f1f] bg-[#0d0d0d]">
          <div className="flex items-center gap-3 text-[10px] text-[#333]">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> open</span>
            <span><kbd className="font-mono">ESC</kbd> close</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#333]">
            <div className="w-3.5 h-3.5 rounded bg-[#7c3aed]/20 flex items-center justify-center">
              <Zap size={8} className="text-[#7c3aed]" fill="currentColor" />
            </div>
            LaunchCode
          </div>
        </div>
      </div>
    </div>
  );
};
