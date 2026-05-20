import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Twitter, Linkedin, ChevronLeft, Zap } from "lucide-react";

const CONTACTS = [
  { label: "Newsroom", email: "editor@launchcode.ai" },
  { label: "Advertising", email: "advertise@launchcode.ai" },
  { label: "Careers", email: "careers@launchcode.ai" },
  { label: "Legal", email: "legal@launchcode.ai" },
];

const SOCIALS = [
  { label: "X / Twitter", handle: "@launchcode_ai", href: "https://twitter.com/launchcode_ai", Icon: Twitter },
  { label: "LinkedIn", handle: "/company/launchcode-ai", href: "https://linkedin.com/company/launchcode-ai", Icon: Linkedin },
];

const inputClass = "w-full rounded-md px-3 py-2 text-[13px] border border-[#262626] bg-[#111] text-[#f0f0f0] placeholder:text-[#404040] focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-colors";

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#404040] hover:text-[#f0f0f0] transition-colors mb-8 text-[13px]">
          <ChevronLeft size={15} /> Back
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-[#7c3aed] flex items-center justify-center">
              <Mail size={12} className="text-white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7c3aed] font-mono">Contact</span>
          </div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#f0f0f0] tracking-tight leading-tight mb-3">
            Get in touch
          </h1>
          <p className="text-[15px] text-[#737373] leading-relaxed">
            Tips, pitches, complaints, or compliments — we read everything. Fastest route is email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Contact details */}
          <div className="space-y-4">
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#404040] mb-4">Reach us</h2>
              <div className="space-y-3">
                {CONTACTS.map(({ label, email }) => (
                  <div key={label}>
                    <div className="text-[11px] font-semibold text-[#737373] uppercase tracking-wide mb-0.5">{label}</div>
                    <a href={`mailto:${email}`} className="text-[13px] text-[#a78bfa] hover:text-[#7c3aed] transition-colors">
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#404040] mb-4">Follow</h2>
              <div className="space-y-3">
                {SOCIALS.map(({ label, handle, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[13px] text-[#737373] hover:text-[#f0f0f0] transition-colors group">
                    <Icon size={14} className="group-hover:text-[#7c3aed] transition-colors" />
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-[#7c3aed]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#404040]">HQ</span>
              </div>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                San Francisco, CA<br />
                Remote-first · AI-native
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#404040] mb-4">Send a note</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-[#737373] mb-1">Name</label>
                <input name="name" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#737373] mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className={inputClass} placeholder="you@startup.ai" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#737373] mb-1">Subject</label>
                <input name="subject" type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required className={inputClass} placeholder="What is this about?" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#737373] mb-1">Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className={inputClass} placeholder="Tell us more…" />
              </div>
              <button type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                Send message
              </button>
              {sent && (
                <p className="text-[12px] text-[#22c55e] font-medium text-center">
                  Thanks — we'll respond within 48 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
