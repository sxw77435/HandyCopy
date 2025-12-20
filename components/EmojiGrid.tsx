import React, { useMemo } from "react";
//import { EMOJI_DATA } from "../data/emoji/emoji.basic";
import { EMOJI_DATA } from "../data/emoji/emoji.full";

import { EmojiItem } from "../types";

interface EmojiGridProps {
  searchQuery: string;
  recentEmojis: string[];
  onCopy: (char: string) => void;
}

const EmojiGrid: React.FC<EmojiGridProps> = ({
  searchQuery,
  recentEmojis,
  onCopy,
}) => {
  const filteredEmojis = useMemo(() => {
    return EMOJI_DATA.filter(
      (emoji) =>
        (emoji.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emoji.category ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    );
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

  if (filteredEmojis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-300">
        <i className="fas fa-face-frown text-5xl mb-4"></i>
        <p className="text-lg">No emojis match your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
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
