// The contact chip on a card.
//   tone="gold" | "silver"  glossy metal with a diagonal highlight
//   tone="flat"             flat white chip used on the geometric card

const METAL = {
  gold: { fill: 'chip-gold', line: '#8A6516' },
  silver: { fill: 'chip-silver', line: '#6F7885' },
};

export default function Chip({ tone = 'silver' }) {
  if (tone === 'flat') {
    return (
      <svg aria-hidden="true" width="44" height="36" viewBox="0 0 44 36" className="flex-none">
        <rect width="44" height="36" rx="7" fill="#F4F1EA" />
        <path
          d="M0 13h13a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H0M44 13H31a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h13M17 17h10M22 0v13M22 21v15"
          fill="none"
          stroke="#17141F"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  const metal = METAL[tone];
  return (
    <span aria-hidden="true" className={`chip-metal ${metal.fill}`}>
      <svg width="46" height="36" viewBox="0 0 46 36" className="absolute left-0 top-0">
        <path
          d="M0 12h15M0 24h15M31 12h15M31 24h15M15 0v36M31 0v36M15 18h16"
          fill="none"
          stroke={metal.line}
          strokeWidth="1.1"
        />
      </svg>
      <span className="chip-sheen absolute inset-0 block" />
    </span>
  );
}
