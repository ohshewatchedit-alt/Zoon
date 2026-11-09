/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Sparkles, 
  ArrowUpDown, 
  Search, 
  MapPin, 
  Layers,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { 
  Product, 
  CartItem, 
  Order, 
  CurrencyCode, 
  UserProfile, 
  NotificationItem, 
  OrderStatus,
  Review 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  DEMO_USER, 
  INITIAL_NOTIFICATIONS 
} from './data/mockProducts';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CinemaMarquee } from './components/CinemaMarquee';
import { ZoonCinemaAnimation } from './components/ZoonCinemaAnimation';
import { ZoonJourneyPassport } from './components/ZoonJourneyPassport';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UserProfileModal } from './components/UserProfileModal';
import { LiveSupportChat } from './components/LiveSupportChat';
import { NotificationCenter } from './components/NotificationCenter';
import { PushToast } from './components/PushToast';
import { Footer } from './components/Footer';

export default function App() {
  // Global App States
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedVariant: 'Royal Peacock Teal',
    },
  ]);

  // Active Toast Push Alert
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Filter & Search States
  const [activeCategory, setActiveCategory] = useState<string>('All Movie Crafts');
  const [activeJourneyStop, setActiveJourneyStop] = useState<string>('All Journeys');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Modals / Drawers visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedCheckoutPromo, setAppliedCheckoutPromo] = useState<{ code: string; discountPercent: number } | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [recentAddedProductId, setRecentAddedProductId] = useState<string | null>(null);

  // Browser Push Permission
  const [pushPermission, setPushPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  const requestBrowserPush = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPushPermission(perm);
      if (perm === 'granted') {
        const testPush: NotificationItem = {
          id: `notif-${Date.now()}`,
          title: 'Push Notifications Activated! 🔔',
          message: 'You will receive real-time parcel dispatch updates and exclusive flash alerts directly.',
          type: 'order',
          timestamp: 'Just now',
          read: false,
        };
        setNotifications((prev) => [testPush, ...prev]);
        setActiveToast(testPush);
      }
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `item-${Date.now()}-${Math.random()}`,
            product,
            quantity,
            selectedVariant: variant || product.variants?.options[0],
          },
        ];
      }
    });

    setRecentAddedProductId(product.id);
    setTimeout(() => setRecentAddedProductId(null), 1800);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQuantity } : it))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((it) => it.id !== itemId));
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentUser((prev) => {
      const isAlready = prev.wishlistIds.includes(productId);
      const nextWishlist = isAlready
        ? prev.wishlistIds.filter((id) => id !== productId)
        : [...prev.wishlistIds, productId];
      return { ...prev, wishlistIds: nextWishlist };
    });
  };

  // Product reviews
  const handleAddReview = (productId: string, newReviewData: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [fullReview, ...prod.reviews];
          const avgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...prod,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Number(avgRating.toFixed(1)),
          };
        }
        return prod;
      })
    );

    // If active product in modal, sync it
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [fullReview, ...prev.reviews];
        const avgRating =
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: Number(avgRating.toFixed(1)),
        };
      });
    }
  };

  // Order placed successfully
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    setCart([]);
    setIsCartOpen(false);

    // Create push notification
    const orderNotif: NotificationItem = {
      id: `notif-order-${Date.now()}`,
      title: `Order #${newOrder.id} Placed! 🎉`,
      message: `Your payment was verified via ${newOrder.paymentMethod.toUpperCase()}. Artisan guild in ${newOrder.items[0]?.product.artisanLocation || 'Jaipur'} is now preparing your packaging.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      orderId: newOrder.id,
    };
    setNotifications((prev) => [orderNotif, ...prev]);
    setActiveToast(orderNotif);
  };

  // Admin order status update
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = [
            ...ord.timeline,
            {
              timestamp: 'Just now',
              title: `Order Status: ${newStatus}`,
              description: `Operations updated parcel state to ${newStatus}. Synced to Firestore & Supabase.`,
              location: 'Regional Logistics Center',
            },
          ];
          return {
            ...ord,
            orderStatus: newStatus,
            timeline: updatedTimeline,
          };
        }
        return ord;
      })
    );

    // Fire customer push notification toast
    const statusNotif: NotificationItem = {
      id: `notif-status-${Date.now()}`,
      title: `Order #${orderId} Updated: ${newStatus} 📦`,
      message: `Your handcrafted package has been marked as ${newStatus}. BlueDart Air express tracking is active.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      orderId,
    };
    setNotifications((prev) => [statusNotif, ...prev]);
    setActiveToast(statusNotif);
  };

  // Admin stock update
  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  // Admin add new product
  const handleAddNewProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    const promoNotif: NotificationItem = {
      id: `notif-drop-${Date.now()}`,
      title: `New Artisan Drop: ${newProd.name} ✨`,
      message: `Just added to the ${newProd.category} collection from ${newProd.artisanLocation}.`,
      type: 'promo',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [promoNotif, ...prev]);
    setActiveToast(promoNotif);
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchCat =
        activeCategory === 'All Movie Crafts' || prod.category === activeCategory;
      const matchStock = !onlyInStock || prod.stock > 0;
      const matchJourney =
        activeJourneyStop === 'All Journeys' ||
        (prod.countryOrigin && prod.countryOrigin.toLowerCase().includes(activeJourneyStop.toLowerCase())) ||
        (prod.zoonJourney && prod.zoonJourney.toLowerCase().includes(activeJourneyStop.toLowerCase())) ||
        (prod.movieFandom && prod.movieFandom.toLowerCase().includes(activeJourneyStop.toLowerCase())) ||
        (activeJourneyStop === 'Japen' && (
          prod.countryOrigin?.toLowerCase().includes('japen') ||
          prod.countryOrigin?.toLowerCase().includes('japan') ||
          prod.name.toLowerCase().includes('kurosawa') ||
          prod.tags.some((t) => t.toLowerCase().includes('japen') || t.toLowerCase().includes('japan') || t.toLowerCase().includes('kurosawa') || t.toLowerCase().includes('miyazaki'))
        )) ||
        (activeJourneyStop === 'France' && (
          prod.countryOrigin?.toLowerCase().includes('france') ||
          prod.tags.some((t) => t.toLowerCase().includes('france') || t.toLowerCase().includes('french') || t.toLowerCase().includes('varda') || t.toLowerCase().includes('nouvelle'))
        )) ||
        (activeJourneyStop === 'Iran' && (
          prod.countryOrigin?.toLowerCase().includes('iran') ||
          prod.tags.some((t) => t.toLowerCase().includes('iran') || t.toLowerCase().includes('kiarostami') || t.toLowerCase().includes('farhadi'))
        )) ||
        (activeJourneyStop === 'Korea' && (
          prod.countryOrigin?.toLowerCase().includes('korea') ||
          prod.tags.some((t) => t.toLowerCase().includes('korea') || t.toLowerCase().includes('bong') || t.toLowerCase().includes('parasite') || t.toLowerCase().includes('oldboy'))
        )) ||
        (activeJourneyStop === 'India' && (
          prod.countryOrigin?.toLowerCase().includes('india') ||
          prod.tags.some((t) => t.toLowerCase().includes('india') || t.toLowerCase().includes('ray') || t.toLowerCase().includes('jaipur'))
        ));
      const matchQuery =
        !searchQuery ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.quirkySubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.folkArtStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.movieFandom && prod.movieFandom.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchStock && matchJourney && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceInINR - b.priceInINR;
      if (sortBy === 'price-desc') return b.priceInINR - a.priceInINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, activeCategory, activeJourneyStop, onlyInStock, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-200">
      {/* Floating Push Toast Alert */}
      <PushToast
        notification={activeToast}
        onDismiss={() => setActiveToast(null)}
        onClick={() => {
          if (activeToast?.orderId) {
            setIsProfileOpen(true);
          }
          setActiveToast(null);
        }}
      />

      {/* Header */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenWishlist={() => setIsProfileOpen(true)}
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={notifications.filter((n) => !n.read).length}
      />

      {/* Hero Showcase (only shown when not searching for focused discovery) */}
      {!searchQuery && activeCategory === 'All Movie Crafts' && (
        <HeroBanner
          onShopNow={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          currency={currency}
        />
      )}

      {/* Infinite Rolling Cinema Marquee Ticker */}
      <CinemaMarquee />

      {/* Main Storefront Body */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Zoon's Homecoming Animation Stage */}
        <ZoonCinemaAnimation />

        {/* Zoon's World Cinema Travelogue Passport */}
        <ZoonJourneyPassport
          activeJourneyStop={activeJourneyStop}
          onSelectJourneyStop={(stop) => {
            setActiveJourneyStop(stop);
            const el = document.getElementById('catalog-grid-anchor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Filter and Viewport Controls Strip */}
        <div id="catalog-grid-anchor" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#1e1b24]">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>Cinephile Merch & Crafts</span>
              <span aria-hidden="true">·</span>
              <span>Showing {filteredProducts.length} Hollywood craft items</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {searchQuery ? `Search results for "${searchQuery}"` : activeCategory}
            </h2>
          </div>

          {/* Interactive filter controls adhering to §1.A: segmented controls & clean sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category selection tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white border-2 border-[#1e1b24] shadow-pop-sm rounded-2xl overflow-x-auto max-w-full text-xs font-black">
              {['All Movie Crafts', 'Trump Cards', 'Greeting Cards', 'Stickers', 'Bookmarks', 'Notepads & Stationery'].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === c
                      ? 'bg-purple-600 text-white border-1.5 border-[#1e1b24] shadow-pop-sm'
                      : 'text-stone-700 hover:text-[#1e1b24] hover:bg-amber-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* In-Stock Toggle */}
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`px-3.5 py-2 text-xs font-black rounded-xl border-2 border-[#1e1b24] shadow-pop-sm transition-all cursor-pointer ${
                onlyInStock
                  ? 'bg-amber-400 text-[#1e1b24]'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              In Stock Only
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-white border-2 border-[#1e1b24] shadow-pop-sm rounded-xl text-xs font-black text-stone-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column / 4-column responsive grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">No quirky products match your criteria</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              Try resetting your category or searching for terms like "kettle", "Pichwai", "shirt", or "tea".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Items');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                index={idx}
                onSelect={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod, e) => {
                  e.stopPropagation();
                  handleAddToCart(prod, 1);
                }}
                isWishlisted={currentUser.wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                isAddedJustNow={recentAddedProductId === product.id}
              />
            ))}
          </div>
        )}

        {/* Folk Craft Provenance Rest & Proof Section (§1.C Section Rhythm) */}
        <section className="mt-20 pt-12 border-t border-stone-200/80">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Cinema Meets Indian Craftsmanship
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Behind Every Cine-Craft: Artisanal Precision
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Every Hollywood trump card deck, movie dialogue card, and film bookmark is manufactured with tactile artisanal methods, from casino-grade German linen cardstock to 35mm laser-etched brass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
              <div className="text-amber-800 font-mono font-bold text-xs uppercase tracking-wide">
                Jaipur Card Press
              </div>
              <h4 className="font-bold text-stone-900 text-sm">350 GSM Casino Linen Deck</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Black-core air-cushioned cardstock with hot-stamped gold foil tuck boxes. Built for intense director battles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
              <div className="text-amber-800 font-mono font-bold text-xs uppercase tracking-wide">
                Sanganer Paper Mill
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Cotton Rag Greeting Cards</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                100% recycled cotton handmade paper paired with blockprinted Kraft envelopes for witty movie birthday quotes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
              <div className="text-amber-800 font-mono font-bold text-xs uppercase tracking-wide">
                Moradabad Metal Guild
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Brass 35mm Film Bookmarks</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Laser-cut solid brass filmstrip cells with Rajasthani starry jaali filigree and pure silk tassels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2">
              <div className="text-amber-800 font-mono font-bold text-xs uppercase tracking-wide">
                Bandra Pop Art Lab
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Die-Cut Waterproof Vinyl</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Scratchproof UV laminate movie stickers with vibrant Indian truck-art typography and popcorn motifs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Live Support Chatbot / Representative */}
      <LiveSupportChat
        orders={orders}
        onOpenOrder={(orderId) => {
          setIsProfileOpen(true);
        }}
      />

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        currency={currency}
      />

      {/* Modals & Drawers */}

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        onAddToCart={(prod, qty, variant) => {
          handleAddToCart(prod, qty, variant);
        }}
        isWishlisted={selectedProduct ? currentUser.wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddReview={handleAddReview}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(promo) => {
          setAppliedCheckoutPromo(promo);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal (Stripe, UPI, Cloud DB Sync) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        promo={appliedCheckoutPromo}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        products={products}
        currency={currency}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateProductStock={handleUpdateProductStock}
        onAddNewProduct={handleAddNewProduct}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        orders={orders}
        allProducts={products}
        currency={currency}
        onSwitchRole={(role) => {
          if (role === 'admin') {
            setCurrentUser({
              ...currentUser,
              id: 'usr-admin-99',
              name: 'Rajiv Menon',
              email: 'rajiv.menon@masalapop.com',
              role: 'admin',
              avatar: 'RM',
            });
            setIsProfileOpen(false);
            setIsAdminOpen(true);
          } else {
            setCurrentUser(DEMO_USER);
          }
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Notification Center Drawer */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onNotificationClick={(notif) => {
          if (notif.orderId) {
            setIsNotificationsOpen(false);
            setIsProfileOpen(true);
          }
        }}
        onRequestBrowserPush={requestBrowserPush}
        pushPermissionState={pushPermission}
      />
    </div>
  );
}
