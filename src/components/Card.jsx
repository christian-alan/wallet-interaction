import { useRef, useState } from 'react';
import CardFront from './cards/CardFront';
import CardBack from './cards/CardBack';
import { money } from '../lib/format';

const FILL = 'absolute inset-0 block';

// The notch cut out of the Tern card's edge. `x` is 100 for the front
// (right edge) and 0 for the back, where the same edge is on the left.
const notchMask = (x, radius) =>
  `radial-gradient(circle at ${x}% 66%, rgba(0,0,0,0) ${radius - 1}px, #000 ${radius}px)`;

export default function Card({ card, index, L, pose, ready, hidden, onPick, onHover }) {
  const ref = useRef(null);
  const [pointerOver, setPointerOver] = useState(false);

  const { present, pulled, lifted, flipped } = pose;
  const active = lifted || pulled;
  const amount = hidden ? '••••' : money(card.balance);
  const mask = (x) => (card.design === 'sun' ? notchMask(x, L.notch) : undefined);

  // Glare follows the pointer. The position is written straight to CSS
  // variables so the card does not re-render on every mouse move.
  const trackPointer = (event) => {
    const el = ref.current;
    if (!ready || !el) return;
    const box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;
    el.style.setProperty('--gx', `${Math.round(((event.clientX - box.left) / box.width) * 100)}%`);
    el.style.setProperty('--gy', `${Math.round(((event.clientY - box.top) / box.height) * 100)}%`);
    if (!pointerOver) setPointerOver(true);
  };

  // The sweep of light sits off one side of the card and crosses to the
  // other each time the card is lifted, pulled out or flipped.
  const sweepOut = lifted || flipped;
  const sweep = {
    transform: `translateX(${sweepOut ? 240 : -140}%) skewX(-20deg)`,
    transition: ready && active ? 'transform 1100ms cubic-bezier(.3,.1,.3,1) 140ms' : 'none',
  };
  const glareOpacity = pointerOver && active && ready ? 1 : 0;

  const face = (background, maskImage) => ({
    borderRadius: L.cardR,
    background,
    maskImage,
    WebkitMaskImage: maskImage,
  });

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${card.name} ${card.kind} card ending ${card.last4}`}
      disabled={!present}
      onClick={() => onPick(index)}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onMouseMove={trackPointer}
      onMouseLeave={() => setPointerOver(false)}
      className={`absolute top-0 cursor-pointer text-left ${present ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      style={{
        left: L.cardX,
        width: L.cardW,
        height: L.cardH,
        borderRadius: L.cardR,
        color: card.fg,
        zIndex: index + 1,
        transform: pose.transform,
        transition: pose.transition,
      }}
    >
      {/* Turns the whole card over in 3D */}
      <span
        className={`${FILL} transition-transform duration-[720ms] ease-[cubic-bezier(.3,1.25,.4,1)] transform-3d`}
        style={{ transform: `perspective(1400px) rotateY(${flipped ? 180 : 0}deg)` }}
      >
        {/* The drop shadow lives on its own layer so the notch mask does not cut it off */}
        <span
          aria-hidden="true"
          className={`${FILL} transition-shadow duration-300`}
          style={{
            borderRadius: L.cardR,
            boxShadow: pulled ? '0 44px 60px -24px rgba(0,0,0,.5)' : '0 -3px 10px rgba(0,0,0,.14)',
          }}
        />

        <span className="card-face" style={face(card.front, mask(100))}>
          <CardFront card={card} L={L} amount={amount} />
          <span aria-hidden="true" className="card-sweep pointer-events-none absolute -inset-y-[30%] left-0 w-[55%]" style={sweep} />
          <span
            aria-hidden="true"
            className="card-glare pointer-events-none absolute inset-0 transition-opacity duration-[280ms]"
            style={{ opacity: glareOpacity }}
          />
        </span>

        <span className="card-face [transform:rotateY(180deg)]" style={face(card.back, mask(0))}>
          <CardBack card={card} L={L} />
          <span aria-hidden="true" className="card-sweep pointer-events-none absolute -inset-y-[30%] left-0 w-[55%]" style={sweep} />
          <span
            aria-hidden="true"
            className="card-glare-back pointer-events-none absolute inset-0 transition-opacity duration-[280ms]"
            style={{ opacity: glareOpacity }}
          />
        </span>
      </span>
    </button>
  );
}
