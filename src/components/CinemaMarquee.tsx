import React from 'react';
import { Film, Sparkles, Clapperboard, Star } from 'lucide-react';

export const CinemaMarquee: React.FC = () => {
  const items = [
    'COLLECTOR TRUMP CARDS',
    'MOVIE DIALOGUE BIRTHDAY CARDS',
    'HOLOGRAPHIC FILM STICKERS',
    '35MM BRASS BOOKMARKS',
    'LETTERBOXD MOVIE JOURNALS',
    'ZOON APPROVED 🐾',
    'WONG KAR-WAI TO NOLAN',
    'FREE GLOBAL AIR SHIPPING > ₹2,000 / $30',
  ];

  return (
    <div className="border-y-[3px] border-[#1e1b24] bg-amber-400 text-[#1e1b24] overflow-hidden py-2.5 relative select-none shadow-sm">
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap font-display text-sm sm:text-base tracking-wider uppercase">
        {/* Double array for infinite seamless scroll */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="font-display">{text}</span>
            <Star className="w-4 h-4 fill-[#1e1b24] text-[#1e1b24] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
