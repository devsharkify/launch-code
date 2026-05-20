import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import axios from "axios";
import { API } from "../App";

const MOCK_HEADLINES = [
  "Claude 4 Opus tops SWE-bench with 92.3% accuracy",
  "Runway raises $308M Series D at $4B valuation",
  "Veo 3 launches with native audio generation",
  "Perplexity closes $500M Series D round",
  "DeepSeek R3 achieves AIME 2025 record: 28/30",
  "OpenAI GPT-5 enters limited preview for enterprise",
  "Mistral Large 3 open-weights release drops today",
  "Google DeepMind AlphaFold 3 paper published in Nature",
  "Together AI raises $305M for open-source AI infra",
  "Moonshot AI secures $1B in China's largest AI round",
];

export const BreakingTicker = () => {
  const navigate = useNavigate();
  const [headlines, setHeadlines] = useState(MOCK_HEADLINES);
  const tickerRef = useRef(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get(`${API}/news/feed?limit=10&sort=newest`, { timeout: 3000 });
        if (res.data?.length >= 3) {
          setHeadlines(res.data.map(a => a.title));
        }
      } catch {
        /* use mock */
      }
    };
    fetchLatest();
  }, []);

  const text = headlines.join("   ·   ");

  return (
    <div className="w-full bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center overflow-hidden h-8">
      {/* Label */}
      <div className="flex items-center gap-1.5 px-3 shrink-0 border-r border-[#1f1f1f] h-full bg-[#7c3aed]">
        <Zap size={10} className="text-white" fill="white" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={tickerRef}
          className="flex items-center whitespace-nowrap h-8"
          style={{ animation: "ticker 60s linear infinite" }}
        >
          <span
            className="text-[11px] text-[#737373] px-6 cursor-pointer hover:text-[#a78bfa] transition-colors"
            onClick={() => navigate("/")}
          >
            {text}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{text}
          </span>
        </div>
      </div>
    </div>
  );
};
