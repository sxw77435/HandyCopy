import React, { useState, useCallback } from "react";
import { Category, Toast as IToast } from "./types";
import Sidebar from "./components/Sidebar";
import EmojiGrid from "./components/EmojiGrid";
import FontStyles from "./components/FontStyles";
import Toast from "./components/Toast";
//import AISearch from "./components/AISearch";

const App: React.FC = () => {
  // ✅ recentEmojis 一定要在这里
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentEmojis") || "[]");
  });

  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.EMOJI
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const handleCopy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        // ✅ 只在 Emoji 分类记录 recent
        if (activeCategory === Category.EMOJI) {
          setRecentEmojis((prev) => {
            const filtered = prev.filter((e) => e !== text);
            const updated = [text, ...filtered].slice(0, 30);
            localStorage.setItem("recentEmojis", JSON.stringify(updated));
            return updated;
          });
        }

        addToast(
          `Copied: ${text.slice(0, 10)}${text.length > 10 ? "..." : ""}`
        );
      });
    },
    [addToast, activeCategory]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#fffaf5] text-stone-800">
      {/* Sidebar Navigation */}
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-orange-100 bg-white/60 backdrop-blur-md flex items-center justify-between px-8 shrink-0 ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-stone-800 tracking-tight">
              {activeCategory === Category.EMOJI && "Emoji Library"}
              {activeCategory === Category.FONTS && "Fancy Font Styles"}
              {/*{activeCategory === Category.AI_SEARCH && "Magic AI Finder"}*/}
            </h1>
          </div>

          <div className="relative w-64 md:w-96 group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-300 group-focus-within:text-orange-500 transition-colors">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 border border-orange-100 rounded-2xl bg-stone-50/50 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-400 transition-all text-sm"
              placeholder={`Search ${
                activeCategory === Category.EMOJI ? "emojis" : "styles"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeCategory === Category.EMOJI && (
              <EmojiGrid
                searchQuery={searchQuery}
                recentEmojis={recentEmojis}
                onCopy={handleCopy}
              />
            )}
            {activeCategory === Category.FONTS && (
              <FontStyles searchQuery={searchQuery} onCopy={handleCopy} />
            )}
            {/* {activeCategory === Category.AI_SEARCH && (
              <AISearch onCopy={handleCopy} />
            )} */}
          </div>
        </section>
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </div>
    </div>
  );
};

export default App;
