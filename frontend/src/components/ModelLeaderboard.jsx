import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MODELS } from "../data/mockArticles";
import { Trophy, TrendingUp } from "lucide-react";

const BENCHMARKS = ["SWE-bench", "MMMU", "MATH", "HumanEval"];

export const ModelLeaderboard = () => {
  const [bench, setBench] = useState("SWE-bench");
  const navigate = useNavigate();

  return (
    <section className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#7c3aed]/15 flex items-center justify-center">
            <Trophy size={12} className="text-[#7c3aed]" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#f0f0f0]">Model Leaderboard</span>
        </div>
        <button
          onClick={() => navigate("/models")}
          className="text-[11px] text-[#404040] hover:text-[#7c3aed] transition-colors font-medium flex items-center gap-1"
        >
          Full board <TrendingUp size={10} />
        </button>
      </div>

      {/* Benchmark tabs */}
      <div className="flex gap-1 px-4 pb-2 overflow-x-auto hide-scrollbar">
        {BENCHMARKS.map((b) => (
          <button
            key={b}
            onClick={() => setBench(b)}
            className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded transition-all ${
              bench === b
                ? "bg-[#7c3aed] text-white"
                : "text-[#404040] hover:text-[#f0f0f0] bg-[#111] border border-[#1f1f1f]"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="border-t border-[#1a1a1a]" />

      {/* Model rows */}
      <div>
        {MOCK_MODELS.map((model, i) => {
          const pct = ((model.score - 60) / 40) * 100;
          return (
            <div
              key={model.name}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#111] transition-colors cursor-pointer group border-b border-[#1a1a1a] last:border-0"
              onClick={() => navigate("/?cat=ai-models")}
            >
              {/* Rank */}
              <span className="text-[11px] font-mono text-[#404040] w-4 text-right shrink-0">{i + 1}</span>

              {/* Color dot */}
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: model.color, boxShadow: `0 0 6px ${model.color}80` }} />

              {/* Name + org */}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-[#f0f0f0] truncate group-hover:text-white">{model.name}</div>
                <div className="text-[10px] text-[#404040]">{model.org}</div>
              </div>

              {/* Bar + score */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:block w-20 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: model.color }}
                  />
                </div>
                <span className="text-[12px] font-mono font-semibold tabular-nums" style={{ color: model.color }}>
                  {model.score}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-[#1a1a1a]">
        <p className="text-[10px] text-[#262626]">{bench} · Updated daily · LaunchCode AI Tracker</p>
      </div>
    </section>
  );
};
