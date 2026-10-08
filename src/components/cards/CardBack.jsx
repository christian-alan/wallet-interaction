import { fullNumber, smallPrint } from '../../data/cards';
import { Contactless, HaldenMark } from '../icons';

function Label({ children }) {
  return <span className="block text-[10px] font-semibold uppercase tracking-[0.1em]">{children}</span>;
}

// Classic back: stripe across the top, signature panel, CVV, number, expiry.
// Used by Meridian, Tern and Koro, each on its own background.
function ClassicBack({ card, L }) {
  const value = { fontSize: L.backNum };
  return (
    <span className="absolute inset-0 flex flex-col" style={{ color: card.backFg || card.fg }}>
      <span className="mag-stripe block flex-none" style={{ height: L.stripeH, marginTop: L.stripeTop }} />

      <span className="flex flex-wrap gap-2.5" style={{ padding: `${L.backGap}px ${L.pad}px 0` }}>
        <span className="signature-panel flex h-[38px] flex-[1_1_180px] items-center rounded-md px-3 text-xs italic text-[#55524A]">
          Authorised signature
        </span>
        <span className="flex h-[38px] flex-[0_0_96px] items-center justify-between rounded-md bg-white px-3 text-[#17171A]">
          <span className="text-[10px] font-semibold tracking-[0.1em] text-[#5B5B60]">CVV</span>
          <span className="font-mono text-base tracking-[0.08em]">{card.cvv}</span>
        </span>
      </span>

      <span className="flex flex-wrap gap-x-7 gap-y-3" style={{ padding: `${L.backGap}px ${L.pad}px 0` }}>
        <span className="block">
          <Label>Card number</Label>
          <span className="mt-[3px] block font-mono tracking-[0.04em]" style={value}>
            {fullNumber(card)}
          </span>
        </span>
        <span className="block">
          <Label>Expires</Label>
          <span className="mt-[3px] block font-mono tracking-[0.04em]" style={value}>
            09/29
          </span>
        </span>
      </span>

      <span className="mt-auto flex items-end justify-between gap-3.5" style={{ padding: `0 ${L.pad}px 16px` }}>
        <span className="text-[11px] leading-[1.4] opacity-90">{smallPrint(card)}</span>
        <span className="hologram h-8 w-[46px] flex-none rounded-md" />
      </span>
    </span>
  );
}

// Halden's back: stripe down the left edge, details beside it.
function GlossBack({ card, L }) {
  return (
    <span className="absolute inset-0 flex flex-col" style={{ padding: L.gPad }}>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 bg-[#04050D] shadow-[inset_1px_0_0_rgb(255_255_255/0.1),inset_-1px_0_0_rgb(255_255_255/0.06)]"
        style={{ left: L.gStripeX, width: L.gStripeW }}
      />
      <span className="flex items-center justify-between text-[#DCE1EA]">
        <HaldenMark size={38} />
        <Contactless size={26} />
      </span>
      <span className="mt-5 flex flex-wrap gap-x-[0.6em] font-mono tracking-[0.02em]" style={{ fontSize: L.gNum }}>
        <span>{card.lead.slice(0, 9)}</span>
        <span>
          {card.lead.slice(10)} {card.last4}
        </span>
      </span>
      <span className="mt-2.5 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-[13px] tracking-[0.04em]">
        <span>EXP 09/29</span>
        <span>CVC {card.cvv}</span>
      </span>
      <span className="mt-auto flex flex-wrap-reverse items-end gap-3">
        <span className="flex-[1_1_130px] text-[11px] leading-[1.4] opacity-90">{smallPrint(card)}</span>
        <span aria-hidden="true" className="hologram-silver h-9 w-[58px] flex-none rounded-full" />
      </span>
    </span>
  );
}

export default function CardBack({ card, L }) {
  return card.design === 'gloss' ? <GlossBack card={card} L={L} /> : <ClassicBack card={card} L={L} />;
}
