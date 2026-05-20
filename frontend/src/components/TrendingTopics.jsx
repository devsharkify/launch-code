import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Hash, ArrowUpRight, Flame } from "lucide-react";
import axios from "axios";
import { API } from "../App";

const MOCK_TOPICS = [
  { keyword: "Claude 4 Opus", count: 38, delta: "+12", category: "ai-models" },
  { keyword: "Runway Gen-4", count: 31, delta: "+8", category: "video-ai" },
  { keyword: "Veo 3", count: 29, delta: "+19", category: "video-ai" },
  { keyword: "GPT-5 Release", count: 26, delta: "+5", category: "ai-models" },
  { keyword: "AI Agents", count: 24, delta: "+7", category: "agents" },
  { keyword: "Perplexity Series D", count: 22, delta: "+3", category: "funding" },
  { keyword: "DeepSeek R3", count: 19, delta: "+4", category: "research" },
  { keyword: "Open Source LLM", count: 17, delta: "+2", category: "open-source" },
  { keyword: "AI Infrastructure", count: 15, delta: "+6", category: "infra" },
  { keyword: "Sora 2", count: 14, delta: "+9", category: "video-ai" },
];

export const TrendingTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState(MOCK_TOPICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${API}/news/trending`, { timeout: 3000 });
        if (res.data?.topics?.length > 0) {
          setTopics(res.data.topics);
        }
      } catch {
        /* use mock */
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const maxCount = Math.max(...topics.map(t => t.count));

  return (
    <section className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#7c3aed]/15 flex items-center justify-center">
            <TrendingUp size={12} className="text-[#7c3aed]" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#f0f0f0]">Trending</span>
        </div>
        <div className="flex items-center gap-1 text-[#404040]">
          <Hash size={11} />
          <span className="text-[10px] font-mono text-[#404040]">24h</span>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a]" />

      {/* Topic list */}
      <div className="py-1">
        {topics.slice(0, 8).map((topic, i) => {
          const barWidth = Math.round((topic.count / maxCount) * 100);
          const isHot = i < 3;
          return (
            <button
              key={topic.keyword}
              onClick={() => navigate(`/?cat=${topic.category || "all"}`)}
              className="w-full group px-4 py-2.5 hover:bg-[#111] transition-colors text-left relative overflow-hidden"
            >
              {/* Background bar */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#7c3aed]/5 transition-all duration-500"
                style={{ width: `${barWidth}%` }}
              />
              <div className="relative flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-[10px] font-bold w-4 shrink-0 ${
                    i === 0 ? "text-[#f59e0b]" : i === 1 ? "text-[#737373]" : i === 2 ? "text-[#cd7c2f]" : "text-[#333]"
                  }`}>
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-medium text-[#e5e5e5] group-hover:text-white transition-colors truncate leading-none">
                        {topic.keyword}
                      </span>
                      {isHot && <Flame size={10} className="text-[#f59e0b] shrink-0" />}
                    </div>
                    <span className="text-[9px] text-[#333] font-mono mt-0.5 block">
                      {topic.count} articles
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-semibold text-[#22c55e]">{topic.delta}</span>
                  <ArrowUpRight size={10} className="text-[#333] group-hover:text-[#7c3aed] transition-colors" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-[#1a1a1a]">
        <p className="text-[10px] text-[#333] font-mono">Updated every 15 minutes</p>
      </div>
    </section>
  );
};
