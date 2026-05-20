import { useNavigate } from "react-router-dom";
import { Zap, Home, Search, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 text-center">
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7c3aed]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md">
        {/* 404 display */}
        <div className="text-[96px] font-bold font-mono text-[#1a1a1a] leading-none mb-2 select-none">
          404
        </div>

        {/* Brand mark */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-md bg-[#7c3aed] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.4)]">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-mono text-[18px] font-bold text-[#f0f0f0]">
            Launch<span className="text-[#7c3aed]">Code</span>
          </span>
        </div>

        <h1 className="text-[22px] font-bold text-[#f0f0f0] mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-[14px] text-[#404040] leading-relaxed mb-8">
          This page doesn't exist — or it's been moved. The AI news cycle moves fast, and so does our codebase.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
          >
            <Home size={14} />
            Back to feed
          </button>
          <button
            onClick={() => navigate("/models")}
            className="flex items-center gap-2 bg-transparent border border-[#262626] hover:border-[#7c3aed] text-[#a3a3a3] hover:text-[#f0f0f0] px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all"
          >
            <ArrowRight size={14} />
            AI Model Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
