import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Zap, ArrowRight, ExternalLink, TrendingUp, Play } from "lucide-react";

const COMPANIES = [
  {
    name: "Runway ML",
    series: "Series D",
    raised: "$308M",
    valuation: "$4B",
    tagline: "Gen-3 Alpha. Video-to-video, image-to-video, text-to-video.",
    color: "#7c3aed",
    founded: "2018",
    hq: "New York",
    models: ["Gen-3 Alpha", "Motion Brush", "Inpainting"],
  },
  {
    name: "Pika Labs",
    series: "Series B",
    raised: "$80M",
    valuation: "$700M",
    tagline: "Consumer video AI. 2.0 brings physics-aware scene editing.",
    color: "#ec4899",
    founded: "2023",
    hq: "Palo Alto",
    models: ["Pika 2.0", "Pika Effects", "Lip Sync"],
  },
  {
    name: "Kling (Kuaishou)",
    series: "Series B",
    raised: "$200M",
    valuation: "$1.9B",
    tagline: "China's answer to Sora. 5s at 1080p, benchmark leader.",
    color: "#06b6d4",
    founded: "2023",
    hq: "Beijing",
    models: ["Kling 1.5", "Kling 2.0 (beta)"],
  },
  {
    name: "Luma AI",
    series: "Series B",
    raised: "$43M",
    valuation: "$380M",
    tagline: "Dream Machine. 3D NeRF pioneer now in generative video.",
    color: "#22c55e",
    founded: "2021",
    hq: "San Francisco",
    models: ["Dream Machine", "NeRF to Video"],
  },
  {
    name: "Synthesia",
    series: "Series D",
    raised: "$170M",
    valuation: "$2.1B",
    tagline: "Enterprise AI video. 230 avatars, 140 languages. No camera.",
    color: "#f97316",
    founded: "2017",
    hq: "London",
    models: ["Synthesia 2.0", "Expressive Avatars"],
  },
  {
    name: "Hedra",
    series: "Series A",
    raised: "$32M",
    valuation: "$200M",
    tagline: "Character AI. Audio-reactive video generation for storytelling.",
    color: "#a78bfa",
    founded: "2023",
    hq: "San Francisco",
    models: ["Character-1", "Character-2 (beta)"],
  },
];

const BENCHMARKS = [
  { metric: "Text-to-Video Quality", leader: "Sora (OpenAI)", score: "ELO 1420", note: "Human preference eval" },
  { metric: "Motion Coherence", leader: "Kling 2.0", score: "87.3", note: "CLIP-SIM over 5s" },
  { metric: "Prompt Following", leader: "Runway Gen-3", score: "92.1%", note: "VBench prompt alignment" },
  { metric: "Generation Speed", leader: "Pika 2.0", score: "12s avg", note: "512p 4s clip" },
  { metric: "Resolution Support", leader: "Kling 2.0", score: "4K", note: "Max output resolution" },
];

const RECENT_LAUNCHES = [
  { company: "OpenAI", event: "Sora now open to all Plus subscribers in 50 countries", days: 3 },
  { company: "Google DeepMind", event: "Veo 3 outperforms Sora on ELO benchmarks — announced at I/O", days: 7 },
  { company: "Runway ML", event: "Gen-3 Alpha Turbo: 4x faster inference for image-to-video", days: 12 },
  { company: "Pika Labs", event: "Pika 2.0 launches with physics-aware scene editing and 1080p support", days: 18 },
  { company: "Kling", event: "Kling 2.0 beta: 4K resolution, 30-second clips, new motion controls", days: 21 },
  { company: "Luma AI", event: "Dream Machine 1.6 achieves SOTA on EvalCrafter benchmark", days: 26 },
];

