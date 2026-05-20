import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { AppContext, API } from "../App";
import axios from "axios";
import { Bookmark, BookmarkCheck, Clock, Share2, X, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SWIPE_THRESHOLD = 80;

function timeAgo(dateStr) {
  try {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch { return ""; }
}

export const ArticleModal = () => {
  const {
    selectedArticle, closeArticle,
    saveArticle, isArticleSaved,
    articlesList, articleIndex, goNextArticle, goPrevArticle
  } = useContext(AppContext);

  const [direction, setDirection] = useState(0);
  const [dragX, setDragX] = useState(0);
  const lastTapRef = useRef(0);

  useEffect(() => {
    if (selectedArticle?.id) {
      axios.post(`${API}/news/${selectedArticle.id}/view`, null, { params: { source: "modal" } }).catch(() => {});
    }
  }, [selectedArticle?.id]);

  useEffect(() => {
    if (!selectedArticle) return;
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { setDirection(1); goNextArticle(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { setDirection(-1); goPrevArticle(); }
      else if (e.key === "Escape") closeArticle();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedArticle, goNextArticle, goPrevArticle, closeArticle]);

  const handleDragEnd = useCallback((_, info) => {
    const { offset } = info;
    if (offset.x < -SWIPE_THRESHOLD) { setDirection(1); goNextArticle(); }
    else if (offset.x > SWIPE_THRESHOLD) { setDirection(-1); goPrevArticle(); }
    setDragX(0);
  }, [goNextArticle, goPrevArticle]);

  if (!selectedArticle) return null;

  const article = selectedArticle;
  const isSaved = isArticleSaved(article.id);
  const hasNext = articlesList.length > 0 && articleIndex < articlesList.length - 1;
  const hasPrev = articlesList.length > 0 && articleIndex > 0;

  const shareUrl = `https://launchcode.ai/news/${article.id}`;
  const handleShare = () => {
    const text = `${article.title}\n\n${(article.summary || "").slice(0, 180)}...\n\n${shareUrl}`;
    if (navigator.share) {
      navigator.share({ title: article.title, text: (article.summary || "").slice(0, 200), url: shareUrl }).catch(() => {});
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    }
  };

  const imageUrl = article.image || "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800";

  const cardVariants = {
    enter: (dir) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -400 : 400, opacity: 0, scale: 0.94 }),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="article-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) closeArticle(); }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {hasPrev && (
        <button data-testid="swipe-prev-btn" onClick={() => { setDirection(-1); goPrevArticle(); }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full bg-[#111] border border-[#262626] text-[#737373] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-all">
          <ChevronLeft size={20} />
        </button>
      )}
      {hasNext && (
        <button data-testid="swipe-next-btn" onClick={() => { setDirection(1); goNextArticle(); }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[60] p-2 rounded-full bg-[#111] border border-[#262626] text-[#737373] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-all">
          <ChevronRight size={20} />
        </button>
      )}

      {articlesList.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-1.5">
          {articlesList.slice(Math.max(0, articleIndex - 3), Math.min(articlesList.length, articleIndex + 4)).map((a, i) => {
            const realIdx = Math.max(0, articleIndex - 3) + i;
            return <div key={a.id} className="rounded-full transition-all" style={{
              width: realIdx === articleIndex ? "16px" : "5px",
              height: "5px",
              background: realIdx === articleIndex ? "#7c3aed" : "rgba(255,255,255,0.2)",
            }} />;
          })}
        </div>
      )}

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={article.id}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDrag={(_, info) => setDragX(info.offset.x)}
          onDragEnd={handleDragEnd}
          className="relative z-[55] w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#1f1f1f] touch-pan-y"
          style={{
            background: "#0d0d0d",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.08)",
            rotate: dragX * 0.02,
          }}
          data-testid="article-modal"
        >
          {/* Swipe overlays */}
          {dragX < -30 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none rounded-2xl bg-[#7c3aed]/10">
              <span className="text-[#7c3aed] text-sm font-bold tracking-widest uppercase">Next →</span>
            </div>
          )}
          {dragX > 30 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none rounded-2xl bg-[#7c3aed]/10">
              <span className="text-[#7c3aed] text-sm font-bold tracking-widest uppercase">← Prev</span>
            </div>
          )}

          {/* Header */}
          <div className="sticky top-0 z-20 border-b px-4 py-3 flex items-center justify-between bg-[#0d0d0d] border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#7c3aed] flex items-center justify-center">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              {articlesList.length > 1 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a1a] text-[#404040]">
                  {articleIndex + 1}/{articlesList.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button data-testid="modal-share-btn" onClick={handleShare}
                className="h-8 w-8 rounded-md flex items-center justify-center text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors">
                <Share2 size={15} />
              </button>
              <button data-testid="modal-save-btn" onClick={() => saveArticle(article)}
                className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${isSaved ? "text-[#7c3aed]" : "text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]"}`}>
                {isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              </button>
              <button data-testid="modal-close-btn" onClick={closeArticle}
                className="h-8 w-8 rounded-md flex items-center justify-center text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full aspect-[2.2/1] object-cover select-none pointer-events-none"
              onError={(e) => { e.target.src = "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#7c3aed] text-white font-mono">
                {article.category_label}
              </span>
              {article.is_pinned && (
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase text-[#7c3aed] bg-[#7c3aed]/10 border border-[#7c3aed]/30">
                  Top Story
                </span>
              )}
              <span className="flex items-center gap-1 text-[11px] text-[#404040]">
                <Clock size={11} />{timeAgo(article.published_at)}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight text-[#f0f0f0]">
              {article.title}
            </h1>

            <p className="text-[14px] leading-relaxed mb-5 text-[#a3a3a3]">
              {article.summary}
            </p>

            {article.seo_keywords?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {article.seo_keywords.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#111] border border-[#1f1f1f] text-[#737373]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {articlesList.length > 1 && (
              <p className="text-center text-[11px] mt-2 text-[#333]">
                Swipe left/right to navigate
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
