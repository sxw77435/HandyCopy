
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface AISearchProps {
  onCopy: (text: string) => void;
}

const AISearch: React.FC<AISearchProps> = ({ onCopy }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ char: string; name: string }[]>([]);

  const suggestions = [
    "Cyberpunk Neon",
    "Soft Aesthetic Pink",
    "Summer Beach Party",
    "Late Night Working",
    "Cozy Autumn Tea",
    "Retro Gamer Vibe"
  ];

  const handleMagicSearch = async (forcedPrompt?: string) => {
    const searchPrompt = forcedPrompt || prompt;
    if (!searchPrompt.trim()) return;
    
    if (forcedPrompt) setPrompt(forcedPrompt);
    setLoading(true);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find 12 emojis for this vibe: "${searchPrompt}". Provide the result as a JSON array of objects with "char" (emoji) and "name" (short English name).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                char: { type: Type.STRING },
                name: { type: Type.STRING }
              },
              required: ["char", "name"]
            }
          }
        }
      });
      
      let rawText = response.text || '';
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const data = JSON.parse(rawText);
      setResults(data);
    } catch (error) {
      console.error('AI Search Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Soft Autumn Card */}
      <div className="bg-gradient-to-br from-[#fff1e6] via-[#fffbf5] to-[#ffeadb] p-10 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-100/20 text-stone-800 relative overflow-hidden">
        {/* Decorative elements - Softer and more subtle */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
               <i className="fas fa-wand-magic-sparkles"></i>
             </div>
             <h2 className="text-3xl font-black tracking-tight text-stone-800">
                Magic Finder
             </h2>
          </div>
          <p className="text-stone-500 mb-10 text-lg font-medium">
            Describe your mood, and AI will find the perfect emojis.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-1 px-6 py-5 rounded-2xl bg-white border border-orange-100 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-200 text-lg transition-all shadow-sm"
              placeholder="e.g., 'Golden hour in a quiet forest'..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleMagicSearch()}
            />
            <button
              onClick={() => handleMagicSearch()}
              disabled={loading}
              className="px-10 py-5 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-sparkles"></i>}
              {loading ? 'Casting...' : 'Search'}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-xs font-black text-stone-400 mr-2 flex items-center uppercase tracking-widest">Try these:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleMagicSearch(s)}
                className="text-xs font-bold text-stone-600 bg-white/60 hover:bg-orange-500 hover:text-white border border-orange-100 px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-orange-50 animate-pulse flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-orange-50 rounded-full"></div>
              <div className="w-20 h-3 bg-orange-50 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((res, idx) => (
          <button
            key={idx}
            onClick={() => onCopy(res.char)}
            className="group bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/30 transition-all transform hover:-translate-y-2 flex flex-col items-center justify-center gap-4 active:scale-95 shadow-sm"
          >
            <span className="text-5xl transition-transform group-hover:scale-110 drop-shadow-sm">{res.char}</span>
            <span className="text-[10px] text-stone-400 uppercase font-black text-center group-hover:text-orange-500 truncate w-full tracking-widest transition-colors">
              {res.name}
            </span>
          </button>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <div className="text-center py-20">
          <div className="w-28 h-28 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <i className="fas fa-compass text-4xl text-orange-200"></i>
          </div>
          <p className="text-stone-300 font-bold text-lg tracking-wide">Type something to start your discovery...</p>
        </div>
      )}
    </div>
  );
};

export default AISearch;
