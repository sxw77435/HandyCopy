import React, { useMemo, useState } from "react";
import { QUICK_PICK_EMOJIS, QUICK_PICK_KAOMOJI } from "../data/quickPicks";

type Props = {
  onCopy: (text: string, type: "emoji" | "kaomoji") => void; // ✅ 改这里
  recentEmojis: string[];
  recentKaomoji: string[];
  onGoEmoji: () => void;
  onGoKaomoji: () => void;
};

export default function QuickPicks({
  onCopy,
  recentEmojis,
  recentKaomoji,
  onGoEmoji,
  onGoKaomoji,
}: Props) {
  const recentEmojiTop = useMemo(
    () => recentEmojis.slice(0, 12),
    [recentEmojis]
  );
  const recentKaomojiTop = useMemo(
    () => recentKaomoji.slice(0, 8),
    [recentKaomoji]
  );

  // ✅ Random 动画/高亮状态
  const [emojiShake, setEmojiShake] = useState(false);
  const [kaomojiShake, setKaomojiShake] = useState(false);
  const [flashEmoji, setFlashEmoji] = useState<string | null>(null);
  const [flashKaomoji, setFlashKaomoji] = useState<string | null>(null);

  const randomEmoji = () => {
    setEmojiShake(true);
    setTimeout(() => setEmojiShake(false), 180);

    const pool =
      recentEmojis.length >= 8
        ? [...recentEmojis, ...QUICK_PICK_EMOJIS]
        : QUICK_PICK_EMOJIS;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;

    setFlashEmoji(pick);
    setTimeout(() => setFlashEmoji(null), 260);

    onCopy(pick, "emoji"); // ✅ 改这里
  };

  const randomKaomoji = () => {
    setKaomojiShake(true);
    setTimeout(() => setKaomojiShake(false), 180);

    const pool =
      recentKaomoji.length >= 6
        ? [...recentKaomoji, ...QUICK_PICK_KAOMOJI]
        : QUICK_PICK_KAOMOJI;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;

    setFlashKaomoji(pick);
    setTimeout(() => setFlashKaomoji(null), 260);

    onCopy(pick, "kaomoji"); // ✅ 改这里
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="mb-8">
        <div className="rounded-3xl border border-orange-100 bg-white/60 backdrop-blur-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tight">
                Quick Picks
              </h2>
              <p className="mt-2 text-stone-500 font-medium">
                Copy faster with recent items + hand-picked essentials.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={onGoEmoji}
                  className="px-4 py-2 rounded-2xl bg-orange-500 text-white font-black hover:bg-orange-600 transition shadow-sm shadow-orange-200"
                >
                  Emoji Library →
                </button>
                <button
                  onClick={onGoKaomoji}
                  className="px-4 py-2 rounded-2xl bg-white border border-orange-200 text-stone-700 font-black hover:bg-orange-50 transition"
                >
                  Kaomoji →
                </button>
              </div>
            </div>

            <div className="md:w-64">
              <div className="rounded-2xl border border-orange-100 bg-white p-4">
                <div className="text-xs font-black text-stone-500 uppercase tracking-widest">
                  Tip
                </div>
                <div className="mt-2 text-sm text-stone-500 font-medium leading-relaxed">
                  Click any item to copy. Your copied items will appear in{" "}
                  <span className="font-black text-stone-700">Recent</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-stone-500 uppercase tracking-widest">
            Recent
          </h3>
          <div className="text-xs text-stone-400 font-semibold">
            {recentEmojis.length + recentKaomoji.length > 0
              ? "Based on your last copies"
              : "No history yet"}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Recent Emoji card */}
          <div className="rounded-3xl border border-orange-100 bg-white/60 backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-black text-stone-700">Recent Emoji</div>
              <div className="text-xs text-stone-400 font-semibold">
                {recentEmojis.length ? `${recentEmojis.length} saved` : "—"}
              </div>
            </div>

            {recentEmojiTop.length === 0 ? (
              <div className="text-sm text-stone-400 font-medium">
                Copy something in{" "}
                <span className="font-black">Emoji Library</span>.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentEmojiTop.map((e) => (
                  <button
                    key={e}
                    onClick={() => onCopy(e, "emoji")} // ✅ 改这里
                    className={[
                      "w-11 h-11 rounded-2xl bg-white border border-stone-100 transition text-xl",
                      "hover:border-orange-200 hover:bg-orange-50",
                      flashEmoji === e
                        ? "ring-4 ring-orange-200 scale-[1.06]"
                        : "",
                    ].join(" ")}
                    title="Click to copy"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recent Kaomoji card */}
          <div className="rounded-3xl border border-orange-100 bg-white/60 backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-black text-stone-700">Recent Kaomoji</div>
              <div className="text-xs text-stone-400 font-semibold">
                {recentKaomoji.length ? `${recentKaomoji.length} saved` : "—"}
              </div>
            </div>

            {recentKaomojiTop.length === 0 ? (
              <div className="text-sm text-stone-400 font-medium">
                Copy something in <span className="font-black">Kaomoji</span>.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recentKaomojiTop.map((k) => (
                  <button
                    key={k}
                    onClick={() => onCopy(k, "kaomoji")} // ✅ 改这里
                    className={[
                      "px-3 py-2 rounded-2xl bg-white border border-stone-100 transition text-sm font-semibold",
                      "hover:border-orange-200 hover:bg-orange-50",
                      flashKaomoji === k
                        ? "ring-4 ring-orange-200 scale-[1.02]"
                        : "",
                    ].join(" ")}
                    title="Click to copy"
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Picks */}
      <section className="space-y-5">
        {/* Emoji picks card */}
        <div className="rounded-3xl border border-orange-100 bg-white/60 backdrop-blur-md p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div>
              <div className="font-black text-stone-800 text-lg">
                Emoji Picks
              </div>
              <div className="text-sm text-stone-500 font-medium">
                Essentials for daily copy.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={randomEmoji}
                className={[
                  "px-3 py-2 rounded-2xl bg-white border border-orange-200 text-stone-700 font-black",
                  "hover:bg-orange-50 transition active:scale-95",
                  emojiShake ? "animate-[shake_.18s_ease-in-out]" : "",
                ].join(" ")}
                title="Random Emoji"
              >
                🎲 Random
              </button>
              <button
                onClick={onGoEmoji}
                className="px-3 py-2 rounded-2xl bg-orange-500 text-white font-black hover:bg-orange-600 transition shadow-sm shadow-orange-200 active:scale-95"
              >
                Browse →
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_PICK_EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => onCopy(e, "emoji")} // ✅ 改这里
                className={[
                  "w-11 h-11 rounded-2xl bg-white border border-stone-100 transition text-xl",
                  "hover:border-orange-200 hover:bg-orange-50",
                  flashEmoji === e ? "ring-4 ring-orange-200 scale-[1.06]" : "",
                ].join(" ")}
                title="Click to copy"
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Kaomoji picks card */}
        <div className="rounded-3xl border border-orange-100 bg-white/60 backdrop-blur-md p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div>
              <div className="font-black text-stone-800 text-lg">
                Kaomoji Picks
              </div>
              <div className="text-sm text-stone-500 font-medium">
                Cute faces, reactions, and moods.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={randomKaomoji}
                className={[
                  "px-3 py-2 rounded-2xl bg-white border border-orange-200 text-stone-700 font-black",
                  "hover:bg-orange-50 transition active:scale-95",
                  kaomojiShake ? "animate-[shake_.18s_ease-in-out]" : "",
                ].join(" ")}
                title="Random Kaomoji"
              >
                🎲 Random
              </button>
              <button
                onClick={onGoKaomoji}
                className="px-3 py-2 rounded-2xl bg-orange-500 text-white font-black hover:bg-orange-600 transition shadow-sm shadow-orange-200 active:scale-95"
              >
                Browse →
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_PICK_KAOMOJI.map((k) => (
              <button
                key={k}
                onClick={() => onCopy(k, "kaomoji")} // ✅ 改这里
                className={[
                  "px-3 py-2 rounded-2xl bg-white border border-stone-100 transition text-sm font-semibold",
                  "hover:border-orange-200 hover:bg-orange-50",
                  flashKaomoji === k
                    ? "ring-4 ring-orange-200 scale-[1.02]"
                    : "",
                ].join(" ")}
                title="Click to copy"
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
