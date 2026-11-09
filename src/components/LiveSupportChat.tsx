import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, HelpCircle } from 'lucide-react';
import { SupportMessage, Order } from '../types';

interface LiveSupportChatProps {
  orders: Order[];
  onOpenOrder: (orderId: string) => void;
}

export const LiveSupportChat: React.FC<LiveSupportChatProps> = ({ orders, onOpenOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      senderName: 'Zoon',
      text: "Meow! 🐱 I'm Zoon! I wander down the alleys of world cinema from Japen to France, Iran to Korea, and Kolkata. As storekeeper and aspiring filmmaker, ask me anything—from craft goodies and tracking to personal movie recommendations for tonight!",
      timestamp: 'Just now',
      options: [
        "🍿 Recommend a movie for tonight!",
        "Where has Zoon travelled recently?",
        "Tell me about the World Cinema Passport",
        "What's Zoon's secret promo code?",
        "Track my cinema order",
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: SupportMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic smart response engine from Zoon
    setTimeout(() => {
      let reply = "Purr! I'm delighted to help! Whether you need custom craft sizes, gift wrapping, or a 35mm film recommendation, Zoon is right here.";
      const lower = text.toLowerCase();

      if (lower.includes('recommend') || lower.includes('movie') || lower.includes('film') || lower.includes('watch') || lower.includes('tonight')) {
        reply = "🍿 Zoon's Cinephile Recommendation: Watch Abbas Kiarostami's 'Close-Up' (Iran, 1990), Bong Joon-ho's 'Memories of Murder' (Korea, 2003), or Agnès Varda's 'Cléo from 5 to 7' (France, 1962)! For pure samurai kinetic brilliance, Kurosawa's 'Yojimbo' (Japen, 1961) is cinema at its peak!";
      } else if (lower.includes('travel') || lower.includes('where') || lower.includes('zoon')) {
        reply = "Purr! 🐾 Recently I collected cinema tickets and stamps across Japen (watching Kurosawa & Miyazaki), France (Varda & Godard), Iran (Kiarostami & Farhadi), Korea (Bong Joon-ho & Park Chan-wook), and Kolkata (Satyajit Ray)! You can filter all goodies by country using the yellow tickets above.";
      } else if (lower.includes('passport') || lower.includes('stamp')) {
        reply = "My World Cinema Passport Kit has 64 pages and 48 collectible country visa stamps! Every time you watch a film from France, Japen, Iran, Korea, India, or Italy, you stamp your passport. It's the ultimate cinephile ritual!";
      } else if (lower.includes('trump') || lower.includes('game') || lower.includes('cards')) {
        reply = "Our World Cinema & Korean Golden Wave Trump decks have 54 premium casino linen cards! You battle across Cinematography, Emotional Resonance, Cult Factor, and Plot Twist scores. Kurosawa, Bong Joon-ho, and Nolan have maximum director power!";
      } else if (lower.includes('promo') || lower.includes('code') || lower.includes('discount')) {
        reply = "Zoon's secret Instagram perk code is OSWI15! Apply it in your bag for a flat 15% off all movie crafts. 🍿";
      } else if (lower.includes('track') || lower.includes('order') || lower.includes('shipment')) {
        const latest = orders[0];
        if (latest) {
          reply = `Your latest order #${latest.id} is currently [${latest.orderStatus}]. Waybill: ${latest.trackingNumber}. You can view the live GPS timeline in your Profile tab!`;
        } else {
          reply = 'No active orders on this profile yet. Once placed, Zoon will track your package all the way to your door!';
        }
      } else if (lower.includes('international') || lower.includes('ship')) {
        reply = 'We ship worldwide with DHL Air Express! Multi-currency checkout in USD, EUR, GBP, INR, AED, and SGD is fully supported with Stripe and UPI.';
      }

      const agentMsg: SupportMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        senderName: 'Zoon (Storekeeper)',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, agentMsg]);
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Chat Trigger Button with Mascot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 sm:px-4 sm:py-2.5 bg-[#251b2e] hover:bg-[#342442] text-white rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-200 hover:scale-105 group border-2 border-amber-400"
          title="Ask Zoon · Storekeeper & Film Curator"
        >
          <div className="relative">
            <img
              src="/public/assets/aistudio/image_63c6260c.png"
              alt="Zoon"
              className="w-8 h-8 rounded-full object-cover border border-amber-400"
            />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide text-amber-200">
            Ask Zoon 🐾
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#231a2b] text-white flex items-center justify-between border-b border-purple-900/50">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/public/assets/aistudio/image_63c6260c.png"
                  alt="Zoon"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 bg-purple-950"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Zoon · Storekeeper & Film Curator</span>
                  <span className="text-amber-400 text-[10px]">🐾</span>
                </h4>
                <div className="text-[10px] text-amber-300 font-semibold">
                  Wearing her "Z" Medallion · Wandering World Film Alleys
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="text-[10px] text-stone-400 mb-0.5 px-1">
                  {msg.senderName} · {msg.timestamp}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-xs rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Preset Options if any */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSendMessage(opt)}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-semibold text-left transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-stone-400 text-xs p-2 bg-white rounded-xl w-24 border border-stone-200">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about shipment, craft, sizes..."
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-stone-900 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-sm"
              title="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
