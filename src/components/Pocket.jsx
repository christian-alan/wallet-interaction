import { CARDS, fullNumber } from '../data/cards';
import { money } from '../lib/format';
import { Eye, EyeOff, Plus, Trash } from './icons';

// Everything written on the front pocket. Three views share the same space
// and cross-fade: the total, the pulled-out card's actions, and the delete
// confirmation.

const HOVER = 'cursor-pointer transition-[background-color,transform] duration-[160ms] ease-out hover:-translate-y-px';
const PILL = `h-[52px] rounded-[26px] text-[15px] font-medium ${HOVER}`;
const QUIET = 'bg-chip text-pocket hover:bg-chip-hover';

// The view itself never catches the pointer (the pocket underneath needs
// hover events); only its buttons do, and only once the wallet is ready.
function View({ L, active, ready, children }) {
  return (
    <div
      inert={!active}
      className={`pointer-events-none absolute left-0 z-[3] transition-opacity duration-[260ms] ${active ? 'opacity-100' : 'opacity-0'} ${
        active && ready ? '[&_button]:pointer-events-auto' : ''
      }`}
      style={{ top: L.pocketTop, width: L.W, height: L.pocketH }}
    >
      {children}
    </div>
  );
}

function Heading({ top, children }) {
  return (
    <div className="absolute inset-x-0 text-center" style={{ top }}>
      {children}
    </div>
  );
}

function Actions({ L, className = '', children }) {
  return (
    <div className={`absolute flex ${className}`} style={{ left: L.inset, right: L.inset, bottom: L.rowBottom }}>
      {children}
    </div>
  );
}

function Amount({ L, children }) {
  return (
    <div className="font-mono font-medium tracking-[0.02em]" style={{ fontSize: L.bigSize }}>
      {children}
    </div>
  );
}

function MainView({ wallet }) {
  const { L, actions } = wallet;
  const canAdd = wallet.count < CARDS.length;
  return (
    <View L={L} ready={wallet.ready} active={wallet.phase >= 2 && !wallet.isOpen}>
      <Heading top={L.mainTop}>
        <Amount L={L}>{wallet.hidden ? '••••••' : money(wallet.total)}</Amount>
        <div className="mt-1 text-pocket-muted" style={{ fontSize: L.labelSize }}>
          Total balance
        </div>
      </Heading>
      <Actions L={L} className="items-center justify-between">
        <button
          type="button"
          aria-label={wallet.hidden ? 'Show balances' : 'Hide balances'}
          onClick={actions.toggleHidden}
          className={`grid size-12 place-items-center rounded-full ${QUIET} ${HOVER}`}
        >
          {wallet.hidden ? <EyeOff /> : <Eye />}
        </button>
        <button
          type="button"
          onClick={actions.addCard}
          disabled={!canAdd}
          className={`add-pill flex h-14 items-center gap-3 rounded-[28px] bg-primary pl-2 pr-6 text-[17px] font-medium text-on-primary transition-[background-color,transform,opacity] duration-[160ms] ease-out hover:-translate-y-px hover:bg-primary-hover ${
            canAdd ? 'cursor-pointer opacity-100' : '!pointer-events-none opacity-0'
          }`}
        >
          <span className="add-knob grid size-10 place-items-center rounded-full bg-knob">
            <Plus />
          </span>
          Add card
        </button>
      </Actions>
    </View>
  );
}

function OpenView({ wallet, card }) {
  const { L, actions } = wallet;
  return (
    <View L={L} ready={wallet.ready} active={wallet.isOpen && !wallet.confirm}>
      <Heading top={L.openHead}>
        <div className="text-pocket-muted" style={{ fontSize: L.labelSize }}>
          {card.name} · {card.kind} · •••• {card.last4}
        </div>
        <div className="mt-1">
          <Amount L={L}>{wallet.hidden ? '••••' : money(card.balance)}</Amount>
        </div>
      </Heading>
      <Actions L={L} className="flex-wrap gap-2.5">
        <button type="button" onClick={actions.toggleFlip} className={`flex-[1_1_100px] ${PILL} ${QUIET}`}>
          {wallet.flipped ? 'Show front' : 'Flip card'}
        </button>
        <button type="button" onClick={() => actions.copyNumber(fullNumber(card))} className={`flex-[1.25_1_120px] ${PILL} ${QUIET}`}>
          {wallet.copied ? 'Copied' : 'Copy number'}
        </button>
        <button
          type="button"
          aria-label="Delete card"
          onClick={actions.askDelete}
          className={`flex min-w-[52px] items-center justify-center gap-2 bg-chip text-danger hover:bg-danger-wash ${PILL} ${
            L.binFull ? 'flex-[1_1_100%]' : 'flex-none'
          }`}
        >
          <Trash />
          {L.binFull && <span>Delete card</span>}
        </button>
      </Actions>
    </View>
  );
}

function ConfirmView({ wallet, card }) {
  const { L, actions } = wallet;
  return (
    <View L={L} ready={wallet.ready} active={wallet.isOpen && wallet.confirm}>
      <Heading top={L.confirmHead}>
        <div className="font-semibold tracking-[-0.01em]" style={{ fontSize: L.titleSize }}>
          Remove {card.name} •••• {card.last4}?
        </div>
        <div className="mt-2 text-sm text-pocket-muted">You can add it again later.</div>
      </Heading>
      <Actions L={L} className="gap-2.5">
        <button type="button" onClick={actions.cancelDelete} className={`flex-1 ${PILL} ${QUIET}`}>
          Keep card
        </button>
        <button
          type="button"
          onClick={actions.confirmDelete}
          className={`flex-1 bg-destructive text-white hover:bg-destructive-hover ${PILL}`}
        >
          Delete card
        </button>
      </Actions>
    </View>
  );
}

export default function Pocket({ wallet }) {
  const card = CARDS[wallet.selectedIndex] || CARDS[0];
  return (
    <div className="text-pocket">
      <MainView wallet={wallet} />
      <OpenView wallet={wallet} card={card} />
      <ConfirmView wallet={wallet} card={card} />
    </div>
  );
}
