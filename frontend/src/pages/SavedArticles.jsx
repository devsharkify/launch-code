import { useContext } from "react";
import { AppContext } from "../App";
import { NewsCard } from "../components/NewsCard";
import { Bookmark, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavedArticles() {
  const { savedArticles } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div data-testid="saved-articles-page" className="min-h-screen bg-[#080808]">

      {/* Header */}
      <div className="border-b py-5 px-4 bg-[#080808] border-[#1a1a1a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-md bg-[#7c3aed]/15 border border-[#7c3aed]/20 flex items-center justify-center">
              <Bookmark size={15} className="text-[#7c3aed]" />
            </div>
            <h1 className="text-[18px] font-bold text-[#f0f0f0] tracking-tight">Saved Articles</h1>
          </div>
          <p className="text-[12px] text-[#404040] ml-11">
            {savedArticles.length} article{savedArticles.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">

        {/* Empty state */}
        {savedArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 bg-[#7c3aed]/10 border border-[#7c3aed]/20">
              <Bookmark size={28} className="text-[#7c3aed]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#f0f0f0] mb-2">No saved articles</h3>
            <p className="text-[13px] text-center max-w-xs text-[#404040] mb-6">
              Tap the bookmark icon on any article to save it for later
            </p>
            <button
              data-testid="browse-news-btn"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
            >
              <Zap size={14} fill="currentColor" />
              Explore the Feed
            </button>
          </div>
        )}

        {/* Grid */}
        {savedArticles.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {savedArticles.map((article) => (
              <div key={article.id} className="break-inside-avoid">
                <NewsCard article={article} articlesList={savedArticles} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { SavedArticles };
