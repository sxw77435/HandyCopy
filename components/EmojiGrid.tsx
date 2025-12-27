import React, { useMemo } from "react";
//import { EMOJI_DATA } from "../data/emoji/emoji.basic";
import { EMOJI_DATA } from "../data/emoji/emoji.full";
import { EMOJI_KEYWORDS_MAP } from "../data/emoji/emojiKeywordMap";
import { EmojiItem } from "../types";

interface EmojiGridProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  onSearch: () => void;
  recentEmojis: string[];
  onCopy: (char: string) => void;
}

const EmojiGrid: React.FC<EmojiGridProps> = ({
  searchQuery,
  setSearchQuery,
  inputValue,
  setInputValue,
  onSearch,
  recentEmojis,
  onCopy,
}) => {
  const isSearching = searchQuery.trim().length > 0;
  const filteredEmojis = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return EMOJI_DATA;

    return EMOJI_DATA.filter((emoji) => {
      const name = emoji.name?.toLowerCase() || "";
      const category = emoji.category?.toLowerCase() || "";

      // 1️⃣ 直接命中
      if (name.includes(q) || category.includes(q)) return true;

      // 2️⃣ 关键词映射命中
      const keywords = EMOJI_KEYWORDS_MAP[q];
      if (!keywords) return false;

      return keywords.some((k) => name.includes(k));
    });
  }, [searchQuery]);

  // Explicitly type the useMemo return value to help TypeScript inference
  const categories = useMemo<Record<string, EmojiItem[]>>(() => {
    const cats: Record<string, EmojiItem[]> = {};
    filteredEmojis.forEach((e) => {
      if (!cats[e.category]) cats[e.category] = [];
      cats[e.category].push(e);
    });
    return cats;
  }, [filteredEmojis]);

  return (
    <div className="space-y-12 pt-6 sm:pt-0">
      {/* 🔍 Search Area */}
      <div className="sticky top-0 z-20 bg-[#fffaf5] pt-2 pb-4">
        {/* 搜索状态提示 + 返回 */}
        {isSearching && (
          <div
            className="mb-2 flex items-center gap-2 text-sm text-orange-500 cursor-pointer"
            onClick={() => {
              setInputValue("");
              setSearchQuery("");
            }}
          >
            <span className="text-lg">←</span>
            <span>Back to all emojis</span>
          </div>
        )}

        {/* 搜索框 */}
        <div className="relative max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Search emojis..."
            className="flex-1 h-12 px-4 rounded-2xl border border-orange-200 bg-white focus:outline-none focus:ring-4 focus:ring-orange-300"
          />

          <button
            onClick={onSearch}
            className="flex items-center justify-center w-12 h-12 rounded-2xl border border-orange-300 text-orange-400 bg-white hover:bg-orange-50 transition"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.1-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ❗️没有搜索结果时显示 */}
      {isSearching && filteredEmojis.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-stone-300">
          <i className="fas fa-face-frown text-5xl mb-4"></i>
          <p className="text-lg">No emojis match your search.</p>
        </div>
      )}

      {/* ✅ Recently Used */}
      {recentEmojis.length > 0 && searchQuery.trim() === "" && (
        <div className="space-y-6">
          <h2 className="text-xs font-black text-orange-300 uppercase tracking-[0.2em] ml-2">
            Recently Used
          </h2>

          <div className="flex flex-wrap gap-4">
            {recentEmojis.map((char) => (
              <button
                key={`recent-${char}`}
                onClick={() => onCopy(char)}
                title="Recently used"
                className="group relative aspect-square bg-white border border-orange-50 rounded-2xl flex items-center justify-center text-3xl hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition-all active:scale-95 w-12"
              >
                {char}
                <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ 原有分类 Emoji Grid（一行不改） */}
      {(Object.entries(categories) as [string, EmojiItem[]][]).map(
        ([category, items]) => (
          <div key={category} className="space-y-6">
            <h2 className="text-xs font-black text-orange-300 uppercase tracking-[0.2em] ml-2">
              {category}
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {items.map((emoji) => (
                <button
                  key={`${emoji.category}-${emoji.name}`}
                  onClick={() => onCopy(emoji.char)}
                  title={emoji.name}
                  className="group relative aspect-square bg-white border border-orange-50 rounded-2xl flex items-center justify-center text-3xl hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition-all active:scale-95"
                >
                  {emoji.char}
                  <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EmojiGrid;
