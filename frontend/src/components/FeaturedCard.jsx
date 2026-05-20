import { useContext } from "react";
import { AppContext } from "../App";
import { Clock, ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function timeAgo(dateStr) {
  try {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch { return ""; }
}

export const FeaturedCard = ({ article }) => {
  const { openArticle, saveArticle, isArticleSaved } = useContext(AppContext);
  const revealRef = useReveal();
  if (!article) return null;
  const saved = isArticleSaved(article.id);

  return (
    <article
      ref={revealRef}
      className="reveal group relative rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#111] cursor-pointer hover:border-[#7c3aed]/40 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
      onClick={() => openArticle(article)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.target.src = "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
        {article.is_pinned && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#7c3aed] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d0d0d] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0d0d0d]" />
            </span>
            Top Story
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7c3aed] font-mono">{article.category_label}</span>
          <span className="text-[#262626]">·</span>
          <span className="text-[10px] text-[#404040]">{article.source}</span>
        </div>
        <h2 className="text-[20px] md:text-[22px] font-bold text-[#f0f0f0] leading-tight tracking-tight line-clamp-2 mb-3 group-hover:text-white transition-colors">
          {article.title}
        </h2>
        <p className="text-[13px] text-[#737373] line-clamp-2 leading-relaxed mb-4">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#404040]">
            <Clock size={10} />
            <span>{timeAgo(article.published_at)}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); saveArticle(article); }}
              className={`transition-colors ${saved ? "text-[#7c3aed]" : "text-[#333] hover:text-[#7c3aed]"}`}>
              {saved ? <BookmarkCheck size={14} fill="currentColor" /> : <Bookmark size={14} />}
            </button>
            <span className="text-[11px] text-[#404040] group-hover:text-[#7c3aed] flex items-center gap-1 transition-colors font-medium">
              Read more <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export const CompactCard = ({ article }) => {
  const { openArticle, saveArticle, isArticleSaved } = useContext(AppContext);
  if (!article) return null;
  const saved = isArticleSaved(article.id);

  return (
    <article
      className="group flex gap-3 p-3 rounded-lg border border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#7c3aed]/30 hover:bg-[#111] transition-all cursor-pointer"
      onClick={() => openArticle(article)}
    >
      <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition"
          onError={(e) => { e.target.src = "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"; }}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#7c3aed] font-mono">{article.category_label}</span>
          <h3 className="text-[12px] font-semibold text-[#e5e5e5] group-hover:text-white leading-snug line-clamp-2 transition-colors mt-0.5">
            {article.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-[#333]">{timeAgo(article.published_at)}</span>
          <button onClick={(e) => { e.stopPropagation(); saveArticle(article); }}
            className={`transition-colors ${saved ? "text-[#7c3aed]" : "text-[#2a2a2a] hover:text-[#7c3aed]"}`}>
            {saved ? <BookmarkCheck size={12} fill="currentColor" /> : <Bookmark size={12} />}
          </button>
        </div>
      </div>
    </article>
  );
};
