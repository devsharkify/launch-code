import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { toast } from "sonner";
import { Phone, Loader2, Shield, ChevronLeft, Zap } from "lucide-react";

export default function LoginPage({ onLoginSuccess }) {
  useContext(AppContext);
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSendOtp = async () => {
    if (phone.length !== 10) { toast.error("Enter valid 10-digit number"); return; }
    try {
      setLoading(true);
      await axios.post(`${API}/auth/send-otp`, { mobile: phone, country_code: "91" });
      toast.success("OTP sent!");
      setStep("otp");
      setResendCooldown(30);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    } finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
      setLoading(true); setOtp("");
      await axios.post(`${API}/auth/resend-otp`, { mobile: phone });
      toast.success("OTP resent!");
      setResendCooldown(30);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to resend OTP");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { toast.error("Enter 6-digit OTP"); return; }
    try {
      setLoading(true);
      const response = await axios.post(`${API}/auth/verify-otp`, { mobile: phone, otp, country_code: "91" });
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userPhone", phone);
      onLoginSuccess(response.data.user, response.data.is_admin);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid OTP");
    } finally { setLoading(false); }
  };

  return (
    <div
      data-testid="reporter-login-page"
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#080808]"
    >
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#7c3aed]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="mb-10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-lg bg-[#7c3aed] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)]">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-mono text-[22px] font-bold text-[#f0f0f0] tracking-tight">
            Launch<span className="text-[#7c3aed]">Code</span>
          </span>
        </div>
        <p className="text-[12px] text-[#404040] uppercase tracking-widest">Reporter & Admin Access</p>
      </div>

      {/* Phone Step */}
      {step === "phone" && (
        <div
          data-testid="phone-step"
          className="w-full max-w-sm p-7 rounded-2xl relative z-10 border bg-[#0d0d0d] border-[#1f1f1f]"
        >
          <button
            data-testid="back-to-home"
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-[12px] mb-5 text-[#404040] hover:text-[#7c3aed] transition-colors"
          >
            <ChevronLeft size={14} /> Back to feed
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center mx-auto mb-3">
              <Phone size={20} className="text-[#7c3aed]" />
            </div>
            <h2 className="text-[16px] font-bold text-[#f0f0f0]">Sign in</h2>
            <p className="text-[12px] mt-1 text-[#404040]">Enter your mobile number to continue</p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-3 rounded-md font-mono text-[13px] bg-[#111] border border-[#262626] text-[#7c3aed]">
                +91
              </div>
              <input
                data-testid="phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9876543210"
                maxLength={10}
                className="flex-1 text-[15px] tracking-wider h-11 rounded-md bg-[#111] border border-[#262626] text-[#f0f0f0] placeholder:text-[#333] px-3 outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
              />
            </div>

            <button
              data-testid="send-otp-btn"
              onClick={handleSendOtp}
              disabled={loading || phone.length !== 10}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white h-11 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <><Phone size={15} /> Send OTP</>}
            </button>
          </div>
        </div>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <div
          data-testid="otp-step"
          className="w-full max-w-sm p-7 rounded-2xl relative z-10 border bg-[#0d0d0d] border-[#1f1f1f]"
        >
          <button
            data-testid="back-to-phone"
            onClick={() => { setStep("phone"); setOtp(""); }}
            className="flex items-center gap-1 text-[12px] mb-5 text-[#404040] hover:text-[#7c3aed] transition-colors"
          >
            <ChevronLeft size={14} /> Change Number
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center mx-auto mb-3">
              <Shield size={20} className="text-[#7c3aed]" />
            </div>
            <h2 className="text-[16px] font-bold text-[#f0f0f0]">Verify OTP</h2>
            <p className="text-[12px] mt-1 text-[#404040]">Code sent to +91 {phone}</p>
          </div>

          <div className="space-y-3">
            <input
              data-testid="otp-input"
              type="tel"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="● ● ● ● ● ●"
              maxLength={6}
              className="w-full text-[22px] text-center tracking-[0.6em] h-14 rounded-md bg-[#111] border border-[#262626] text-[#f0f0f0] placeholder:text-[#333] px-3 outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
            />

            <button
              data-testid="verify-otp-btn"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white h-11 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <><Shield size={15} /> Verify & Login</>}
            </button>

            <button
              data-testid="resend-otp-btn"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || loading}
              className={`w-full text-[12px] font-medium py-2 transition-colors ${
                resendCooldown > 0 ? "text-[#333]" : "text-[#7c3aed] hover:text-[#6d28d9]"
              }`}
            >
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-8 text-[11px] relative z-10 text-[#262626]">Secure login via SMS verification</p>
    </div>
  );
}

export { LoginPage };
