import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const AnthiraLogo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = false, className = '' }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Orange geometric folded ribbon mark */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: iconSize, height: iconSize }}
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_10px_rgba(255,87,34,0.35)]">
          <path d="M6 8L20 34L26 23L16 8H6Z" fill="#FF5722" />
          <path d="M34 8L20 34L24 34L34 16V8H34Z" fill="#FF8A50" />
          <path d="M16 8L24 23L29 14L22 8H16Z" fill="#E64A19" />
          <path d="M22 8L34 8L28 19L22 8Z" fill="#FFAB91" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans',sans-serif] ${textSize}`}>
          ANTHIRA
        </span>
        {showSubtitle && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-medium -mt-1">
            Design · Build · Sell
          </span>
        )}
      </div>
    </div>
  );
};

export const VexoraLogo = AnthiraLogo;