export default function VideoAIPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const totalRaised = COMPANIES.reduce((sum, c) => {
    const n = parseFloat(c.raised.replace(/[$MBK]/g, ""));
    return sum + (c.raised.includes("B") ? n * 1000 : n);
  }, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0]">

      {/* Hero */}
      <section className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <Video size={10} className="text-[#7c3aed]" />
              Video AI Coverage
            </span>
          </div>
          <h1 className="text-[32px] md:text-[52px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-4">
            The generative video<br />
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] bg-clip-text text-transparent">arms race.</span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-[#737373] max-w-xl leading-relaxed mb-6">
            From Sora to Runway to Kling — every company, model, and funding round in the race to own generative video.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/?cat=video-ai")}
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
            >
              <Zap size={13} fill="white" /> Read Video AI news
            </button>
            <button
              onClick={() => navigate("/funding")}
              className="inline-flex items-center gap-2 bg-[#111] border border-[#262626] hover:border-[#7c3aed]/40 text-[#a3a3a3] hover:text-[#f0f0f0] px-4 py-2 rounded-md text-[13px] font-medium transition-all"
            >
              Funding Wire <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-[#1a1a1a]">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-wrap gap-6 text-[13px]">
            <div><span className="font-bold text-[#f0f0f0] font-mono">${(totalRaised / 1000).toFixed(1)}B</span> <span className="text-[#404040]">raised by tracked companies</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">{COMPANIES.length}</span> <span className="text-[#404040]">companies tracked</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">620+</span> <span className="text-[#404040]">video AI startups in ecosystem</span></div>
            <div><span className="font-bold text-[#f0f0f0] font-mono">5</span> <span className="text-[#404040]">active benchmarks tracked</span></div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        {/* Main */}
        <div className="space-y-8">

          {/* Recent launches */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040]">Recent Updates</h2>
              <div className="flex-1 h-px bg-[#1f1f1f]" />
            </div>
            <div className="space-y-2">
              {RECENT_LAUNCHES.map((l, i) => (
                <button
                  key={i}
                  onClick={() => navigate("/?cat=video-ai")}
                  className="w-full flex items-start gap-4 px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#7c3aed]/30 hover:bg-[#111] transition-all text-left group"
                >
                  <span className="text-[10px] text-[#404040] font-mono shrink-0 pt-0.5 w-12">{l.days}d ago</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed] block mb-0.5">{l.company}</span>
                    <p className="text-[13px] text-[#d4d4d4] group-hover:text-white leading-snug transition-colors">{l.event}</p>
                  </div>
                  <ArrowRight size={13} className="text-[#333] group-hover:text-[#7c3aed] shrink-0 mt-1 transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* Company landscape */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#404040]">Company Landscape</h2>
              <div className="flex-1 h-px bg-[#1f1f1f]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANIES.map(c => (
                <div
                  key={c.name}
                  className="p-5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#7c3aed]/30 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === c.name ? null : c.name)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-[15px] font-bold text-[#f0f0f0]">{c.name}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold"
                          style={{ background: `${c.color}20`, color: c.color }}>{c.series}</span>
                      </div>
                      <p className="text-[12px] text-[#737373] leading-snug">{c.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[14px] font-bold text-[#f0f0f0] font-mono">{c.raised}</div>
                      <div className="text-[10px] text-[#404040]">{c.valuation}</div>
                    </div>
                  </div>
                  {expanded === c.name && (
                    <div className="mt-3 pt-3 border-t border-[#1a1a1a] space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-[#737373]">
                        <span>Founded {c.founded}</span>
                        <span className="text-[#262626]">·</span>
                        <span>{c.hq}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.models.map(m => (
                          <span key={m} className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] border border-[#262626] text-[#737373] flex items-center gap-1">
                            <Play size={8} className="text-[#7c3aed]" />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="space-y-4">

          {/* Benchmarks */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#1a1a1a] flex items-center gap-2">
              <TrendingUp size={13} className="text-[#7c3aed]" />
              <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#f0f0f0]">Benchmark Leaders</h3>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {BENCHMARKS.map(b => (
                <div key={b.metric} className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#404040] mb-1">{b.metric}</p>
                  <p className="text-[13px] font-semibold text-[#f0f0f0]">{b.leader}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-mono text-[#7c3aed]">{b.score}</span>
                    <span className="text-[10px] text-[#404040]">· {b.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0d0d0d] border border-[#7c3aed]/20 rounded-xl p-4">
            <p className="text-[13px] font-semibold text-[#f0f0f0] mb-1">Submit your video AI startup</p>
            <p className="text-[12px] text-[#737373] mb-3">Get listed in the LaunchCode ecosystem tracker.</p>
            <button
              onClick={() => navigate("/startup-apply")}
              className="w-full py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-md text-[12px] font-semibold transition-all"
            >
              Apply now →
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
