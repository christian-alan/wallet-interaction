import Chip from './Chip';
import { Contactless, HaldenMark, TernMark } from '../icons';

// The strip along the top of every card. It is the part that peeks out of
// the wallet, so it always carries who the card is and its balance.
function Strip({ L, left, amount, className = '' }) {
  return (
    <span className={`flex items-center justify-between ${className}`} style={{ height: L.strip, padding: `0 ${L.pad}px` }}>
      {left}
      <span className="font-mono font-medium tracking-[0.04em]" style={{ fontSize: L.amtSize }}>
        {amount}
      </span>
    </span>
  );
}

function Name({ L, children }) {
  return (
    <span className="font-semibold tracking-[-0.01em]" style={{ fontSize: L.nameSize }}>
      {children}
    </span>
  );
}

// Meridian: plain colour, masked number and expiry on the front.
function ClassicFront({ card, L, amount }) {
  return (
    <span className="absolute inset-0 block">
      <Strip L={L} amount={amount} left={<Name L={L}>{card.name}</Name>} />
      <span className="flex items-center justify-between" style={{ padding: `${L.chipTop}px ${L.pad}px 0` }}>
        <Chip tone="gold" />
        <Contactless size={28} className="opacity-75" />
      </span>
      <span className="block font-mono tracking-[0.08em]" style={{ padding: `${L.numTop}px ${L.pad}px 0`, fontSize: L.numSize }}>
        {L.fullNumber ? '•••• •••• •••• ' : '•••• '}
        {card.last4}
      </span>
      <span
        className="absolute bottom-5 flex justify-between gap-1 text-xs font-medium uppercase tracking-[0.08em]"
        style={{ left: L.pad, right: L.pad, flexDirection: L.footDir }}
      >
        <span>{card.kind}</span>
        <span>Valid thru 09/29</span>
      </span>
    </span>
  );
}

// Halden: glossy blue, nearly empty, large wordmark in the corner.
function GlossFront({ card, L, amount }) {
  return (
    <span className="absolute inset-0 block">
      <Strip L={L} amount={amount} left={<HaldenMark size={22} />} />
      <span className="block" style={{ padding: `${L.chipTop}px ${L.pad}px 0` }}>
        <Chip tone="silver" />
      </span>
      <span
        className="absolute font-extrabold leading-[0.85] tracking-[-0.045em]"
        style={{ left: L.pad, bottom: L.wordBottom, fontSize: L.wordSize }}
      >
        {card.name.toLowerCase()}
      </span>
    </span>
  );
}

// Tern: mint sunburst, emblem, chip on the right, pill for the account type.
function SunFront({ card, L, amount }) {
  return (
    <span className="absolute inset-0 block">
      <Strip L={L} amount={amount} left={<TernMark size={L.sunMark} />} />
      <span className="absolute flex items-center gap-2.5" style={{ right: L.pad, top: L.sunChipTop }}>
        <Contactless size={24} className="-scale-x-100" />
        <Chip tone="silver" />
      </span>
      <span className="absolute bottom-5 flex items-end justify-between" style={{ left: L.pad, right: L.pad }}>
        <span className="font-semibold leading-none tracking-[-0.02em]" style={{ fontSize: L.sunWord }}>
          {card.name}
        </span>
        <span className="rounded-full bg-[rgb(30_58_43/0.09)] px-3.5 py-[7px] text-sm font-medium">{card.kind}</span>
      </span>
    </span>
  );
}

// Koro: geometric shapes on charcoal. Separate artwork for each card shape.
const GEO = { ground: '#1B1C20', ink: '#17141F', coral: '#FF7A52', mustard: '#F2B84B', indigo: '#4650A8', teal: '#3F7D73' };

function GeoArtWide() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 440 276" className="absolute left-0 top-0">
      <path d="M296 148 A84 84 0 0 1 380 64 L380 148 Z" fill={GEO.indigo} />
      <circle cx="214" cy="286" r="96" fill={GEO.mustard} />
      <circle cx="366" cy="258" r="124" fill={GEO.coral} />
      <circle cx="262" cy="150" r="44" fill={GEO.teal} />
      <path d="M262 150 L306 150 A44 44 0 0 0 262 106 Z" fill={GEO.ground} />
      <circle cx="340" cy="200" r="30" fill={GEO.ink} />
      <circle cx="340" cy="200" r="12" fill={GEO.mustard} />
      <circle cx="262" cy="150" r="104" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".85" />
      <circle cx="340" cy="200" r="62" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".85" />
      <path d="M176 108 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="#FFFFFF" />
      <circle cx="338" cy="88" r="6" fill="#FFFFFF" />
      <path d="M118 228 l22 0 -11 -20z" fill={GEO.indigo} />
    </svg>
  );
}

function GeoArtTall() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 232 368" className="absolute left-0 top-0">
      <path d="M148 142 A84 84 0 0 1 232 58 L232 142 Z" fill={GEO.indigo} />
      <circle cx="30" cy="250" r="72" fill={GEO.mustard} />
      <circle cx="116" cy="352" r="150" fill={GEO.coral} />
      <circle cx="112" cy="176" r="40" fill={GEO.teal} />
      <path d="M112 176 L152 176 A40 40 0 0 0 112 136 Z" fill={GEO.ground} />
      <circle cx="168" cy="262" r="28" fill={GEO.ink} />
      <circle cx="168" cy="262" r="11" fill={GEO.mustard} />
      <circle cx="112" cy="176" r="92" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".85" />
      <circle cx="168" cy="262" r="56" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".85" />
      <path d="M56 122 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="#FFFFFF" />
      <circle cx="196" cy="166" r="5" fill="#FFFFFF" />
    </svg>
  );
}

function GeoFront({ card, L, amount }) {
  return (
    <span className="absolute inset-0 block">
      {L.wide ? <GeoArtWide /> : <GeoArtTall />}
      <Strip L={L} amount={amount} className="relative" left={<Name L={L}>{card.name}</Name>} />
      <span className="relative flex items-center gap-2.5" style={{ padding: `${L.chipTop}px ${L.pad}px 0` }}>
        <Contactless size={22} />
        <Chip tone="flat" />
      </span>
      <span
        className="absolute bottom-5 flex items-end justify-between text-[13px] font-semibold tracking-[0.02em]"
        style={{ left: L.pad, right: L.pad }}
      >
        <span style={{ color: L.geoFootL }}>{card.kind}</span>
        <span className="font-mono" style={{ color: GEO.ink }}>
          09/29
        </span>
      </span>
    </span>
  );
}

const FRONTS = { classic: ClassicFront, gloss: GlossFront, sun: SunFront, geo: GeoFront };

export default function CardFront({ card, L, amount }) {
  const Front = FRONTS[card.design];
  return <Front card={card} L={L} amount={amount} />;
}
