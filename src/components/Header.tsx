import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  LayoutDashboard, 
  Check, 
  ChevronDown, 
  X,
  Heart,
  Clapperboard
} from 'lucide-react';
import { CurrencyCode, CURRENCIES, UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onOpenWishlist: () => void;
  currentUser: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenProfile,
  onOpenAdmin,
  onOpenWishlist,
  currentUser,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  notifications,
  onOpenNotifications,
  unreadNotificationsCount,
}) => {
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    'All Movie Crafts',
    'Trump Cards',
    'Greeting Cards',
    'Stickers',
    'Bookmarks',
    'Notepads & Stationery',
  ];

  return (
    <>
      {/* Top Announcement Bar with Instagram link */}
      <div className="bg-[#1e1b24] text-amber-300 text-xs px-4 py-2 border-b-[2.5px] border-[#1e1b24] flex items-center justify-between font-bold">
        <div className="hidden sm:flex items-center gap-2 text-stone-300">
          <span className="text-amber-400 font-extrabold flex items-center gap-1">
            <span>🍿 @ohshewatchedit</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>World Cinema Reviews & Handcrafted Goods</span>
        </div>
        <div className="flex-1 text-center font-bold text-white text-[11px] sm:text-xs">
          🎬 Use code <span className="text-amber-400 font-black tracking-wider bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500">OSWI15</span> for 15% off · Free Global Delivery &gt; ₹2,000 / $30
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://instagram.com/reel/DPRLTwhE5-v"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-300 hover:text-white transition-colors underline font-bold"
          >
            Watch Recent Reel ↗
          </a>
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-[#1e1b24] bg-amber-400 hover:bg-amber-300 transition-colors text-xs font-black px-2.5 py-0.5 rounded-lg border border-[#1e1b24] shadow-pop-sm"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Store Admin</span>
          </button>
        </div>
      </div>

      {/* Main Header with Neo-Brutalist Pop Border */}
      <header className="sticky top-0 z-40 bg-[#faf7f0] border-b-[2.5px] border-[#1e1b24] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-20">
            {/* Zone 1: Brand Wordmark with Mascot Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => onCategorySelect('All Movie Crafts')}
                className="text-left group flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src="/public/assets/aistudio/image_63c6260c.png"
                    alt="Ohshewatchedit Store - Retro TV with Zoon"
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-[#1e1b24] shadow-pop-sm group-hover:scale-105 group-hover:rotate-2 transition-transform bg-purple-100"
                  />
                  <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1e1b24] group-hover:text-purple-700 transition-colors">
                      Ohshewatchedit
                    </span>
                    <span className="hidden lg:inline text-[10px] font-black uppercase text-[#1e1b24] bg-amber-300 px-2 py-0.5 rounded-md border-1.5 border-[#1e1b24] shadow-pop-sm -rotate-2">
                      Zoon's Cinema Store
                    </span>
                  </div>
                  <div className="text-[11px] font-hand font-bold text-stone-600 hidden sm:block">
                    what your heart desires · curated on Zoon's world cinema travels 🐾
                  </div>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Clean single-line prose with pop active state) */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-black text-stone-700">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onCategorySelect(cat)}
                    className={`whitespace-nowrap transition-all px-3 py-1.5 rounded-xl cursor-pointer ${
                      isActive 
                        ? 'bg-[#1e1b24] text-white border-2 border-[#1e1b24] shadow-pop-sm -translate-y-0.5' 
                        : 'text-stone-700 hover:text-[#1e1b24] hover:bg-stone-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Utilities */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Currency Selector Pill */}
              <div className="relative">
                <button
                  onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#1e1b24] bg-white rounded-xl border-2 border-[#1e1b24] shadow-pop-sm hover:bg-stone-50 transition-colors cursor-pointer"
                  title="Switch Currency"
                >
                  <span>{CURRENCIES[currentCurrency].symbol} {currentCurrency}</span>
                  <ChevronDown className="w-3 h-3 text-stone-700 stroke-[3]" />
                </button>

                {currencyMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border-2 border-[#1e1b24] shadow-pop py-1.5 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-black uppercase text-stone-400 border-b border-stone-200">
                      Store Currency
                    </div>
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          onCurrencyChange(curr.code);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer ${
                          currentCurrency === curr.code ? 'font-black text-purple-700 bg-purple-50' : 'text-stone-700 font-semibold'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono font-bold w-6 text-stone-900">{curr.symbol}</span>
                          <span>{curr.name}</span>
                        </span>
                        {currentCurrency === curr.code && <Check className="w-3.5 h-3.5 text-purple-700 stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-xl border-2 border-[#1e1b24] bg-white text-stone-700 hover:text-stone-900 shadow-pop-sm transition-all cursor-pointer ${
                  searchOpen ? 'bg-amber-300 text-stone-950' : ''
                }`}
                title="Search products"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Notifications Bell */}
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-xl border-2 border-[#1e1b24] bg-white text-stone-700 hover:text-stone-900 shadow-pop-sm transition-all cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4 stroke-[2.5]" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black border border-[#1e1b24] flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border-2 border-[#1e1b24] bg-white text-stone-800 shadow-pop-sm hover:bg-amber-50 transition-colors cursor-pointer"
                title="User Profile & Order Tracking"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-300 text-stone-950 text-xs font-black flex items-center justify-center border border-[#1e1b24]">
                  {currentUser.avatar}
                </div>
                <span className="hidden sm:inline text-xs font-black">{currentUser.name.split(' ')[0]}</span>
              </button>

              {/* Shopping Bag Primary Pop CTA */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all border-2 border-[#1e1b24] shadow-pop-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5] text-amber-300" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-amber-300 text-[#1e1b24] font-black text-[11px] px-1.5 py-0.2 rounded-md border border-[#1e1b24] min-w-4.5 text-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search Drawer */}
          {searchOpen && (
            <div className="py-3 border-t-2 border-[#1e1b24] flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 stroke-[2.5]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search movie trump cards, Godfather dialogue cards, stickers, bookmarks, notepads..."
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border-2 border-[#1e1b24] rounded-xl shadow-pop-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-stone-900 placeholder:text-stone-400 font-semibold"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-black text-stone-700 hover:text-stone-950 px-3 py-2 rounded-xl border-2 border-[#1e1b24] bg-white shadow-pop-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
