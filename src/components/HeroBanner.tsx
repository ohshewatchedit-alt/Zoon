import React from 'react';
import { ArrowRight, Clapperboard, Star, Sparkles, Globe, Truck, Heart } from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { StarburstBadge } from './StarburstBadge';

interface HeroBannerProps {
  onShopNow: () => void;
  currency: CurrencyCode;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, currency }) => {
  return (
    <div className="relative overflow-hidden bg-[#faf4eb] text-[#1e1b24] border-b-[3px] border-[#1e1b24] pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* Decorative indie background accents */}
      <div className="absolute top-6 left-12 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-6 right-12 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Punchy Cinephile Headlines & Callouts */}
          <div className="lg:col-span-7">
            {/* Top Tape Sticker */}
            <div className="inline-flex items-center gap-2 sticker -rotate-2 bg-amber-300 px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase text-[#1e1b24] shadow-pop-sm mb-5">
              <Clapperboard className="w-4 h-4 text-[#1e1b24]" />
              <span>World Cinema Merch · Curated by Zoon 🐾</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e1b24] mb-5 leading-[1.08]" style={{ textWrap: 'balance' }}>
              Wander down film alleys <br className="hidden sm:inline" />
              with <span className="text-amber-500">Zoon</span> & <br className="hidden sm:inline" />
              <span className="relative inline-block text-purple-700 underline decoration-amber-400 decoration-wavy decoration-3 underline-offset-8">
                Find Your Heart's Desires.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 mb-8 leading-relaxed max-w-xl font-medium">
              Zoon wanders through the cobblestone alleys of world cinema—from Japen to France, Iran to Korea, and Kolkata. Join her journey, explore international film treasures, and bring home her handcrafted collector trump cards, dialogue birthday cards, and cine-merch!
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onShopNow}
                className="px-7 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all border-[2.5px] border-[#1e1b24] shadow-pop hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
              >
                <span>Join Zoon's Cinema Journey</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <a
                href="https://instagram.com/reel/DPRLTwhE5-v"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 bg-amber-300 hover:bg-amber-200 text-[#1e1b24] font-black rounded-2xl transition-all border-[2.5px] border-[#1e1b24] shadow-pop hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>Watch Reviews with Zoon ↗</span>
              </a>
            </div>

            {/* Quirky Features Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-stone-800 pt-4 border-t-2 border-stone-200">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-[#1e1b24] shadow-pop-sm">
                <span className="text-amber-500 font-bold">🐱</span>
                <span>Zoon Approved ★</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-[#1e1b24] shadow-pop-sm">
                <Globe className="w-3.5 h-3.5 text-purple-600" />
                <span>Multi-Currency Stripe & UPI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-[#1e1b24] shadow-pop-sm">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free Air Delivery &gt; {formatPrice(2000, currency)}</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): The Mascot Artwork with Tape & Starburst */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Starburst Badge in corner */}
              <div className="absolute -left-6 -top-8 z-20 -rotate-12">
                <StarburstBadge className="w-28 h-28 text-amber-400">
                  <div className="text-[10px] leading-tight font-black uppercase text-[#1e1b24]">
                    100%<br />CINEMA<br />SOUL
                  </div>
                </StarburstBadge>
              </div>

              {/* Main Mascot Card with Pop Shadow and slight rotation */}
              <div className="sticker rotate-1 p-3 bg-white shadow-pop-lg relative">
                <div className="relative rounded-xl overflow-hidden bg-purple-50 border-2 border-[#1e1b24] aspect-square">
                  <img
                    src="/public/assets/aistudio/image_63c6260c.png"
                    alt="Ohshewatchedit Store - Retro TV with Orange Cat and Popcorn"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white text-[10px] font-black uppercase text-purple-900 px-2.5 py-1 rounded-full border-2 border-[#1e1b24] shadow-pop-sm">
                    Mascot Edition ★
                  </div>
                </div>

                {/* Hand-drawn caption tape note */}
                <div className="mt-3 p-2 bg-[#fef08a] rounded-xl border-2 border-[#1e1b24] shadow-pop-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-[#1e1b24] flex items-center gap-1.5">
                      <span>Meet Zoon</span>
                      <span className="text-[10px] bg-amber-400 px-1 py-0.2 rounded border border-[#1e1b24] font-mono">
                        Collar "Z" Medallion
                      </span>
                    </div>
                    <div className="text-[11px] font-hand text-stone-700 text-sm font-bold">
                      "I wander world film alleys & bring back treasures for you! 🍿"
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-[#1e1b24] text-white px-2 py-0.5 rounded">
                    Zoon 🐱
                  </span>
                </div>
              </div>

              {/* Floating Bottom Stamp */}
              <div className="absolute -bottom-4 -right-4 z-20 bg-rose-400 text-white font-hand text-lg font-black px-3.5 py-1 rounded-xl border-2 border-[#1e1b24] shadow-pop-sm -rotate-6">
                What your heart desires! ❤️
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
