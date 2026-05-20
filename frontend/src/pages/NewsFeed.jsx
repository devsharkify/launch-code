import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API, AppContext } from "../App";
import { CategoryChips } from "../components/CategoryChips";
import { NewsCard } from "../components/NewsCard";
import { FeaturedCard, CompactCard } from "../components/FeaturedCard";
import { ModelLeaderboard } from "../components/ModelLeaderboard";
import { FundingWire } from "../components/FundingWire";
import { Hero } from "../components/Hero";
import { MOCK_ARTICLES } from "../data/mockArticles";
import { Loader2, Newspaper, X, Search } from "lucide-react";
import { Button } from "../components/ui/button";

const SORT_OPTIONS = [
  { value: "newest", label: "New to Old" },
  { value: "oldest", label: "Old to New" },
];

const TIME_FILTERS = [
  { value: "all", label: "All Time" },
  { value: "1d", label: "Last 1 Day" },
  { value: "1w", label: "Last 1 Week" },
  { value: "1m", label: "Last 1 Month" },
];

const LIMIT = 10;

export default function NewsFeed() {
  const { } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const urlCat = new URLSearchParams(location.search).get("cat") || "all";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(urlCat);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [timeFilter, setTimeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTotal, setSearchTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [usingMock, setUsingMock] = useState(false);
  const searchTimerRef = useRef(null);

  useEffect(() => { setActiveCategory(urlCat); }, [urlCat]);

  const getFilteredMock = useCallback((category, sort, query) => {
    let results = [...MOCK_ARTICLES];
    if (category && category !== "all") {
      results = results.filter(a => a.category === category || a.category_label?.toLowerCase().includes(category.replace(/-/g, " ")));
      if (results.length === 0) results = MOCK_ARTICLES.slice(0, 6);
    }
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(q) || a.summary?.toLowerCase().includes(q)
      );
    }
    if (sort === "oldest") results = results.reverse();
    return results;
  }, []);

  const fetchNews = useCallback(async (category, skip = 0, append = false, sort = "newest", time = "all") => {
    try {
      if (skip === 0) setLoading(true); else setLoadingMore(true);
      let url = `${API}/news/feed?limit=${LIMIT}&skip=${skip}&sort=${sort}&time_filter=${time}`;
      if (category !== "all") url = `${API}/news/category/${category}?limit=${LIMIT}&skip=${skip}&sort=${sort}&time_filter=${time}`;
      const response = await axios.get(url, { timeout: 4000 });
      const newArticles = response.data;
      if (newArticles.length > 0) {
        if (append) setArticles(prev => [...prev, ...newArticles]);
        else setArticles(newArticles);
        setHasMore(newArticles.length === LIMIT);
        setUsingMock(false);
      } else {
        if (!append) { setArticles(getFilteredMock(category, sort)); setUsingMock(true); setHasMore(false); }
      }
    } catch {
      if (!append) { setArticles(getFilteredMock(category, sort)); setUsingMock(true); setHasMore(false); }
    } finally {
      setLoading(false); setLoadingMore(false);
    }
  }, [getFilteredMock]);

  const searchNews = useCallback(async (query, skip = 0, append = false) => {
    if (!query || query.length < 2) return;
    try {
      if (skip === 0) setLoading(true); else setLoadingMore(true);
      const response = await axios.get(`${API}/news/search?q=${encodeURIComponent(query)}&limit=${LIMIT}&skip=${skip}`, { timeout: 4000 });
      const data = response.data;
      if (append) setArticles(prev => [...prev, ...data.articles]);
      else setArticles(data.articles);
      setSearchTotal(data.total);
      setHasMore(data.articles.length === LIMIT);
      setUsingMock(false);
    } catch {
      const filtered = getFilteredMock("all", sortBy, query);
      if (!append) { setArticles(filtered); setUsingMock(true); setHasMore(false); setSearchTotal(filtered.length); }
    } finally { setLoading(false); setLoadingMore(false); }
  }, [getFilteredMock, sortBy]);

  useEffect(() => {
    if (isSearching && searchQuery.length >= 2) { searchNews(searchQuery, 0); setPage(0); }
    else if (!isSearching) { fetchNews(activeCategory, 0, false, sortBy, timeFilter); setPage(0); }
  }, [activeCategory, sortBy, timeFilter, fetchNews, isSearching, searchQuery, searchNews]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat); setPage(0);
    if (cat === "all") navigate("/"); else navigate(`/?cat=${cat}`);
  };

  const handleLoadMore = () => {
    const next = page + 1; setPage(next);
    if (isSearching) searchNews(searchQuery, next * LIMIT, true);
    else fetchNews(activeCategory, next * LIMIT, true, sortBy, timeFilter);
  };

  const handleSearchInput = (value) => {
    setSearchInput(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (value.length >= 2) {
      searchTimerRef.current = setTimeout(() => { setSearchQuery(value); setIsSearching(true); }, 400);
    } else if (value.length === 0) { setSearchQuery(""); setIsSearching(false); }
  };

  const clearSearch = () => {
    setSearchInput(""); setSearchQuery(""); setIsSearching(false);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
  };

  const isHome = activeCategory === "all" && !isSearching;
  const showHero = isHome && !searchInput;

  return (
    <div data-testid="news-feed-page" className="min-h-screen bg-[#080808]">

      {/* Hero — only on home feed */}
      {showHero && <Hero />}

      {/* Search + filter bar */}
      <div className="flex items-center gap-2 py-3 px-4 bg-[#080808]/95 sticky top-[84px] z-30 border-b border-[#1a1a1a] backdrop-blur-md" id="feed">
        <div className="relative flex-1 flex items-center">
          <Search size={14} className="absolute left-3 text-[#404040] pointer-events-none" />
          <input
            data-testid="search-input"
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search AI news…"
            className="w-full pl-9 pr-28 py-2 text-[13px] rounded-md border border-[#262626] bg-[#111] text-[#f0f0f0] placeholder:text-[#333] outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
          />
          {isSearching && !loading && (
            <span className="absolute right-10 text-[11px] text-[#7c3aed] font-medium pointer-events-none">
              {`${searchTotal} result${searchTotal !== 1 ? "s" : ""}`}
            </span>
          )}
          {searchInput && (
            <button onClick={clearSearch} className="absolute right-3 p-0.5 rounded text-[#404040] hover:text-[#f0f0f0]">
              <X size={14} />
            </button>
          )}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="text-[12px] font-medium rounded-md border border-[#262626] bg-[#111] text-[#a3a3a3] px-3 py-2 outline-none cursor-pointer hover:border-[#7c3aed] transition">
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}
          className="text-[12px] font-medium rounded-md border border-[#262626] bg-[#111] text-[#a3a3a3] px-3 py-2 outline-none cursor-pointer hover:border-[#7c3aed] transition">
          {TIME_FILTERS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category chips */}
      <CategoryChips activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[#7c3aed] mb-3" />
          <p className="text-[13px] text-[#404040]">Loading intelligence…</p>
        </div>
      )}

      {/* Empty */}
      {!loading && articles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#7c3aed]/10 border border-[#7c3aed]/20">
            <Newspaper size={24} className="text-[#7c3aed]" />
          </div>
          <h3 className="text-[15px] font-semibold mb-1 text-[#f0f0f0]">No articles found</h3>
          <p className="text-[12px] text-[#404040] text-center max-w-[220px]">Try adjusting your filters or category</p>
        </div>
      )}

      {/* Content */}
      {!loading && articles.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 py-6">

          {/* Mock data notice */}
          {usingMock && (
            <div className="mb-4 px-3 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-lg flex items-center gap-2">
              <span className="text-[11px] text-[#a78bfa]">
                ✦ Showing curated demo content — connect the backend to load live data.
              </span>
            </div>
          )}

          {/* Home layout: bento + sidebar */}
          {isHome ? (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Main column */}
              <div className="flex-1 min-w-0 space-y-6">

                {/* Bento grid — top 4 articles */}
                {articles.length >= 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040]">Top Stories</h2>
                      <div className="flex-1 h-px bg-[#1f1f1f]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {articles[0] && <div className="md:col-span-2"><FeaturedCard article={articles[0]} /></div>}
                      {articles[1] && <FeaturedCard article={articles[1]} />}
                      {articles[2] && <FeaturedCard article={articles[2]} />}
                    </div>
                  </div>
                )}

                {/* Video AI spotlight */}
                {articles.filter(a => a.category === "video-ai").length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040]">Video AI</h2>
                      <div className="flex-1 h-px bg-[#1f1f1f]" />
                      <button onClick={() => handleCategoryChange("video-ai")} className="text-[11px] text-[#404040] hover:text-[#7c3aed] transition-colors">See all →</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {articles.filter(a => a.category === "video-ai").slice(0, 3).map(a => (
                        <NewsCard key={a.id} article={a} articlesList={articles} />
                      ))}
                    </div>
                  </div>
                )}

                {/* More stories */}
                {articles.length > 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#404040]">Latest</h2>
                      <div className="flex-1 h-px bg-[#1f1f1f]" />
                    </div>
                    <div className="columns-1 md:columns-2 gap-4 space-y-4">
                      {articles.slice(3).filter(a => a.category !== "video-ai").map(a => (
                        <div key={a.id} className="break-inside-avoid">
                          <NewsCard article={a} articlesList={articles} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="lg:w-72 xl:w-80 shrink-0 space-y-4">
                <ModelLeaderboard />
                <FundingWire />

                {/* Recent compact list */}
                <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
                  <div className="px-4 pt-4 pb-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#f0f0f0]">Quick Read</h3>
                  </div>
                  <div className="border-t border-[#1a1a1a] p-3 space-y-2">
                    {articles.slice(0, 5).map(a => (
                      <CompactCard key={a.id} article={a} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Category / search layout */
            <div>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[18px] font-bold text-[#f0f0f0] tracking-tight">
                  {isSearching ? `Results for "${searchQuery}"` : activeCategory.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </h2>
                <div className="flex-1 h-px bg-[#1f1f1f]" />
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {articles.map(a => (
                  <div key={a.id} className="break-inside-avoid">
                    <NewsCard article={a} articlesList={articles} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10 mb-6">
              <Button
                data-testid="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-md px-8 py-3 text-[13px] font-semibold tracking-wide transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
              >
                {loadingMore ? <><Loader2 size={14} className="animate-spin mr-2" />Loading…</> : "Load More"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { NewsFeed };
