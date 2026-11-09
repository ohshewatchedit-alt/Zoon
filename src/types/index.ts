export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromINR: number; // 1 INR = rateFromINR in target currency
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromINR: 1, decimals: 0 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromINR: 0.012, decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromINR: 0.011, decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromINR: 0.0095, decimals: 2 },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateFromINR: 0.044, decimals: 2 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateFromINR: 0.016, decimals: 2 },
};

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  city?: string;
}

export interface Product {
  id: string;
  name: string;
  quirkySubtitle: string;
  hindiTitle?: string;
  movieFandom?: string; // e.g. "The Godfather", "Pulp Fiction", "Interstellar", "Star Wars", "Wes Anderson"
  zoonJourney?: string; // e.g. "Brought back from Tokyo alley", "Discovered on Paris Left Bank", "Found in Mumbai Film Hub"
  countryOrigin?: string; // e.g. "Japan", "India", "France", "United States", "Hong Kong", "Italy"
  category: 'Trump Cards' | 'Greeting Cards' | 'Stickers' | 'Bookmarks' | 'Notepads & Stationery' | 'Collector Prints';
  priceInINR: number;
  originalPriceInINR?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  stock: number;
  description: string;
  folkArtStyle: string; // e.g. "Indian Truck-Art Typography", "Jaipur Geometric Blockprint", "Pichwai Pop Floral"
  artisanLocation: string; // e.g. "Jaipur Studio Guild", "Bandra Pop Art Lab"
  badge?: string;
  tags: string[];
  materials: string[];
  careInstructions?: string;
  dimensions?: string;
  cardStats?: { [key: string]: string | number }; // for trump cards (e.g. IMDb, Oscar Wins, Cult Factor, Plot Twist)
  variants?: {
    type: 'size' | 'color' | 'edition';
    options: string[];
  };
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type OrderStatus = 'Confirmed' | 'Handcrafted' | 'Dispatched' | 'Out for Delivery' | 'Delivered';

export interface OrderUpdate {
  timestamp: string;
  title: string;
  description: string;
  location: string;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  items: CartItem[];
  subtotalINR: number;
  discountINR: number;
  shippingINR: number;
  totalINR: number;
  paidAmount: number;
  currency: CurrencyCode;
  paymentMethod: 'stripe_card' | 'upi' | 'apple_pay' | 'cod';
  paymentStatus: 'paid' | 'pending_verification';
  orderStatus: OrderStatus;
  trackingNumber: string;
  timeline: OrderUpdate[];
  cloudSync: {
    firebaseFirestore: boolean;
    supabasePostgres: boolean;
    syncedAt: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone: string;
  avatar: string;
  savedAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  wishlistIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'stock';
  timestamp: string;
  read: boolean;
  orderId?: string;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  senderName: string;
  text: string;
  timestamp: string;
  options?: string[];
}
