import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API, AppContext } from "../App";
import { Clock, ArrowLeft, Share2, Link2, Check, Bookmark, BookmarkCheck, Zap } from "lucide-react";
import { MOCK_ARTICLES } from "../data/mockArticles";

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  const update = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const height = el.scrollHeight - el.clientHeight;
    setProgress(height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);
  return progress;
}

const AI_DEFAULT_IMAGES = {
  "ai-models": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
  "video-ai": "https://images.pexels.com/photos/7567555/pexels-photo-7567555.jpeg?auto=compress&cs=tinysrgb&w=800",
  "funding": "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
  "agents": "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
  "research": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
  "default": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
};

function getImage(article) {
  return article.image || AI_DEFAULT_IMAGES[article.category] || AI_DEFAULT_IMAGES.default;
}

function formatTime(dateStr) {
  try {
    const d = new Date(dateStr);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let h = d.getHours(); const ampm = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${h}:${d.getMinutes().toString().padStart(2,"0")} ${ampm}`;
  } catch { return ""; }
}

function timeAgo(dateStr) {
  try {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch { return ""; }
}

function SidebarCard({ article, onClick }) {
  return (
    <button
      onClick={() => onClick(article)}
      className="flex gap-2.5 w-full text-left group rounded-lg p-2 -mx-2 hover:bg-[#1a1a1a] transition-colors"
    >
      <div className="shrink-0 w-[72px] h-[54px] rounded-md overflow-hidden">
        <img
          src={getImage(article)}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { e.target.src = AI_DEFAULT_IMAGES.default; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#7c3aed] block mb-0.5 font-mono">{article.category_label}</span>
        <p className="text-[12px] font-semibold leading-snug line-clamp-2 text-[#d4d4d4] group-hover:text-white transition-colors">{article.title}</p>
        <span className="text-[10px] mt-0.5 block text-[#404040]">{timeAgo(article.published_at)}</span>
      </div>
    </button>
  );
}

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openArticle, saveArticle, isArticleSaved } = useContext(AppContext);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const readingProgress = useReadingProgress();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/news/article/${id}`, { timeout: 4000 })
      .then(res => { setArticle(res.data); setLoading(false); })
      .catch(() => {
        const mock = MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0];
        setArticle(mock);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!article) return;
    axios.get(`${API}/news/category/${article.category}?limit=6`, { timeout: 4000 })
      .then(res => {
        const items = (res.data.articles || res.data || []).filter(a => (a.id || a._id) !== id).slice(0, 5);
        setRelatedArticles(items);
      })
      .catch(() => {
        const related = MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== id).slice(0, 4);
        setRelatedArticles(related);
      });
  }, [article, id]);

  const shareUrl = `https://launchcode.ai/news/${id}`;

  useEffect(() => {
    if (article?.title) document.title = `${article.title} — LaunchCode`;
    return () => { document.title = "LaunchCode — AI Intelligence for Builders"; };
  }, [article]);

  const handleShare = () => {
    const text = `${article.title}\n\n${(article.summary || "").slice(0, 180)}...\n\n${shareUrl}`;
    if (navigator.share) {
      navigator.share({ title: article.title, text: (article.summary || "").slice(0, 200), url: shareUrl }).catch(() => {});
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-[13px] text-[#404040]">Loading article…</p>
      </div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#080808]">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#7c3aed]/10 border border-[#7c3aed]/20 mb-2">
        <Zap size={24} className="text-[#7c3aed]" />
      </div>
      <p className="text-[#f0f0f0] font-semibold">Article not found</p>
      <button onClick={() => navigate("/")} className="text-[#7c3aed] text-[13px] hover:underline">Return to feed</button>
    </div>
  );

  const saved = isArticleSaved(article.id);

  return (
    <div data-testid="article-page" className="min-h-screen pb-10 bg-[#080808]">

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#1a1a1a]">
        <div
          className="h-full bg-[#7c3aed] transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%`, boxShadow: readingProgress > 0 ? "0 0 8px rgba(124,58,237,0.6)" : "none" }}
        />
      </div>

      {/* Sticky top bar */}
      <div className="sticky top-[84px] z-30 px-4 py-2.5 flex items-center gap-3 border-b bg-[#080808]/95 border-[#1a1a1a] backdrop-blur-md">
        <button
          data-testid="article-back-btn"
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}
          className="p-1.5 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-[13px] font-semibold flex-1 truncate text-[#f0f0f0]">
          LaunchCode
        </span>
        <button
          onClick={() => saveArticle(article)}
          className={`p-1.5 rounded-md transition-colors ${saved ? "text-[#7c3aed]" : "text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]"}`}
          aria-label="Save article"
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
        <button
          data-testid="article-share-btn"
          onClick={handleShare}
          className="p-1.5 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* 3-column layout on lg screens */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 lg:grid lg:grid-cols-[240px_1fr_240px] lg:gap-8">

        {/* LEFT SIDEBAR: Related */}
        <aside className="hidden lg:block">
          <div className="sticky top-[136px] rounded-xl p-4 bg-[#0d0d0d] border border-[#1f1f1f]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] pb-2 mb-3 border-b border-[#1f1f1f] text-[#f0f0f0]">
              Related Stories
            </h3>
            <div className="flex flex-col gap-2">
              {relatedArticles.length > 0 ? relatedArticles.map(a => (
                <SidebarCard key={a.id || a._id} article={a} onClick={(art) => openArticle(art)} />
              )) : (
                <p className="text-[11px] text-[#404040]">No related stories</p>
              )}
            </div>
          </div>
        </aside>

        {/* MAIN ARTICLE */}
        <article className="min-w-0">

          {/* Category + timestamp */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#7c3aed] text-white rounded-md font-mono">
              {article.category_label}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#404040]">
              <Clock size={11} />
              <span>{formatTime(article.published_at)}</span>
              <span className="text-[#262626]">·</span>
              <span>{timeAgo(article.published_at)}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-[30px] font-bold text-[#f0f0f0] leading-tight tracking-tight mb-5">
            {article.title}
          </h1>

          {/* Source */}
          {article.source && (
            <p className="text-[12px] text-[#737373] mb-5">
              Source: <span className="text-[#a3a3a3]">{article.source}</span>
            </p>
          )}

          {/* Hero image */}
          {article.image && (
            <div className="mb-6 rounded-xl overflow-hidden border border-[#1f1f1f]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full max-h-[440px] object-cover"
                onError={(e) => { e.target.src = AI_DEFAULT_IMAGES.default; }}
              />
            </div>
          )}

          {/* Share bar */}
          <div className="flex items-center gap-2 flex-wrap py-3 mb-6 border-b border-t border-[#1a1a1a]">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] mr-1 text-[#404040]">Share</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-md bg-[#111] border border-[#262626] text-[#a3a3a3] hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-md bg-[#111] border border-[#262626] text-[#a3a3a3] hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-[11px] font-semibold transition-all border ${
                copied
                  ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                  : "bg-[#111] text-[#737373] border-[#262626] hover:border-[#7c3aed] hover:text-[#7c3aed]"
              }`}
            >
              {copied ? <Check size={12} /> : <Link2 size={12} />}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>

          {/* Body */}
          <div className="text-[15px] leading-relaxed text-[#a3a3a3] whitespace-pre-line">
            {article.summary}
          </div>

          {/* SEO tags */}
          {article.seo_keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-[#1a1a1a]">
              {article.seo_keywords.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#111] border border-[#1f1f1f] text-[#737373]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Mobile related */}
          {relatedArticles.length > 0 && (
            <div className="lg:hidden mt-8 pt-6 border-t border-[#1a1a1a]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4 text-[#f0f0f0]">Related Stories</h3>
              <div className="flex flex-col gap-2">
                {relatedArticles.map(a => (
                  <SidebarCard key={a.id || a._id} article={a} onClick={(art) => openArticle(art)} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* RIGHT SIDEBAR: Latest from feed */}
        <aside className="hidden lg:block">
          <div className="sticky top-[136px] rounded-xl p-4 bg-[#0d0d0d] border border-[#1f1f1f]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] pb-2 mb-3 border-b border-[#1f1f1f] text-[#f0f0f0]">
              Latest in AI
            </h3>
            <div className="flex flex-col gap-2">
              {MOCK_ARTICLES.filter(a => a.id !== id).slice(0, 5).map(a => (
                <SidebarCard key={a.id} article={a} onClick={(art) => openArticle(art)} />
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
