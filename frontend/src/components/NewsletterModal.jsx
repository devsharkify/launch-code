import { useState, useEffect } from "react";
import { X, Zap, Mail } from "lucide-react";

export const NewsletterModal = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("newsletter_dismissed")) return;
    const timer = setTimeout(() => setVisible(true), 25000);
    const onScroll = () => {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct > 50 && !localStorage.getItem("newsletter_dismissed")) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const dismiss = () => {
    localStorage.setItem("newsletter_dismissed", "1");
    setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem("newsletter_dismissed", "1");
    setTimeout(() => setVisible(false), 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4" onClick={dismiss}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-[#0d0d0d] border border-[#7c3aed]/30 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(124,58,237,0.12)] animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={dismiss} className="absolute top-3 right-3 p-1.5 rounded-md text-[#404040] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors">
          <X size={15} />
        </button>

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] mb-4">
          <Zap size={18} className="text-white" fill="white" />
        </div>

        {!submitted ? (
          <>
            <h2 className="text-[20px] font-bold text-[#f0f0f0] tracking-tight leading-tight mb-2">
              The AI briefing for builders
            </h2>
            <p className="text-[13px] text-[#737373] leading-relaxed mb-5">
              Models, funding, and breakthroughs — curated daily. 180k+ AI builders read it every morning.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#404040] pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@startup.ai"
                    className="w-full pl-8 pr-3 py-2.5 text-[13px] rounded-md border border-[#262626] bg-[#111] text-[#f0f0f0] placeholder:text-[#404040] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] whitespace-nowrap"
                >
                  Join →
                </button>
              </div>
              <p className="text-[11px] text-[#333] text-center">Free · No spam · Unsubscribe anytime</p>
            </form>
            <button onClick={dismiss} className="mt-3 w-full text-[11px] text-[#333] hover:text-[#737373] transition-colors">
              No thanks
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mx-auto mb-3">
              <Zap size={20} className="text-[#22c55e]" />
            </div>
            <h3 className="text-[17px] font-bold text-[#f0f0f0] mb-1">You're in!</h3>
            <p className="text-[13px] text-[#737373]">First issue arrives tomorrow morning.</p>
          </div>
        )}
      </div>
    </div>
  );
};
