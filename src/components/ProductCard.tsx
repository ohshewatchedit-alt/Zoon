import React from 'react';
import { Heart, Star, Plus, Check, Sparkles } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  isAddedJustNow?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isAddedJustNow = false,
  index = 0,
}) => {
  // Slight quirky rotation angles
  const rotations = ['rotate-[-0.8deg]', 'rotate-[0.6deg]', 'rotate-[-0.4deg]', 'rotate-[1deg]'];
  const rotationClass = rotations[index % rotations.length];

  return (
    <div 
      onClick={() => onSelect(product)}
      className={`group flex flex-col sticker wiggle-hover cursor-pointer overflow-hidden ${rotationClass}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b-[2.5px] border-[#1e1b24]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quirky Tape / Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-amber-300 text-[#1e1b24] text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md border-2 border-[#1e1b24] shadow-pop-sm -rotate-2">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full border-2 border-[#1e1b24] transition-all duration-200 shadow-pop-sm ${
            isWishlisted
              ? 'bg-rose-100 text-rose-600'
              : 'bg-white hover:bg-rose-50 text-[#1e1b24] hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Low stock tag */}
        {product.stock <= 10 && (
          <div className="absolute bottom-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#1e1b24]">
            Only {product.stock} left in den!
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        {/* Category & Movie Fandom */}
        <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-1 font-bold">
          <span className="uppercase tracking-wider text-purple-700">{product.category}</span>
          {product.movieFandom && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[130px] text-stone-900 font-semibold">{product.movieFandom.split(',')[0]}</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-black text-stone-900 line-clamp-1 group-hover:text-purple-700 transition-colors mb-1 leading-snug">
          {product.name}
        </h3>

        {/* Zoon's Journey Stamp if present */}
        {product.zoonJourney && (
          <div className="flex items-center gap-1 text-[11px] font-hand text-purple-900 font-bold mb-1.5 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200/80">
            <span>🐾</span>
            <span className="truncate">{product.zoonJourney}</span>
          </div>
        )}

        {/* Subtitle / Cheeky Tone */}
        <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
          {product.quirkySubtitle}
        </p>

        {/* Rating and Price Footer */}
        <div className="mt-auto pt-3 border-t-2 border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="rounded-full border-2 border-[#1e1b24] bg-amber-300 text-[#1e1b24] px-2.5 py-0.5 text-xs sm:text-sm font-black font-mono shadow-pop-sm tabular-nums">
                {formatPrice(product.priceInINR, currency)}
              </span>
              {product.originalPriceInINR && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  {formatPrice(product.originalPriceInINR, currency)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1.5 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="text-stone-800">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          {/* Quick Pop Add Button */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border-2 border-[#1e1b24] shadow-pop-sm hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 ${
              isAddedJustNow
                ? 'bg-emerald-400 text-[#1e1b24]'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
            title="Quick add to bag"
          >
            {isAddedJustNow ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Got it!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
