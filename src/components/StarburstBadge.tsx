import React from 'react';

interface StarburstBadgeProps {
  className?: string;
  fillColor?: string;
  children: React.ReactNode;
}

export const StarburstBadge: React.FC<StarburstBadgeProps> = ({
  className = 'w-24 h-24 text-amber-400',
  fillColor,
  children,
}) => {
  const points = Array.from({ length: 28 })
    .map((_, t) => {
      const r = t % 2 === 0 ? 48 : 36;
      const angle = (Math.PI * t) / 14 - Math.PI / 2;
      return `${t === 0 ? 'M' : 'L'}${(50 + r * Math.cos(angle)).toFixed(2)} ${(50 + r * Math.sin(angle)).toFixed(2)}`;
    })
    .join(' ');

  return (
    <span className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-sm" aria-hidden="true">
        <path
          d={`${points} Z`}
          className={fillColor ? fillColor : 'fill-current stroke-[#1e1b24]'}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative z-10 text-center leading-tight font-display text-[#1e1b24]">
        {children}
      </span>
    </span>
  );
};
