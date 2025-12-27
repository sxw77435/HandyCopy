import React, { useState, useCallback } from "react";
import { Category, Toast as IToast } from "./types";
import Sidebar from "./components/Sidebar";
import EmojiGrid from "./components/EmojiGrid";
import FontStyles from "./components/FontStyles";
import Toast from "./components/Toast";
import KaomojiGrid from "./components/KaomojiGrid";
//import AISearch from "./components/AISearch";

const App: React.FC = () => {
  // ✅ recentEmojis 一定要在这里
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentEmojis") || "[]");
  });

  const [recentKaomoji, setRecentKaomoji] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentKaomoji") || "[]");
  });

  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.EMOJI
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
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

        if (activeCategory === Category.KAOMOJI) {
          setRecentKaomoji((prev) => {
            const updated = [text, ...prev.filter((e) => e !== text)].slice(
              0,
              30
            );
            localStorage.setItem("recentKaomoji", JSON.stringify(updated));
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
        <header className="h-20 border-b border-orange-100 bg-white/60 backdrop-blur-md flex items-center px-8 shrink-0">
          <h1 className="text-2xl font-black text-stone-800 tracking-tight">
            {activeCategory === Category.EMOJI && "Emoji Library"}
            {activeCategory === Category.FONTS && "Fancy Font"}
          </h1>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeCategory === Category.EMOJI && (
              <EmojiGrid
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSearch={() => setSearchQuery(inputValue)}
                recentEmojis={recentEmojis}
                onCopy={handleCopy}
              />
            )}
            {activeCategory === Category.KAOMOJI && (
              <KaomojiGrid onCopy={handleCopy} recentKaomoji={recentKaomoji} />
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
