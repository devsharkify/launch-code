import { useNavigate } from "react-router-dom";
import { MOCK_FUNDING } from "../data/mockArticles";
import { DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";

const ROUND_COLORS = {
  "Series A": "#22c55e",
  "Series B": "#3b82f6",
  "Series C": "#f97316",
  "Series D": "#7c3aed",
  "Series E": "#ec4899",
  "Seed": "#06b6d4",
};

export const FundingWire = () => {
  const navigate = useNavigate();

  const totalTracked = "$2.1B+";

  return (
    <section className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#06b6d4]/15 flex items-center justify-center">
            <DollarSign size={12} className="text-[#06b6d4]" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#f0f0f0]">Funding Wire</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
          </span>
          <span className="text-[10px] text-[#22c55e] font-semibold">LIVE</span>
        </div>
      </div>

      {/* Total stat */}
      <div className="mx-4 mb-3 bg-[#111] border border-[#1f1f1f] rounded-lg p-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-[#404040] uppercase tracking-wider mb-0.5">2026 Q2 AI Raised</div>
          <div className="text-[22px] font-bold text-[#f0f0f0] font-mono tracking-tight">{totalTracked}</div>
        </div>
        <div className="flex items-center gap-1 text-[#22c55e] text-[11px] font-semibold">
          <TrendingUp size={12} />
          +240% YoY
        </div>
      </div>

      <div className="border-t border-[#1a1a1a]" />

      {/* Rounds */}
      <div>
        {MOCK_FUNDING.map((round, i) => {
          const color = ROUND_COLORS[round.round] || "#7c3aed";
          return (
            <button
              key={i}
              onClick={() => navigate("/funding")}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#111] transition-colors group border-b border-[#1a1a1a] last:border-0 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px] font-semibold text-[#f0f0f0] group-hover:text-white truncate">{round.company}</span>
                  <span
                    className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                    style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    {round.round}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#404040]">
                  <span>{round.date}</span>
                  {round.valuation && (
                    <>
                      <span>·</span>
                      <span>Val. {round.valuation}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[13px] font-bold font-mono" style={{ color }}>{round.amount}</div>
                <ArrowUpRight size={10} className="text-[#333] group-hover:text-[#7c3aed] ml-auto transition-colors mt-0.5" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-[#1a1a1a]">
        <button
          onClick={() => navigate("/funding")}
          className="text-[11px] text-[#404040] hover:text-[#7c3aed] transition-colors w-full text-center font-medium"
        >
          View all funding rounds →
        </button>
      </div>
    </section>
  );
};
