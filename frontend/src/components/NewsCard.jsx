import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { Bookmark, BookmarkCheck, Share2, Pencil } from "lucide-react";

const SOURCE_URLS = {
  "LaunchCode": "https://launchcode.ai",
  "TechCrunch": "https://techcrunch.com",
  "The Information": "https://theinformation.com",
  "VentureBeat": "https://venturebeat.com",
  "Wired": "https://wired.com",
  "MIT Tech Review": "https://technologyreview.com",
  "Hugging Face Blog": "https://huggingface.co/blog",
  "OpenAI Blog": "https://openai.com/blog",
  "DeepMind Blog": "https://deepmind.google/discover/blog",
  "Anthropic Blog": "https://anthropic.com/news",
  "Runway Blog": "https://runwayml.com/blog",
  "ET Startups": "https://economictimes.indiatimes.com/small-biz/startups",
  "YourStory": "https://yourstory.com",
  "LaunchCode Wire": "https://launchcode.ai",
};

const DEFAULT_IMAGES = {
  "ai-models": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
  "video-ai": "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=600",
  "agents": "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600",
  "funding": "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600",
  "research": "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=600",
  "startup": "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
  "tech": "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600",
  "default": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
};

export const NewsCard = ({ article, articlesList = [] }) => {
  const { saveArticle, isArticleSaved, openArticle, isAdmin } = useContext(AppContext);
  const navigate = useNavigate();
  const isSaved = isArticleSaved(article.id);

  const title = article.title;
  const summary = article.summary;
  const categoryLabel = article.category_label;
  const readTime = Math.max(1, Math.ceil((article.summary || "").split(/\s+/).filter(Boolean).length / 200));

  const getShortDate = (article) => {
    try {
      const d = new Date(article.published_at || article.created_at);
      return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } catch { return ""; }
  };

  const imageUrl = article.image || DEFAULT_IMAGES[article.category] || DEFAULT_IMAGES["default"];
  const sourceName = article.source || "LaunchCode";
  const sourcePortalUrl = SOURCE_URLS[sourceName] || null;

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `https://launchcode.ai/news/${article.id}`;
    const shareText = `${title}\n\n${(summary || "").slice(0, 180)}...\n\n${shareUrl}`;
    if (navigator.share) {
      navigator.share({ title, text: (summary || "").slice(0, 200), url: shareUrl }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleSourceClick = (e) => {
    e.stopPropagation();
    if (sourcePortalUrl) window.open(sourcePortalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      data-testid={`news-card-${article.id}`}
      className="group news-card rounded-lg overflow-hidden border border-[#1f1f1f] bg-[#111111] hover:border-[#7c3aed]/50 hover:shadow-[0_4px_24px_rgba(124,58,237,0.1)] transition-all duration-200"
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a]">
        <div className="min-w-0 flex-1">
          {article.is_pinned ? (
            <span className="bg-[#7c3aed] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Featured
            </span>
          ) : categoryLabel ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7c3aed] truncate font-mono">
              {categoryLabel}
            </span>
          ) : null}
        </div>

        {sourcePortalUrl ? (
          <button
            onClick={handleSourceClick}
            className="text-[10px] font-medium uppercase tracking-wider truncate ml-2 text-[#404040] hover:text-[#a3a3a3] transition-colors"
            title={`Visit ${sourceName}`}
          >
            {sourceName}
          </button>
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-wider truncate ml-2 text-[#404040]">
            {sourceName}
          </span>
        )}
      </div>

      {/* Image */}
      <div
        className="relative aspect-[16/9] cursor-pointer overflow-hidden"
        onClick={() => openArticle(article, articlesList)}
      >
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = DEFAULT_IMAGES["default"]; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3
          onClick={() => openArticle(article, articlesList)}
          className="text-[15px] md:text-[16px] font-semibold leading-snug line-clamp-3 mb-2 cursor-pointer text-[#f0f0f0] group-hover:text-white transition-colors tracking-tight"
        >
          {title}
        </h3>

        {summary && (
          <p className="text-[12px] line-clamp-2 mb-3 leading-relaxed text-[#737373]">
            {summary}
          </p>
        )}

        {/* Footer meta */}
        <div className="flex items-center justify-between text-[11px] text-[#404040]">
          <div className="flex items-center gap-1 min-w-0">
            <span className="truncate">{getShortDate(article)}</span>
            <span className="opacity-50"> · </span>
            <span className="truncate">{readTime} min</span>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={handleShare}
              aria-label="Share"
              className="hover:text-[#7c3aed] transition-colors"
            >
              <Share2 size={13} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); saveArticle(article); }}
              aria-label={isSaved ? "Saved" : "Save"}
              className={`transition-colors ${isSaved ? "text-[#7c3aed]" : "hover:text-[#7c3aed]"}`}
            >
              {isSaved ? (
                <BookmarkCheck size={13} fill="currentColor" />
              ) : (
                <Bookmark size={13} />
              )}
            </button>
            {isAdmin && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/admin?edit=${article.id}`); }}
                aria-label="Edit"
                className="hover:text-[#7c3aed] transition-colors"
              >
                <Pencil size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
