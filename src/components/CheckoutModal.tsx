import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Check, 
  Download, 
  Layers, 
  Clock, 
  Truck,
  RotateCcw,
  Sparkles,
  Film,
  Clapperboard
} from 'lucide-react';
import { CartItem, CurrencyCode, Order, OrderStatus } from '../types';
import { formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  promo?: { code: string; discountPercent: number };
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  promo,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'confirmed'>('details');

  // Customer Details Form
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [phone, setPhone] = useState('+91 98201 44521');
  const [address, setAddress] = useState('Flat 402, Sea Breeze Apts, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [country, setCountry] = useState(currency === 'INR' ? 'India' : 'United States');
  const [postalCode, setPostalCode] = useState('400050');

  // Payment Selection
  const [paymentGateway, setPaymentGateway] = useState<'stripe_card' | 'upi' | 'apple_pay' | 'cod'>('stripe_card');

  // Card state for Stripe simulation
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [cardholderName, setCardholderName] = useState('PRIYA SHARMA');

  // UPI state
  const [upiVpa, setUpiVpa] = useState('priyasharma@okaxis');

  // Processing steps simulation
  const [processingStage, setProcessingStage] = useState<string>('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Financial calculations
  const subtotalINR = items.reduce((acc, item) => acc + (item.product.priceInINR * item.quantity), 0);
  const discountINR = promo ? Math.round((subtotalINR * promo.discountPercent) / 100) : 0;
  const shippingINR = subtotalINR >= 2000 || items.length === 0 ? 0 : 250;
  const totalINR = Math.max(0, subtotalINR - discountINR + shippingINR);

  // Zoon's personalized movie recommendation generator based on purchased items
  const getZoonMovieRecommendations = (orderItems: CartItem[]) => {
    const recs: Array<{
      title: string;
      director: string;
      year: string;
      country: string;
      badge: string;
      zoonNote: string;
    }> = [];

    const hasTrumpCards = orderItems.some((i) => i.product.category === 'Trump Cards' || i.product.name.toLowerCase().includes('trump'));
    const hasGreetingCards = orderItems.some((i) => i.product.category === 'Greeting Cards' || i.product.name.toLowerCase().includes('dialogue'));
    const hasPassportOrTravel = orderItems.some((i) => i.product.name.toLowerCase().includes('passport') || (i.product.tags && i.product.tags.includes('Travel')));
    const hasBookmarksOrStationery = orderItems.some((i) => i.product.category === 'Bookmarks' || i.product.category === 'Notepads & Stationery');
    const hasIran = orderItems.some((i) => (i.product.countryOrigin && i.product.countryOrigin.toLowerCase().includes('iran')) || (i.product.tags && i.product.tags.includes('Iran')));
    const hasKorea = orderItems.some((i) => (i.product.countryOrigin && i.product.countryOrigin.toLowerCase().includes('korea')) || (i.product.tags && i.product.tags.includes('Korea')));

    if (hasIran) {
      recs.push({
        title: 'Close-Up',
        director: 'Abbas Kiarostami',
        year: '1990',
        country: 'Iran 🇮🇷',
        badge: 'Poetic Realism Masterpiece',
        zoonNote: 'Since you got Iranian cinema treasures, Kiarostami’s hybrid documentary/fiction on love for cinema is an unforgettable experience!',
      });
    }

    if (hasKorea) {
      recs.push({
        title: 'Memories of Murder',
        director: 'Bong Joon-ho',
        year: '2003',
        country: 'Korea 🇰🇷',
        badge: 'Korean Golden Wave Noir',
        zoonNote: 'Bong Joon-ho’s haunting, genre-defying masterpiece of rural rain, obsession, and pitch-black humor.',
      });
    }

    if (hasTrumpCards) {
      recs.push({
        title: 'Yojimbo',
        director: 'Akira Kurosawa',
        year: '1961',
        country: 'Japen 🇯🇵',
        badge: 'Trump Battle Pick: 10/10 Standoff',
        zoonNote: 'Witness Kurosawa’s unmatched telephoto staging and Mifune’s cynical ronin swagger that revolutionized cinema!',
      });
      recs.push({
        title: 'Parasite',
        director: 'Bong Joon-ho',
        year: '2019',
        country: 'Korea 🇰🇷',
        badge: 'Palme d\'Or & Oscar Victor',
        zoonNote: 'Architectural staging, precision pacing, and brilliant social satire for your game night debate.',
      });
    }

    if (hasPassportOrTravel) {
      recs.push({
        title: 'Cléo from 5 to 7',
        director: 'Agnès Varda',
        year: '1962',
        country: 'France 🇫🇷',
        badge: 'Nouvelle Vague Left Bank',
        zoonNote: 'Wander the streets of 1960s Paris in real-time through Varda’s luminous, compassionate, and existential camera.',
      });
      recs.push({
        title: 'Where Is the Friend\'s Home?',
        director: 'Abbas Kiarostami',
        year: '1987',
        country: 'Iran 🇮🇷',
        badge: 'Koker Trilogy Travelogue',
        zoonNote: 'A gentle, poetic quest through sun-drenched Iranian hillside paths—pure heart and visual poetry.',
      });
    }

    if (hasBookmarksOrStationery || recs.length === 0) {
      recs.push({
        title: 'Whisper of the Heart',
        director: 'Yoshifumi Kondo (Studio Ghibli)',
        year: '1995',
        country: 'Japan 🇯🇵',
        badge: 'Writing & Craft Warmth',
        zoonNote: 'A gorgeous celebration of cozy writing desks, antique shops, wandering mysterious cats on trains, and crafting from the heart!',
      });
      recs.push({
        title: 'The Music Room (Jalsaghar)',
        director: 'Satyajit Ray',
        year: '1958',
        country: 'India 🇮🇳',
        badge: 'Indian Cinema Heritage',
        zoonNote: 'Ray’s atmospheric masterpiece of fading nobility, hypnotic classical sitar, and haunting chandelier reflections.',
      });
    }

    return recs.slice(0, 3);
  };

  // Handle Quick Pre-fills for Testing
  const handlePreFill = (type: 'india' | 'us') => {
    if (type === 'india') {
      setName('Priya Sharma');
      setEmail('priya.sharma@example.com');
      setPhone('+91 98201 44521');
      setAddress('Flat 402, Sea Breeze Apts, Bandra West');
      setCity('Mumbai');
      setCountry('India');
      setPostalCode('400050');
    } else {
      setName('Alex Johnson');
      setEmail('alex.j@brooklyncraft.com');
      setPhone('+1 (718) 555-0199');
      setAddress('240 Bedford Avenue, Apt 4');
      setCity('Brooklyn, NY');
      setCountry('United States');
      setPostalCode('11211');
    }
  };

  const executeOrder = async () => {
    setStep('processing');
    
    // Stage 1: Stripe & Gateway Handshake
    setProcessingStage('1/3: 256-bit TLS handshake with Stripe & UPI network...');
    await new Promise((r) => setTimeout(r, 800));

    // Stage 2: Dual-Database Cloud Sync (Firebase Firestore + Supabase PostgreSQL)
    setProcessingStage('2/3: Dual-Cloud Replication: Firebase Firestore & Supabase Postgres...');
    await new Promise((r) => setTimeout(r, 900));

    // Stage 3: Air Express Waybill Generation
    setProcessingStage('3/3: Generating artisan waybill & dispatching push alerts...');
    await new Promise((r) => setTimeout(r, 700));

    const newOrderId = `MP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTracking = `BD-AIR-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · Just now',
      customer: {
        name,
        email,
        phone,
        address,
        city,
        country,
        postalCode,
      },
      items: [...items],
      subtotalINR,
      discountINR,
      shippingINR,
      totalINR,
      paidAmount: totalINR,
      currency,
      paymentMethod: paymentGateway,
      paymentStatus: paymentGateway === 'cod' ? 'pending_verification' : 'paid',
      orderStatus: 'Confirmed',
      trackingNumber: newTracking,
      timeline: [
        {
          timestamp: 'Just now',
          title: 'Order Confirmed & Payment Verified',
          description: `Processed successfully via ${paymentGateway === 'stripe_card' ? 'Stripe Elements' : paymentGateway.toUpperCase()}.`,
          location: 'Masala Pop Cloud Hub',
        },
      ],
      cloudSync: {
        firebaseFirestore: true,
        supabasePostgres: true,
        syncedAt: new Date().toISOString(),
      },
    };

    setCompletedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-pop-lg overflow-hidden border-[3px] border-[#1e1b24] flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b-2 border-[#1e1b24] flex items-center justify-between bg-amber-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#1e1b24]">
                Encrypted Checkout 🔒
              </span>
              <span className="text-[#1e1b24]" aria-hidden="true">·</span>
              <span className="text-xs text-stone-800 font-mono font-bold">
                {step === 'details' ? 'Step 1 of 2: Shipping' : step === 'payment' ? 'Step 2 of 2: Gateway' : 'Confirmation'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1e1b24] tracking-tight mt-0.5">
              {step === 'confirmed' ? 'Order Placed Successfully! 🎉' : 'Complete Your Purchase'}
            </h2>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white text-[#1e1b24] border-2 border-[#1e1b24] shadow-pop-sm hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">
          {/* STEP 1: Details */}
          {step === 'details' && (
            <div className="space-y-5">
              {/* Quick autofill helper */}
              <div className="flex items-center justify-between text-xs bg-amber-50 p-3 rounded-xl border border-amber-200/80">
                <span className="font-medium text-amber-900">⚡ Fast Test Fill:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreFill('india')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 transition-colors"
                  >
                    Mumbai Address (INR)
                  </button>
                  <button
                    onClick={() => handlePreFill('us')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 transition-colors"
                  >
                    New York Address (USD)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Email Address (For Tracking & Invoice)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Phone Number (For BlueDart SMS/WhatsApp)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Street Address & Landmark</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-900"
                    required
                  />
                </div>
              </div>

              {/* Order summary mini strip */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900">{items.length} items in package</div>
                  <div className="text-stone-500 text-[11px]">Free artisan wrap included</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Order Total</div>
                  <div className="text-base font-extrabold font-mono text-stone-900 tabular-nums">
                    {formatPrice(totalINR, currency)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Continue to Payment Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Gateway selector tabs */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Choose Payment Gateway
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setPaymentGateway('stripe_card')}
                    className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentGateway === 'stripe_card'
                        ? 'border-[#1e1b24] bg-amber-300 shadow-pop-sm text-[#1e1b24]'
                        : 'border-[#1e1b24] hover:bg-stone-50 bg-white text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-2 text-[#1e1b24]" />
                    <div>
                      <div className="text-xs font-black text-[#1e1b24]">Stripe Card</div>
                      <div className="text-[10px] text-stone-600 font-bold">Visa, MC, Amex</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentGateway('upi')}
                    className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentGateway === 'upi'
                        ? 'border-[#1e1b24] bg-amber-300 shadow-pop-sm text-[#1e1b24]'
                        : 'border-[#1e1b24] hover:bg-stone-50 bg-white text-stone-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mb-2 text-[#1e1b24]" />
                    <div>
                      <div className="text-xs font-black text-[#1e1b24]">UPI / QR</div>
                      <div className="text-[10px] text-stone-600 font-bold">GPay, PhonePe</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentGateway('apple_pay')}
                    className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentGateway === 'apple_pay'
                        ? 'border-[#1e1b24] bg-amber-300 shadow-pop-sm text-[#1e1b24]'
                        : 'border-[#1e1b24] hover:bg-stone-50 bg-white text-stone-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-2 text-[#1e1b24]" />
                    <div>
                      <div className="text-xs font-black text-[#1e1b24]">Apple / GPay</div>
                      <div className="text-[10px] text-stone-600 font-bold">1-Touch Express</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentGateway('cod')}
                    className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentGateway === 'cod'
                        ? 'border-[#1e1b24] bg-amber-300 shadow-pop-sm text-[#1e1b24]'
                        : 'border-[#1e1b24] hover:bg-stone-50 bg-white text-stone-700'
                    }`}
                  >
                    <RotateCcw className="w-5 h-5 mb-2 text-[#1e1b24]" />
                    <div>
                      <div className="text-xs font-black text-[#1e1b24]">Cash on Del.</div>
                      <div className="text-[10px] text-stone-600 font-bold">Pay on doorstep</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Gateway A: Stripe Credit Card Simulated Interface */}
              {paymentGateway === 'stripe_card' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Stripe Elements Secure Form
                    </span>
                    <span className="font-mono text-stone-400">AES-256 PCI DSS</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl font-mono text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl font-mono text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="884"
                          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl font-mono text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Priya Sharma"
                        className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 uppercase tracking-wide"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Gateway B: UPI Instant QR Interface */}
              {paymentGateway === 'upi' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-stone-900">
                      Scan QR or Enter UPI Virtual Payment Address (VPA)
                    </div>
                    <span className="text-xs font-mono text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
                      Expires: 04:59
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-stone-200">
                    {/* Simulated Dynamic UPI QR */}
                    <div className="w-32 h-32 bg-stone-950 p-2 rounded-xl flex flex-col items-center justify-center shrink-0 text-white text-center">
                      <QrCode className="w-20 h-20 text-amber-400" />
                      <span className="text-[10px] font-mono mt-1 font-bold">SCAN WITH ANY APP</span>
                    </div>

                    <div className="space-y-2 text-xs flex-1">
                      <div className="font-semibold text-stone-700">Supported Apps:</div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-bold text-stone-600">
                        <span className="px-2 py-1 bg-stone-100 rounded">Google Pay</span>
                        <span className="px-2 py-1 bg-stone-100 rounded">PhonePe</span>
                        <span className="px-2 py-1 bg-stone-100 rounded">Paytm</span>
                        <span className="px-2 py-1 bg-stone-100 rounded">BHIM UPI</span>
                      </div>

                      <div className="pt-2">
                        <label className="block text-stone-600 mb-1">Or Enter UPI ID</label>
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="mobile@upi or username@okaxis"
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gateway C: Apple / Google Pay */}
              {paymentGateway === 'apple_pay' && (
                <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 text-center space-y-3">
                  <Smartphone className="w-10 h-10 mx-auto text-stone-900" />
                  <h4 className="font-bold text-stone-900 text-sm">Express 1-Click Biometric Checkout</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Use Touch ID, Face ID, or your Google Wallet account on this device to authorize immediately.
                  </p>
                </div>
              )}

              {/* Gateway D: COD */}
              {paymentGateway === 'cod' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="font-bold text-stone-900">Cash on Delivery Terms:</div>
                  <p className="text-stone-600 leading-relaxed">
                    Please keep exact cash ({formatPrice(totalINR, currency)}) ready upon delivery. Our logistics associate will provide an automated digital tax receipt via SMS.
                  </p>
                </div>
              )}

              {/* Dual-Database Cloud Architecture Banner */}
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
                <Layers className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  High Availability Cloud: Active sync to <strong className="text-stone-800">Firebase Firestore</strong> (real-time stream) & <strong className="text-stone-800">Supabase PostgreSQL</strong> (financial ledger).
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep('details')}
                  className="px-4 py-3 border border-stone-300 rounded-xl text-stone-700 hover:text-stone-900 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={executeOrder}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {formatPrice(totalINR, currency)}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Processing Animation */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
              <h3 className="text-lg font-bold text-stone-900">Processing Your Payment</h3>
              <p className="text-xs text-stone-600 font-mono max-w-md bg-stone-100 p-3 rounded-xl border border-stone-200">
                {processingStage}
              </p>
            </div>
          )}

          {/* STEP 4: Confirmed Receipt & Tracking */}
          {step === 'confirmed' && completedOrder && (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-stone-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900">
                  Dhanyavaad! Thank you for supporting Indian Artisans.
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Order <span className="font-mono font-bold text-stone-900">#{completedOrder.id}</span> has been confirmed. A receipt and real-time tracking link have been sent to <span className="font-semibold text-stone-800">{completedOrder.customer.email}</span>.
                </p>
              </div>

              {/* Order Status & Tracking Timeline */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500">Air Waybill Tracking:</span>{' '}
                    <span className="font-mono font-bold text-stone-900">{completedOrder.trackingNumber}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    Status: {completedOrder.orderStatus}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative pt-3 pb-1">
                  <div className="flex justify-between text-[11px] font-semibold text-stone-700 mb-1">
                    <span className="text-amber-700">1. Confirmed</span>
                    <span className="text-stone-400">2. Artisan Guild</span>
                    <span className="text-stone-400">3. Dispatched</span>
                    <span className="text-stone-400">4. Delivered</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-1/4" />
                  </div>
                </div>
              </div>

              {/* Itemized Receipt Summary */}
              <div className="space-y-2 text-xs border border-stone-200 rounded-2xl p-4">
                <div className="font-bold text-stone-900 pb-2 border-b border-stone-100">
                  Itemized Summary
                </div>
                {completedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center py-1">
                    <span className="text-stone-700 truncate pr-4">
                      {it.quantity}x {it.product.name} {it.selectedVariant ? `(${it.selectedVariant})` : ''}
                    </span>
                    <span className="font-mono text-stone-900 tabular-nums shrink-0">
                      {formatPrice(it.product.priceInINR * it.quantity, currency)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-sm text-stone-900">
                  <span>Total Paid ({currency})</span>
                  <span className="font-mono tabular-nums">{formatPrice(completedOrder.totalINR, currency)}</span>
                </div>
              </div>

              {/* STOREKEEPER ZOON'S MOVIE PRESCRIPTION */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf4ea] border-2 border-[#1e1b24] shadow-pop-sm relative overflow-hidden">
                <div className="flex items-start sm:items-center justify-between gap-3 pb-3 mb-3 border-b-2 border-[#1e1b24]">
                  <div className="flex items-center gap-3">
                    <img
                      src="/public/assets/aistudio/image_63c6260c.png"
                      alt="Zoon"
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-[#1e1b24] shadow-pop-sm bg-purple-100 shrink-0"
                    />
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-300 border border-[#1e1b24] text-[10px] font-black uppercase text-[#1e1b24] mb-0.5">
                        <Clapperboard className="w-3 h-3" />
                        <span>Curated by Zoon · Storekeeper & Aspiring Filmmaker</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-[#1e1b24] tracking-tight">
                        Zoon's Movie Prescription for Your Order 🎬🍿
                      </h4>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-500 animate-pulse shrink-0 hidden sm:block" />
                </div>

                <p className="text-xs text-stone-600 mb-3">
                  Based on the cinephile treasures in your order, Zoon has handpicked these films for your upcoming movie night:
                </p>

                <div className="space-y-2.5">
                  {getZoonMovieRecommendations(completedOrder.items).map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-[#1e1b24] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-sm text-[#1e1b24]">
                            {rec.title}
                          </span>
                          <span className="text-[11px] font-bold text-stone-500">
                            ({rec.year}) · Dir. {rec.director}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-950 rounded border border-amber-300">
                            {rec.country}
                          </span>
                        </div>
                        <p className="text-xs text-purple-950 font-hand font-bold leading-relaxed">
                          "{rec.zoonNote}"
                        </p>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#1e1b24] bg-stone-100 px-2 py-1 rounded border border-stone-300 shrink-0 self-start">
                        {rec.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#1e1b24]/20 flex items-center justify-between text-[11px] text-stone-600">
                  <span className="font-hand font-bold text-sm text-amber-800">
                    "Enjoy the films and enjoy your crafts!" — Zoon 🐾
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">
                    @ohshewatchedit Review Desk
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 border border-stone-300 rounded-xl text-stone-700 hover:text-stone-900 text-xs font-bold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
