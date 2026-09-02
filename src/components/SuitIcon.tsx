import React from 'react';
import { Suit } from '../types';

interface SuitIconProps {
  suit: Suit;
  className?: string;
  size?: number;
  filled?: boolean;
}

export const SuitIcon: React.FC<SuitIconProps> = ({
  suit,
  className = '',
  size = 20,
  filled = true,
}) => {
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const defaultColor = isRed ? 'text-rose-500' : 'text-slate-300';

  switch (suit) {
    case 'spades':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={filled ? '0' : '2'}
          className={`inline-block ${defaultColor} ${className}`}
        >
          <path d="M12 2C9.5 6 4 10.5 4 15a5 5 0 0 0 7 4.58V22h2v-2.42A5 5 0 0 0 20 15c0-4.5-5.5-9-8-13z" />
        </svg>
      );
    case 'hearts':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={filled ? '0' : '2'}
          className={`inline-block ${defaultColor} ${className}`}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'diamonds':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={filled ? '0' : '2'}
          className={`inline-block ${defaultColor} ${className}`}
        >
          <path d="M12 2L3 12l9 10 9-10L12 2z" />
        </svg>
      );
    case 'clubs':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={filled ? '0' : '2'}
          className={`inline-block ${defaultColor} ${className}`}
        >
          <path d="M12 2a4 4 0 0 0-4 4c0 1.25.57 2.37 1.47 3.09A4.5 4.5 0 0 0 6 13.5 4.5 4.5 0 0 0 10.5 18H11v4h2v-4h.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-3.47-4.41A4 4 0 0 0 16 6a4 4 0 0 0-4-4z" />
        </svg>
      );
  }
};
