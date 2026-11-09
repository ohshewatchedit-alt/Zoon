import React from 'react';
import { ShieldCheck, Heart, LayoutDashboard, Globe, Lock } from 'lucide-react';
import { CurrencyCode } from '../types';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
  currency: CurrencyCode;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectCategory, currency }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info with Mascot */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/public/assets/aistudio/image_63c6260c.png"
                alt="Ohshewatchedit Mascot Logo"
                className="w-9 h-9 rounded-xl object-cover border border-purple-400 bg-purple-950"
              />
              <span className="text-xl font-black tracking-tight text-white block">
                Ohshewatchedit
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              A warm indie studio by film reviewer <strong className="text-stone-200">@ohshewatchedit</strong> and Zoon. Celebrating world cinema with quirky handcrafted cards, stickers, and stationery where you get what your heart desires.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-semibold pt-1">
              <a
                href="https://instagram.com/reel/DPRLTwhE5-v"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <span>Instagram: @ohshewatchedit</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Cinephile Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('Trump Cards')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Hollywood Auteurs Trump Decks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Greeting Cards')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Movie Dialogue Birthday Cards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Stickers')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Die-Cut Waterproof Vinyl Stickers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Bookmarks')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Brass Filmstrip & Tassel Bookmarks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Notepads & Stationery')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Movie Rating Notepads & Journals
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Guilds */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Craft Provenance
            </h4>
            <p className="text-stone-400 leading-relaxed text-xs mb-3">
              Direct partnership clusters in Bagru, Sanganer, Nathdwara, Varanasi, Dharavi, and Khurja. 100% of proceeds support generational artisan lineages.
            </p>
            <div className="flex items-center gap-1.5 text-stone-400">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Worldwide Air Delivery across 65+ Nations</span>
            </div>
          </div>

          {/* Payment & Admin */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Secure Multi-Currency Gateway
            </h4>
            <p className="text-stone-400 text-xs mb-3">
              Stripe 256-bit encrypted checkout, UPI instant autopay (GPay/PhonePe), Apple Pay & Cash on Delivery.
            </p>
            <button
              onClick={onOpenAdmin}
              className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 rounded-xl font-bold flex items-center justify-center gap-2 border border-stone-700 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch Store Admin Operations</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & payment security */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Masala Pop Studio. Handcrafted in India. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>PCI-DSS Level 1 Secure</span>
            </span>
            <span>·</span>
            <span>Firebase & Supabase Cloud High Availability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
