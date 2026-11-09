import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Check, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (appliedPromo?: { code: string; discountPercent: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotalINR = items.reduce((acc, item) => acc + (item.product.priceInINR * item.quantity), 0);
  const freeShippingThresholdINR = 2000;
  const isFreeShipping = subtotalINR >= freeShippingThresholdINR;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThresholdINR - subtotalINR);
  const shippingProgress = Math.min(100, Math.round((subtotalINR / freeShippingThresholdINR) * 100));

  const discountINR = appliedPromo ? Math.round((subtotalINR * appliedPromo.discountPercent) / 100) : 0;
  const shippingINR = isFreeShipping || items.length === 0 ? 0 : 250;
  const totalINR = Math.max(0, subtotalINR - discountINR + shippingINR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'OSWI15' || clean === 'MASALAPOP15') {
      setAppliedPromo({ code: clean, discountPercent: 15 });
      setPromoError('');
    } else if (clean === 'CINEPHILE20' || clean === 'FOLK20') {
      setAppliedPromo({ code: clean, discountPercent: 20 });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "OSWI15" for 15% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Your Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/60 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You unlocked Free Worldwide Express Shipping! 🎉</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-stone-700 font-medium mb-1">
                  <span>Add {formatPrice(amountNeededForFreeShipping, currency)} for Free Shipping</span>
                  <span>{shippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-200 bg-purple-50 p-1 mb-3 shadow-sm">
                  <img
                    src="/public/assets/aistudio/image_63c6260c.png"
                    alt="Sleepy cinema cat with popcorn"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-extrabold text-stone-800 text-sm mb-1">
                  Your cinema bag is empty!
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-4">
                  Our orange cat is holding onto the popcorn while you find what your heart desires.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Explore Cinema Crafts
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-stone-300 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <div className="text-[11px] text-amber-700 font-medium">
                          Variant: {item.selectedVariant}
                        </div>
                      )}

                      <div className="text-xs font-mono font-bold text-stone-900 mt-0.5 tabular-nums">
                        {formatPrice(item.product.priceInINR, currency)}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-l transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-semibold text-xs text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-r transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                        {formatPrice(item.product.priceInINR * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter promo (e.g. MASALAPOP15)"
                    className="w-full pl-9 pr-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <div className="text-[11px] text-rose-600 font-medium">
                  {promoError}
                </div>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="font-semibold">Promo code "{appliedPromo.code}" applied (-{appliedPromo.discountPercent}%)</span>
                  <button 
                    onClick={() => setAppliedPromo(null)}
                    className="text-stone-400 hover:text-stone-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-900 tabular-nums">
                    {formatPrice(subtotalINR, currency)}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span className="font-mono tabular-nums">
                      -{formatPrice(discountINR, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Express Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingINR === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingINR, currency)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base tabular-nums">
                    {formatPrice(totalINR, currency)}
                  </span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(appliedPromo || undefined)}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Encrypted Multi-Currency Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
