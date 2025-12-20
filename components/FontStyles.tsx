import React, { useState } from "react";
import { FONT_STYLES } from "../constants/fontStyles";

interface FontStylesProps {
  searchQuery: string;
  onCopy: (text: string) => void;
}

const FontStyles: React.FC<FontStylesProps> = ({ searchQuery, onCopy }) => {
  const [inputText, setInputText] = useState("Have a great day");

  const styles = FONT_STYLES.filter((style) =>
    style.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
        <label className="block text-xs font-black text-orange-400 uppercase tracking-widest mb-3">
          Your Text Input
        </label>
        <textarea
          className="w-full p-5 border border-orange-50 rounded-2xl bg-[#fffcf9] focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white focus:border-orange-300 transition-all text-2xl font-bold placeholder:text-stone-200 resize-none h-28"
          placeholder="Type something to stylize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {styles.map((style) => {
          const transformed = style.transform(inputText || " ");
          return (
            <div
              key={style.name}
              className="group bg-white p-5 rounded-2xl border border-orange-50 flex items-center justify-between hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex-1 mr-4 overflow-hidden">
                <span className="block text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-1">
                  {style.name}
                </span>
                <p className="text-xl text-stone-800 break-words whitespace-pre-wrap">
                  {transformed}
                </p>
              </div>
              <button
                onClick={() => onCopy(transformed)}
                className="shrink-0 bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white p-4 rounded-xl transition-all active:scale-90 shadow-sm"
                title="Copy to clipboard"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
          );
        })}
      </div>

      {styles.length === 0 && (
        <div className="text-center py-10 text-stone-300">
          <p>No font styles match your search.</p>
        </div>
      )}
    </div>
  );
};

export default FontStyles;
