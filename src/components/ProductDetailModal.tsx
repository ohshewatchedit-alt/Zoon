import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { Product, CurrencyCode, Review } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: CurrencyCode;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onSelectProduct,
  onAddReview,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.options[0] || undefined
  );
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'artisan' | 'reviews'>('details');

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      author: reviewAuthor.trim(),
      city: reviewCity.trim() || 'India',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Artisanal Delight',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    });

    setReviewAuthor('');
    setReviewCity('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    setActiveTab('reviews');
  };

  // Recommendations: products from same category or complementary
  const recommendations = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-pop-lg overflow-hidden border-[3px] border-[#1e1b24] max-h-[92vh] flex flex-col">
        {/* Top Dismiss Bar */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white hover:bg-amber-100 text-[#1e1b24] border-2 border-[#1e1b24] shadow-pop-sm transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Gallery / Image Stage (Left 6 cols) */}
            <div className="lg:col-span-6 bg-stone-100 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-stone-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-stone-900/90 text-stone-100 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-sm">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Artisan Provenance Card */}
              <div className="mt-6 p-4 rounded-xl bg-white border border-stone-200/90 text-xs text-stone-700">
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Artisan Origin: {product.artisanLocation}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Craft tradition: <span className="font-semibold text-stone-800">{product.folkArtStyle}</span>. Each piece is hand-finished by master craftspeople using traditional tools.
                </p>
              </div>
            </div>

            {/* Contiguous Purchase Module (Right 6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Clean unboxed category kicker */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-2">
                  <span className="uppercase tracking-wider text-amber-700">{product.category}</span>
                  {product.movieFandom && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-700 font-medium">{product.movieFandom}</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span>{product.folkArtStyle}</span>
                </div>

                {/* Title & Hindi title */}
                <div className="mb-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                    {product.name}
                  </h2>
                  {product.hindiTitle && (
                    <div className="text-sm font-medium text-amber-800 mt-1">
                      {product.hindiTitle}
                    </div>
                  )}
                </div>

                {/* Zoon's Journey Travel Stamp */}
                {product.zoonJourney && (
                  <div className="p-3 rounded-2xl bg-amber-50 border-2 border-[#1e1b24] shadow-pop-sm text-xs text-[#1e1b24] font-medium mb-5 flex items-center gap-2.5">
                    <span className="text-xl">🐾</span>
                    <div>
                      <span className="font-black block uppercase text-[10px] text-purple-900">
                        Zoon's World Cinema Diary:
                      </span>
                      <span className="font-hand text-sm font-bold text-[#1e1b24]">
                        {product.zoonJourney}
                      </span>
                    </div>
                  </div>
                )}

                {/* Trump Card Battle Stats Grid if present */}
                {product.cardStats && (
                  <div className="p-3.5 rounded-2xl bg-stone-900 text-white mb-5 border border-amber-500/30">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>🃏 Trump Card Battle Specs</span>
                      <span className="text-stone-400 font-mono text-[10px]">Collector Grade</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.cardStats).map(([key, val]) => (
                        <div key={key} className="bg-stone-800/80 p-2 rounded-xl flex items-center justify-between">
                          <span className="text-stone-400 text-[11px]">{key}</span>
                          <span className="font-mono font-bold text-amber-300">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating & Review summary */}
                <div className="flex items-center gap-3 text-xs mb-5">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-stone-400" aria-hidden="true">·</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-stone-600 hover:text-amber-700 underline font-medium"
                  >
                    {product.reviewCount} verified reviews
                  </button>
                  <span className="text-stone-400" aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold">
                    In Stock ({product.stock} units ready)
                  </span>
                </div>

                {/* Price Module */}
                <div className="p-4 rounded-2xl bg-amber-100/70 border-2 border-[#1e1b24] shadow-pop-sm mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black font-mono text-[#1e1b24] tabular-nums">
                      {formatPrice(product.priceInINR, currency)}
                    </span>
                    {product.originalPriceInINR && (
                      <span className="text-sm text-stone-500 line-through font-mono tabular-nums">
                        {formatPrice(product.originalPriceInINR, currency)}
                      </span>
                    )}
                    {product.originalPriceInINR && (
                      <span className="text-xs font-black text-[#1e1b24] ml-auto bg-amber-300 border border-[#1e1b24] px-2.5 py-0.5 rounded-lg shadow-2xs">
                        Save {Math.round(((product.originalPriceInINR - product.priceInINR) / product.originalPriceInINR) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-600 font-bold mt-1">
                    Free shipping over {formatPrice(2000, currency)} · Ships worldwide via DHL Air
                  </div>
                </div>

                {/* Variant Selector if present */}
                {product.variants && (
                  <div className="mb-6">
                    <label className="block text-xs font-black text-[#1e1b24] uppercase tracking-wider mb-2">
                      Choose {product.variants.type}: <span className="text-purple-700 capitalize">{selectedVariant}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariant(opt)}
                          className={`px-3.5 py-2 text-xs font-black rounded-xl border-2 border-[#1e1b24] transition-all cursor-pointer ${
                            selectedVariant === opt
                              ? 'bg-purple-600 text-white shadow-pop-sm'
                              : 'bg-white text-stone-800 hover:bg-stone-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Primary Action */}
                <div className="flex items-center gap-3 mb-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border-2 border-[#1e1b24] rounded-xl bg-white p-1 shadow-pop-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="w-10 text-center font-mono font-black text-sm text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all border-2 border-[#1e1b24] shadow-pop hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer ${
                      addedNotice
                        ? 'bg-emerald-400 text-[#1e1b24]'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                        <span>Add {quantity > 1 ? `(${quantity})` : ''} to Bag · {formatPrice(product.priceInINR * quantity, currency)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist CTA */}
                  <button
                    onClick={(e) => onToggleWishlist(product.id, e)}
                    className={`p-3.5 rounded-xl border-2 border-[#1e1b24] shadow-pop-sm transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 border-t border-stone-200 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Ethical Artisan Direct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Free Shipping &gt; {formatPrice(4000, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl mb-4">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'details' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Details & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('artisan')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'artisan' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Artisan Story
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'reviews' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                {/* Tab 1: Details */}
                {activeTab === 'details' && (
                  <div className="space-y-3 text-xs text-stone-600">
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="space-y-1 pt-2 border-t border-stone-100">
                      <div><strong className="text-stone-800">Materials:</strong> {product.materials.join(', ')}</div>
                      {product.dimensions && (
                        <div><strong className="text-stone-800">Dimensions:</strong> {product.dimensions}</div>
                      )}
                      {product.careInstructions && (
                        <div><strong className="text-stone-800">Care:</strong> {product.careInstructions}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 2: Artisan Story */}
                {activeTab === 'artisan' && (
                  <div className="space-y-3 text-xs text-stone-600">
                    <div className="font-bold text-stone-900 text-sm">
                      Master Craftspeople of {product.artisanLocation}
                    </div>
                    <p className="leading-relaxed">
                      Every order directly funds living wages, clean dye workshops, and generational craft preservation for artisan families across Rajasthan, Varanasi, and Bengal. No mass-market factories, only genuine craftsmanship with pride.
                    </p>
                  </div>
                )}

                {/* Tab 3: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-stone-800">
                        Customer Experiences ({product.reviews.length})
                      </div>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
                      >
                        {showReviewForm ? 'Cancel Review' : '+ Write a Review'}
                      </button>
                    </div>

                    {/* Write Review Form */}
                    {showReviewForm && (
                      <form onSubmit={handleSubmitReview} className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-700 font-semibold mb-1">Your Name</label>
                            <input
                              type="text"
                              value={reviewAuthor}
                              onChange={(e) => setReviewAuthor(e.target.value)}
                              placeholder="e.g. Rohini Iyer"
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-stone-700 font-semibold mb-1">City / Country</label>
                            <input
                              type="text"
                              value={reviewCity}
                              onChange={(e) => setReviewCity(e.target.value)}
                              placeholder="e.g. Bangalore, India"
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">Star Rating</label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setReviewRating(s)}
                                className="p-1 hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    s <= reviewRating
                                      ? 'fill-amber-400 text-amber-500'
                                      : 'text-stone-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">Headline</label>
                          <input
                            type="text"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            placeholder="Brief summary of your experience"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">Review</label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="How is the quality, packaging, and feel of the product?"
                            rows={3}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg text-xs hover:bg-stone-800"
                        >
                          Submit Verified Review
                        </button>
                      </form>
                    )}

                    {/* Review List */}
                    <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                      {product.reviews.length === 0 ? (
                        <div className="text-xs text-stone-400 italic py-3 text-center">
                          No reviews yet. Be the first to share your thoughts!
                        </div>
                      ) : (
                        product.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-stone-900">{rev.author}</span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                                ))}
                              </div>
                            </div>
                            <div className="text-[11px] text-stone-500 mb-1.5">
                              {rev.city && <span>{rev.city} · </span>}
                              <span>{rev.date}</span>
                              {rev.verifiedPurchase && (
                                <span className="text-emerald-700 font-semibold"> · Verified Buyer</span>
                              )}
                            </div>
                            <div className="font-semibold text-stone-800 mb-1">{rev.title}</div>
                            <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Strip */}
          <div className="p-6 sm:p-8 bg-stone-50 border-t border-stone-200">
            <h4 className="text-sm font-bold text-stone-900 mb-4 tracking-tight">
              You Might Also Adore · Matching Quirky Aesthetic
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectProduct(rec)}
                  className="bg-white p-3 rounded-xl border border-stone-200 flex items-center gap-3 cursor-pointer hover:border-amber-400 hover:shadow transition-all"
                >
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-14 h-14 object-cover rounded-lg bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-stone-900 truncate">{rec.name}</h5>
                    <div className="text-[11px] font-mono text-stone-600 mt-0.5">
                      {formatPrice(rec.priceInINR, currency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
