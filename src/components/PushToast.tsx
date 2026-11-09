import React, { useEffect } from 'react';
import { Package, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from '../types';

interface PushToastProps {
  notification: NotificationItem | null;
  onDismiss: () => void;
  onClick: () => void;
}

export const PushToast: React.FC<PushToastProps> = ({
  notification,
  onDismiss,
  onClick,
}) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div 
        onClick={onClick}
        className="bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/40 flex items-start gap-3 cursor-pointer hover:border-amber-400 transition-all backdrop-blur-md"
      >
        <div className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold shrink-0 mt-0.5">
          <Package className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 truncate">{notification.title}</span>
            <span className="text-[10px] text-stone-400 shrink-0 ml-1">Now</span>
          </div>
          <p className="text-stone-300 text-[11px] leading-relaxed mt-0.5 line-clamp-2">
            {notification.message}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-stone-400 hover:text-white p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
