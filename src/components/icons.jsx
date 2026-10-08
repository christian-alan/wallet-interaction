// Small inline icons. All take a `className` and inherit the text colour.

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export function Contactless({ size = 24, className }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke} strokeWidth="1.8">
      <path d="M7.5 8.5a5 5 0 0 1 0 7M11 6a9 9 0 0 1 0 12M14.5 3.5a13 13 0 0 1 0 17" />
    </svg>
  );
}

export function Eye({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOff({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
      <path d="M3 3l18 18M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function Plus({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 18 18" {...stroke} strokeWidth="1.8">
      <path d="M9 3v12M3 9h12" />
    </svg>
  );
}

export function Trash({ size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}

// Halden's monogram: a lowercase "h"
export function HaldenMark({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" {...stroke} strokeWidth="6.5">
      <path d="M12 6v28M12 23c0-10 16-10 16 0v11" />
    </svg>
  );
}

// Tern's emblem: a seabird in flight
export function TernMark({ size = 30 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40">
      <path d="M3 19c6-9 13-8 17 1 4-9 11-10 17-1" {...stroke} strokeWidth="4.5" />
      <path d="M20 20l-4 9 4-2.5 4 2.5z" fill="currentColor" />
    </svg>
  );
}
