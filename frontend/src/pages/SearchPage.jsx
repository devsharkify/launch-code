import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { Search, X, Loader2, TrendingUp, Hash } from "lucide-react";
import { NewsCard } from "../components/NewsCard";
import { MOCK_ARTICLES } from "../data/mockArticles";

const SUGGESTED = [
  "Claude 4", "Runway Gen-4", "AI agents", "SWE-bench", "Perplexity funding",
  "Veo 3", "DeepSeek R3", "open source LLM", "video AI", "foundation model",
];

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "ai-models", label: "Models" },
  { value: "video-ai", label: "Video AI" },
  { value: "funding", label: "Funding" },
  { value: "agents", label: "Agents" },
  { value: "research", label: "Research" },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const initialQ = searchParams.get("q") || "";
  const initialCat = searchParams.get("cat") || "all";

  const [query, setQuery] = useState(initialQ);
  const [inputValue, setInputValue] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q, cat) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      let url = `${API}/news/search?q=${encodeURIComponent(q)}&limit=20`;
      if (cat && cat !== "all") url += `&category=${cat}`;
      const res = await axios.get(url, { timeout: 4000 });
      const data = Array.isArray(res.data) ? res.data : res.data?.articles || [];
      setResults(data);
      setTotal(res.data?.total || data.length);
    } catch {
      const q_lower = q.toLowerCase();
      let mock = MOCK_ARTICLES.filter(a =>
        a.title.toLowerCase().includes(q_lower) ||
        (a.summary || "").toLowerCase().includes(q_lower)
      );
      if (cat && cat !== "all") mock = mock.filter(a => a.category === cat);
      setResults(mock);
      setTotal(mock.length);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) doSearch(initialQ, initialCat);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (inputRef.current && !initialQ) inputRef.current.focus();
  }, [initialQ]);

  const handleInput = (val) => {
    setInputValue(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQuery(val);
      if (val.length >= 2) {
        setSearchParams(val ? { q: val, ...(category !== "all" ? { cat: category } : {}) } : {});
        doSearch(val, category);
      } else {
        setResults([]);
        setSearched(false);
      }
    }, 350);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (query.length >= 2) {
      setSearchParams({ q: query, ...(cat !== "all" ? { cat } : {}) });
      doSearch(query, cat);
    }
  };

  const handleSuggestion = (s) => {
    setInputValue(s);
    setQuery(s);
    setSearchParams({ q: s });
    doSearch(s, category);
  };

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
    setResults([]);
    setSearched(false);
    setSearchParams({});
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">

        {/* Search input */}
        <div className="relative mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040] pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => handleInput(e.target.value)}
            placeholder="Search AI news, models, funding…"
            className="w-full pl-11 pr-10 py-3.5 text-[15px] rounded-xl border border-[#262626] bg-[#111] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
            autoComplete="off"
          />
          {inputValue && (
            <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#404040] hover:text-[#f0f0f0] transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => handleCategoryChange(c.value)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                category === c.value
                  ? "bg-[#7c3aed] text-white"
                  : "bg-[#111] border border-[#1f1f1f] text-[#737373] hover:text-[#f0f0f0] hover:border-[#262626]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        {searched && !loading && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[13px] text-[#737373]">
              {total > 0 ? (
                <><span className="text-[#f0f0f0] font-semibold">{total}</span> result{total !== 1 ? "s" : ""} for <span className="text-[#7c3aed]">"{query}"</span></>
              ) : (
                <>No results for <span className="text-[#7c3aed]">"{query}"</span></>
              )}
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3">
            <Loader2 size={20} className="animate-spin text-[#7c3aed]" />
            <span className="text-[13px] text-[#404040]">Searching…</span>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map(article => (
              <NewsCard key={article.id || article._id} article={article} articlesList={results} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && searched && results.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#111] border border-[#1f1f1f] flex items-center justify-center">
              <Search size={22} className="text-[#333]" />
            </div>
            <div className="text-center">
              <h3 className="text-[15px] font-semibold text-[#f0f0f0] mb-1">No results found</h3>
              <p className="text-[13px] text-[#404040]">Try a different search term or category</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {SUGGESTED.slice(0, 5).map(s => (
                <button key={s} onClick={() => handleSuggestion(s)}
                  className="text-[12px] px-3 py-1.5 rounded-full bg-[#111] border border-[#1f1f1f] text-[#737373] hover:text-[#7c3aed] hover:border-[#7c3aed]/30 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Initial state — trending searches */}
        {!loading && !searched && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-[#7c3aed]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#404040]">Trending searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => handleSuggestion(s)}
                  className="flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f] text-[#a3a3a3] hover:text-[#7c3aed] hover:border-[#7c3aed]/30 transition-colors">
                  <Hash size={11} className="text-[#333]" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
