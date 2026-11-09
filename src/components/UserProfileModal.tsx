import React, { useState } from 'react';
import { 
  X, 
  Package, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Truck, 
  User, 
  CreditCard,
  LogOut,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { UserProfile, Order, Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  orders: Order[];
  allProducts: Product[];
  currency: CurrencyCode;
  onSwitchRole: (role: 'customer' | 'admin') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  allProducts,
  currency,
  onSwitchRole,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'security'>('orders');

  const wishlistedProducts = allProducts.filter((p) => user.wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]">
        {/* User Banner */}
        <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 text-xl font-extrabold flex items-center justify-center border-2 border-white shadow-md">
              {user.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">{user.name}</h2>
                <span className="text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded uppercase">
                  {user.role === 'admin' ? 'Store Manager' : 'VIP Patron'}
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">{user.email} · {user.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 pt-3 bg-stone-50 border-b border-stone-200 flex items-center gap-6 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History & Tracking ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Role Switcher</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">
          {/* TAB 1: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  You have not placed any orders yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-4 hover:border-amber-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-stone-900">Order #{order.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">{order.date} · Waybill: {order.trackingNumber}</div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-base text-stone-900 tabular-nums">
                          {formatPrice(order.totalINR, currency)}
                        </div>
                        <div className="text-[11px] text-stone-500 uppercase font-mono">
                          Via {order.paymentMethod === 'stripe_card' ? 'Stripe Elements' : order.paymentMethod.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2">
                      {order.items.map((it) => (
                        <div key={it.id} className="flex items-center gap-3 text-xs">
                          <img
                            src={it.product.image}
                            alt={it.product.name}
                            className="w-12 h-12 object-cover rounded-lg bg-stone-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-stone-900 truncate">{it.product.name}</div>
                            <div className="text-stone-500 text-[11px]">
                              Qty: {it.quantity} {it.selectedVariant ? `· ${it.selectedVariant}` : ''}
                            </div>
                          </div>
                          <div className="font-mono font-bold text-stone-800 tabular-nums">
                            {formatPrice(it.product.priceInINR * it.quantity, currency)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="pt-2 border-t border-stone-100">
                      <div className="text-[11px] font-bold text-stone-700 mb-2">Live Shipment Updates:</div>
                      <div className="space-y-2">
                        {order.timeline.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-stone-900">{step.title}</span>
                              <span className="text-stone-400 text-[10px]"> ({step.timestamp})</span>
                              <p className="text-stone-500 text-[11px]">{step.description} · <span className="text-stone-600 font-medium">{step.location}</span></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  Your wishlist is empty. Tap the heart icon on any product to save it here.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div key={p.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-xl bg-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                        <div className="text-[11px] font-mono font-bold text-stone-700 mt-0.5">
                          {formatPrice(p.priceInINR, currency)}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              onAddToCart(p);
                            }}
                            className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-[11px] font-bold hover:bg-stone-800"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => {
                              onSelectProduct(p);
                              onClose();
                            }}
                            className="px-2 py-1 text-stone-600 hover:text-stone-900 text-[11px] underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>Primary Residence (Default Dispatch Address)</span>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    Default
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {user.name} <br />
                  {user.savedAddress.street} <br />
                  {user.savedAddress.city}, {user.savedAddress.state} - {user.savedAddress.postalCode} <br />
                  {user.savedAddress.country}
                </p>
                <div className="text-stone-500 pt-1">
                  Contact Phone: {user.phone}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Security & Role Switcher */}
          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="font-bold text-stone-900 text-sm">
                  Switch Active Simulation Account
                </div>
                <p className="text-stone-600">
                  Easily toggle between customer patron view and store manager admin console:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onSwitchRole('customer')}
                    className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                      user.role === 'customer'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300'
                    }`}
                  >
                    Customer Profile (Priya Sharma)
                  </button>
                  <button
                    onClick={() => onSwitchRole('admin')}
                    className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                      user.role === 'admin'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-stone-700 border-stone-300'
                    }`}
                  >
                    Store Admin (Rajiv Menon)
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <div className="font-bold text-stone-900">Communication & Notification Preferences</div>
                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-600 focus:ring-amber-500" />
                  <span>Real-time WhatsApp shipment notifications via BlueDart API</span>
                </label>
                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-600 focus:ring-amber-500" />
                  <span>Exclusive artisan drop & promo alerts</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
