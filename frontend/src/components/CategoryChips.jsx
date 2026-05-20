import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../App";

const DEFAULT_CATEGORIES = [
  { key: "all", en: "All" },
  { key: "ai-models", en: "AI Models" },
  { key: "video-ai", en: "Video AI" },
  { key: "agents", en: "AI Agents" },
  { key: "funding", en: "Funding" },
  { key: "generative-ai", en: "Generative AI" },
  { key: "research", en: "Research" },
  { key: "open-source", en: "Open Source" },
  { key: "vision", en: "Computer Vision" },
  { key: "infra", en: "Infrastructure" },
];

export const CategoryChips = ({ activeCategory, onCategoryChange }) => {
  const { categories } = useContext(AppContext);
  const scrollRef = useRef(null);

  const categoryList = Object.keys(categories).length > 0
    ? [
        { key: "all", en: "All" },
        ...Object.entries(categories).map(([key, value]) => ({ key, en: value.en }))
      ]
    : DEFAULT_CATEGORIES;

  useEffect(() => {
    if (scrollRef.current && activeCategory) {
      const activeChip = scrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeChip) activeChip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

  return (
    <div
      className="sticky top-[84px] z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#1a1a1a]"
      data-testid="category-chips"
    >
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-2.5 max-w-screen-xl md:mx-auto"
      >
        {categoryList.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              data-category={cat.key}
              data-testid={`category-${cat.key}`}
              onClick={() => onCategoryChange(cat.key)}
              className={`
                flex-shrink-0 rounded-md px-3.5 py-1.5 transition-all duration-150
                whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider
                focus:outline-none
                ${isActive
                  ? "bg-[#7c3aed] text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                  : "bg-[#111] border border-[#262626] text-[#737373] hover:border-[#7c3aed]/60 hover:text-[#f0f0f0]"
                }
              `}
            >
              {cat.en}
            </button>
          );
        })}
      </div>
    </div>
  );
};
