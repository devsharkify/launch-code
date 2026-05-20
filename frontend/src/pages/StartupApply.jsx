import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { Zap, CheckCircle, Video, Cpu, DollarSign, Layers, ArrowRight } from "lucide-react";

const AI_CATEGORIES = [
  { icon: Cpu, label: "Foundation Models" },
  { icon: Video, label: "Video AI" },
  { icon: Layers, label: "AI Agents" },
  { icon: DollarSign, label: "AI Infrastructure" },
  { icon: Zap, label: "Generative AI" },
  { icon: CheckCircle, label: "Computer Vision" },
];

const STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Bootstrapped"];

export default function StartupApply() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", website: "", founder: "", email: "", category: "", stage: "", description: "", twitter: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await axios.post(`${API}/startups/apply`, form, { timeout: 5000 }); } catch {}
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_32px_rgba(124,58,237,0.3)]">
          <CheckCircle size={28} className="text-[#7c3aed]" />
        </div>
        <h2 className="text-[28px] font-bold text-[#f0f0f0] tracking-tight mb-3">Application received.</h2>
        <p className="text-[14px] text-[#737373] leading-relaxed mb-8">We review every submission personally. Expect a reply within 48 hours.</p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-lg text-[14px] font-semibold transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
          Back to the feed <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] text-[11px] font-semibold px-3 py-1 rounded-full mb-4">
            <Zap size={10} fill="currentColor" /> SUBMIT YOUR STARTUP
          </div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#f0f0f0] tracking-tight leading-tight mb-3">
            Get your AI startup<br />in front of 180k builders.
          </h1>
          <p className="text-[14px] text-[#737373] leading-relaxed">LaunchCode covers companies shaping the future of AI. Submit for editorial review.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Startup Name *</label>
              <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Acme AI"
                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Website *</label>
              <input required type="url" value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://acme.ai"
                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Founder Name *</label>
              <input required value={form.founder} onChange={e => set("founder", e.target.value)} placeholder="Jane Doe"
                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Work Email *</label>
              <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@acme.ai"
                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AI_CATEGORIES.map(({ icon: Icon, label }) => (
                <button type="button" key={label} onClick={() => set("category", label)}
                  className={"flex items-center gap-2 px-3 py-2 rounded-md border text-[12px] font-medium transition-all " + (form.category === label ? "bg-[#7c3aed]/15 border-[#7c3aed]/50 text-[#a78bfa]" : "bg-[#111] border-[#262626] text-[#737373] hover:border-[#404040] hover:text-[#f0f0f0]")}>
                  <Icon size={12} className={form.category === label ? "text-[#7c3aed]" : "text-[#404040]"} />{label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Stage *</label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map(stage => (
                <button type="button" key={stage} onClick={() => set("stage", stage)}
                  className={"px-3 py-1.5 rounded-md border text-[12px] font-medium transition-all " + (form.stage === stage ? "bg-[#7c3aed]/15 border-[#7c3aed]/50 text-[#a78bfa]" : "bg-[#111] border-[#262626] text-[#737373] hover:border-[#404040]")}>
                  {stage}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">What does your startup do? *</label>
            <textarea required rows={4} value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="Describe your product, the problem you solve, and what makes it unique in the AI space…"
              className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#404040] mb-1.5">Twitter / X handle</label>
            <input value={form.twitter} onChange={e => set("twitter", e.target.value)} placeholder="@acme_ai"
              className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2.5 text-[13px] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all" />
          </div>
          <button type="submit" disabled={loading || !form.category || !form.stage}
            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-lg text-[14px] font-semibold transition-all hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2">
            {loading ? "Submitting…" : (<>Submit for Review <ArrowRight size={15} /></>)}
          </button>
          <p className="text-center text-[11px] text-[#333]">We review every application personally. No spam, ever.</p>
        </form>
      </div>
    </div>
  );
}
