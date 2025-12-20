import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = false }) => {
  return (
    <div
      className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}
    >
      {/* Icon */}
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        {/* Soft glow on hover */}
        <div className="absolute inset-0 bg-amber-400 opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-all duration-300" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Light Rays */}
          <g
            className="stroke-stone-800 group-hover:stroke-orange-500 transition-colors"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
          >
            <line x1="50" y1="6" x2="50" y2="14" />
            <line x1="78" y1="18" x2="72" y2="24" />
            <line x1="94" y1="44" x2="86" y2="46" />
            <line x1="22" y1="18" x2="28" y2="24" />
            <line x1="6" y1="44" x2="14" y2="46" />
          </g>

          {/* Bulb */}
          <path
            d="
              M50 18
              C34 18, 26 30, 26 42
              C26 54, 36 58, 38 66
              L62 66
              C64 58, 74 54, 74 42
              C74 30, 66 18, 50 18 Z
            "
            className="
              fill-white
              stroke-stone-800
              group-hover:fill-amber-50
              group-hover:stroke-orange-500
              transition-all
            "
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Face */}
          <circle
            cx="42"
            cy="40"
            r="3"
            className="fill-stone-800 group-hover:fill-orange-600 transition-colors"
          />
          <circle
            cx="58"
            cy="40"
            r="3"
            className="fill-stone-800 group-hover:fill-orange-600 transition-colors"
          />
          <path
            d="M44 48 Q50 52, 56 48"
            className="stroke-stone-800 group-hover:stroke-orange-600 transition-colors"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="36"
            cy="44"
            r="4"
            className="fill-stone-200 group-hover:fill-orange-200 transition-colors"
          />
          <circle
            cx="64"
            cy="44"
            r="4"
            className="fill-stone-200 group-hover:fill-orange-200 transition-colors"
          />

          {/* Screw */}
          <line
            x1="40"
            y1="72"
            x2="60"
            y2="72"
            strokeWidth="4"
            className="stroke-stone-800 group-hover:stroke-orange-600 transition-colors"
          />
          <line
            x1="42"
            y1="78"
            x2="58"
            y2="78"
            strokeWidth="4"
            className="stroke-stone-800 group-hover:stroke-orange-600 transition-colors"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span className="font-black text-2xl tracking-tight text-stone-800 leading-none">
          Handy
          <span className="text-orange-500 group-hover:text-orange-600 transition-colors ml-0.5">
            Copy
          </span>
        </span>
      )}
    </div>
  );
};

export default Logo;
