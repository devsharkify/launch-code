import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, TrendingUp, Cpu, Video } from "lucide-react";

const STATS = [
  { label: "AI Rounds Tracked", value: "2,400+" },
  { label: "Models Benchmarked", value: "340+" },
  { label: "Daily Readers", value: "180k" },
  { label: "Video AI Startups", value: "620+" },
];

const TAGS = [
  { icon: Cpu, label: "Foundation Models" },
  { icon: Video, label: "Video AI" },
  { icon: TrendingUp, label: "AI Funding" },
  { icon: Zap, label: "AI Agents" },
];

export const Hero = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Animated gradient orbs
      const orbs = [
        { x: w * 0.2 + Math.sin(t * 0.3) * 60, y: h * 0.3 + Math.cos(t * 0.2) * 40, r: 320, color: "rgba(124,58,237,0.12)" },
        { x: w * 0.8 + Math.cos(t * 0.25) * 80, y: h * 0.5 + Math.sin(t * 0.35) * 50, r: 280, color: "rgba(6,182,212,0.07)" },
        { x: w * 0.5 + Math.sin(t * 0.15) * 40, y: h * 0.7 + Math.cos(t * 0.4) * 30, r: 200, color: "rgba(124,58,237,0.08)" },
      ];
      orbs.forEach(({ x, y, r, color }) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // Dot grid
      const gap = 32;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          const dist = Math.hypot(x - w * 0.5, y - h * 0.5);
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 - dist * 0.015);
          ctx.globalAlpha = 0.04 * pulse;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      t += 0.008;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080808] border-b border-[#1a1a1a]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />

      <div className="relative max-w-screen-xl mx-auto px-4 pt-16 pb-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-[11px] font-semibold px-3 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7c3aed] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7c3aed]" />
            </span>
            LIVE · AI Intelligence Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[40px] md:text-[64px] font-bold text-[#f0f0f0] leading-[1.05] tracking-[-0.03em] max-w-3xl mb-5">
          The world's AI is{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#06b6d4] bg-clip-text text-transparent">
              moving fast.
            </span>
          </span>
          <br />
          Stay ahead of it.
        </h1>

        <p className="text-[16px] md:text-[18px] text-[#737373] max-w-xl mb-8 leading-relaxed">
          Foundation models, video AI, agents, and funding rounds — all in one daily briefing for builders at the frontier.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => navigate("/startup-apply")}
            className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold transition-all hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-95"
          >
            Submit Your Startup
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById("feed")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#111] border border-[#262626] hover:border-[#404040] text-[#a3a3a3] hover:text-[#f0f0f0] px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all"
          >
            Explore the Feed
          </button>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TAGS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => navigate(`/?cat=${label.toLowerCase().replace(/\s+/g, "-")}`)}
              className="inline-flex items-center gap-1.5 bg-[#111] border border-[#1f1f1f] hover:border-[#7c3aed]/40 text-[#737373] hover:text-[#f0f0f0] text-[12px] px-3 py-1.5 rounded-md transition-all"
            >
              <Icon size={12} className="text-[#7c3aed]" />
              {label}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#1a1a1a]">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-[#0d0d0d] px-5 py-4 text-center">
              <div className="text-[22px] md:text-[28px] font-bold text-[#f0f0f0] tracking-tight font-mono">{value}</div>
              <div className="text-[11px] text-[#404040] uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
