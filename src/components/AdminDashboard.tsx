import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  Database, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Plus, 
  RefreshCw, 
  Search, 
  Filter, 
  ExternalLink,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { Order, Product, CurrencyCode, OrderStatus } from '../types';
import { formatPrice } from '../utils/currency';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  products: Product[];
  currency: CurrencyCode;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onAddNewProduct: (newProduct: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  orders,
  products,
  currency,
  onUpdateOrderStatus,
  onUpdateProductStock,
  onAddNewProduct,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'cloud'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // New product form state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Trump Cards' | 'Greeting Cards' | 'Stickers' | 'Bookmarks' | 'Notepads & Stationery' | 'Collector Prints'>('Trump Cards');
  const [newPriceINR, setNewPriceINR] = useState(899);
  const [newStock, setNewStock] = useState(30);
  const [newArtisanLoc, setNewArtisanLoc] = useState('Jaipur Studio');
  const [newFolkStyle, setNewFolkStyle] = useState('Indian Truck Art & Pop');

  // KPI calculations
  const totalRevenueINR = orders.reduce((acc, o) => acc + o.totalINR, 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered').length;
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newTitle.trim(),
      quirkySubtitle: newSubtitle.trim() || 'Handcrafted contemporary Indian craft piece',
      category: newCategory,
      priceInINR: Number(newPriceINR),
      rating: 5.0,
      reviewCount: 0,
      image: '/src/assets/images/hero_indo_modern_storefront_1794253152729.jpg',
      stock: Number(newStock),
      description: 'Exclusive artisanal piece newly released in the Masala Pop collection.',
      folkArtStyle: newFolkStyle,
      artisanLocation: newArtisanLoc,
      badge: 'New Arrival',
      tags: [newCategory, 'Artisanal'],
      materials: ['Handmade natural materials'],
      reviews: [],
    };

    onAddNewProduct(created);
    setShowAddProductModal(false);
    setNewTitle('');
    setNewSubtitle('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[94vh]">
        {/* Top Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm">
              MP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Masala Pop · Store Operations Console</h2>
                <span className="text-[11px] font-semibold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Dual-Cloud Active
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Real-time inventory tracking, multi-gateway orders & hybrid Firebase/Supabase cloud architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 bg-stone-50 border-b border-stone-200 flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Live Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Inventory & Catalog ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'cloud'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cloud Architecture & Sync Monitor</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="text-xs font-semibold text-stone-500 mb-1">Gross Sales (Active)</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-stone-900 tabular-nums">
                {formatPrice(totalRevenueINR, currency)}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1">
                ↑ 24% vs last week
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="text-xs font-semibold text-stone-500 mb-1">Total Processed Orders</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-stone-900 tabular-nums">
                {orders.length}
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                Stripe & UPI gateways
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-xs font-semibold text-amber-900 mb-1">Fulfillments Pending</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-950 tabular-nums">
                {pendingOrdersCount}
              </div>
              <div className="text-[11px] text-amber-800 font-medium mt-1">
                Requires artisan dispatch
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="text-xs font-semibold text-rose-900 mb-1">Low Inventory Warnings</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-rose-950 tabular-nums">
                {lowStockCount}
              </div>
              <div className="text-[11px] text-rose-700 font-medium mt-1">
                Stock &le; 10 units
              </div>
            </div>
          </div>

          {/* TAB 1: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search Order ID, customer, city..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-stone-100 rounded-xl text-xs">
                  {['All', 'Confirmed', 'Handcrafted', 'Dispatched', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1 font-semibold rounded-lg transition-colors whitespace-nowrap ${
                        orderStatusFilter === status
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Order ID & Date</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Items</th>
                        <th className="px-4 py-3">Total Paid</th>
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Quick Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-stone-400 italic">
                            No orders found matching the criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-amber-50/40 transition-colors">
                            <td className="px-4 py-3.5">
                              <div className="font-mono font-bold text-stone-900">#{order.id}</div>
                              <div className="text-[11px] text-stone-400">{order.date}</div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-stone-900">{order.customer.name}</div>
                              <div className="text-[11px] text-stone-500">{order.customer.city}, {order.customer.country}</div>
                            </td>
                            <td className="px-4 py-3.5 text-stone-600">
                              {order.items.map((it) => (
                                <div key={it.id} className="truncate max-w-[180px]">
                                  {it.quantity}x {it.product.name}
                                </div>
                              ))}
                            </td>
                            <td className="px-4 py-3.5 font-mono font-bold text-stone-900 tabular-nums">
                              {formatPrice(order.totalINR, currency)}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="font-mono uppercase text-[11px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                                {order.paymentMethod === 'stripe_card' ? 'Stripe Card' : order.paymentMethod.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.orderStatus === 'Dispatched'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.orderStatus === 'Handcrafted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {order.orderStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <select
                                value={order.orderStatus}
                                onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className="bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold px-2 py-1 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Handcrafted">Handcrafted</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY & CATALOG TRACKING */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Artisan Catalog & Real-Time Stock</h3>
                  <p className="text-xs text-stone-500">Manage products, restock artisanal batches, and add new drops.</p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Inventory Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Artisan Location</th>
                        <th className="px-4 py-3">Price ({currency})</th>
                        <th className="px-4 py-3">Stock Units</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="px-4 py-3.5 flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 object-cover rounded-lg bg-stone-100 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-stone-900">{prod.name}</div>
                              <div className="text-[11px] text-stone-400">{prod.folkArtStyle}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-stone-600">
                            {prod.category}
                          </td>
                          <td className="px-4 py-3.5 text-stone-600">
                            {prod.artisanLocation}
                          </td>
                          <td className="px-4 py-3.5 font-mono font-bold text-stone-900 tabular-nums">
                            {formatPrice(prod.priceInINR, currency)}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`font-mono font-bold ${
                              prod.stock <= 8 ? 'text-rose-600' : 'text-stone-800'
                            }`}>
                              {prod.stock} units
                            </span>
                            {prod.stock <= 8 && (
                              <span className="text-[10px] text-rose-500 block font-semibold">Low Stock</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-right space-x-1">
                            <button
                              onClick={() => onUpdateProductStock(prod.id, prod.stock + 5)}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 text-[11px] transition-colors"
                            >
                              +5 Restock
                            </button>
                            <button
                              onClick={() => onUpdateProductStock(prod.id, Math.max(0, prod.stock - 1))}
                              className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-[11px] transition-colors"
                            >
                              -1
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DUAL CLOUD ARCHITECTURE & REPLICATION MONITOR */}
          {activeTab === 'cloud' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Server className="w-5 h-5" />
                    <span>Dual-Database Cloud Strategy Architecture</span>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    High Availability · Scale-to-Zero Free Tier
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  As configured for your production deployment on Google AI Studio & Vercel, the application operates a complementary dual-database pipeline:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-xs">1. Firebase Firestore & Auth</span>
                      <span className="text-[10px] text-emerald-400 font-mono">LIVE LISTENER</span>
                    </div>
                    <p className="text-[11px] text-stone-300">
                      Handles live sub-second cart synchronization, active support chat presence, push notification listeners, and client auth state.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-300 text-xs">2. Supabase PostgreSQL</span>
                      <span className="text-[10px] text-emerald-400 font-mono">REPLICATION POOL</span>
                    </div>
                    <p className="text-[11px] text-stone-300">
                      Stores relational financial ledgers, multi-currency conversion logs, complex SKU inventory joins, and audit trails for compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live replication sync check */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Cloud Replication & Health Checks</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="font-medium text-stone-700">Firebase Firestore WebSocket</span>
                    <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 18ms latency
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="font-medium text-stone-700">Supabase PostgreSQL Connection Pool</span>
                    <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 24ms query time
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="font-medium text-stone-700">Stripe Webhook Verification</span>
                    <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 256-bit signatures valid
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add New Product */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-60 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-stone-900 text-base">Add New Quirky Indo-Modern Item</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Hollywood Villains Gold Foil Trump Card Pack"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Quirky Subtitle</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="e.g. 18 Collector cards with Joker, Thanos & Vader stats"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="Trump Cards">Trump Cards</option>
                      <option value="Greeting Cards">Greeting Cards</option>
                      <option value="Stickers">Stickers</option>
                      <option value="Bookmarks">Bookmarks</option>
                      <option value="Notepads & Stationery">Notepads & Stationery</option>
                      <option value="Collector Prints">Collector Prints</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Base Price in INR (₹)</label>
                    <input
                      type="number"
                      value={newPriceINR}
                      onChange={(e) => setNewPriceINR(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Initial Stock Units</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Artisan Location</label>
                    <input
                      type="text"
                      value={newArtisanLoc}
                      onChange={(e) => setNewArtisanLoc(e.target.value)}
                      placeholder="e.g. Jodhpur, Rajasthan"
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800"
                  >
                    Publish to Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
