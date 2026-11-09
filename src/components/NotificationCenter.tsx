import React, { useState } from 'react';
import { Bell, X, Check, Sparkles, Package, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
  onRequestBrowserPush: () => void;
  pushPermissionState: NotificationPermission | 'unsupported';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  onRequestBrowserPush,
  pushPermissionState,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl h-full flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-stone-900 text-base">Alerts & Dispatch Updates</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Web Push Permission Bar */}
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs flex items-center justify-between gap-2">
          <div className="text-amber-900">
            <strong className="block">Browser Push Notifications</strong>
            <span className="text-[11px] text-amber-800">Receive instant parcel arrival updates</span>
          </div>
          <button
            onClick={onRequestBrowserPush}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] transition-colors whitespace-nowrap"
          >
            {pushPermissionState === 'granted' ? 'Enabled ✓' : 'Enable Push'}
          </button>
        </div>

        {/* Actions bar */}
        <div className="px-5 py-2.5 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>{notifications.filter((n) => !n.read).length} unread updates</span>
          <button
            onClick={onMarkAllAsRead}
            className="text-amber-700 hover:text-amber-800 font-semibold underline"
          >
            Mark all read
          </button>
        </div>

        {/* Notification Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              No notifications at this moment.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onNotificationClick(item)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  item.read
                    ? 'bg-white border-stone-200 text-stone-600'
                    : 'bg-amber-50/60 border-amber-300 text-stone-900 font-medium shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    item.type === 'order'
                      ? 'bg-amber-100 text-amber-800'
                      : item.type === 'promo'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.type === 'order' ? (
                      <Package className="w-4 h-4" />
                    ) : item.type === 'promo' ? (
                      <Tag className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-stone-900 truncate">{item.title}</span>
                      <span className="text-[10px] text-stone-400 shrink-0 ml-2">{item.timestamp}</span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">{item.message}</p>
                    {item.orderId && (
                      <span className="text-[10px] text-amber-700 font-mono font-bold mt-1 inline-block">
                        Tap to view Order #{item.orderId} →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
