import { useCallback, useEffect, useReducer, useRef } from 'react';
import { CARDS, INITIAL_PRESENT } from '../data/cards';
import { getLayout, LIFT_ROOM } from '../lib/layouts';
import { prefersReducedMotion } from '../lib/format';

// The intro and the wallet switch move through four phases:
//   0  wallet off stage (dropped, scaled down, transparent)
//   1  wallet landed, cards tucked behind the pocket
//   2  cards popping out one after another
//   3  ready: hover, click and buttons are live
const READY = 3;

const INITIAL = {
  phase: 0,
  booted: false,      // true once the wallet has appeared for the first time
  counting: false,    // total balance is counting up
  swapping: false,    // leaving the stage to switch wallets
  orient: 'h',        // 'h' horizontal wallet, 'v' vertical wallet
  target: null,       // the wallet being switched to (drives the switch thumb)
  hoverWallet: false,
  hoverCard: -1,
  open: -1,           // index of the pulled-out card, -1 for none
  lastOpen: 0,        // kept so the pocket text does not jump while fading out
  present: INITIAL_PRESENT,
  confirm: false,     // delete confirmation is showing
  flipped: false,
  hidden: false,      // balances masked
  copied: false,
  shown: 0,           // total balance during the count-up
};

const merge = (state, patch) => ({ ...state, ...(typeof patch === 'function' ? patch(state) : patch) });

export const totalOf = (present) => CARDS.reduce((sum, card, i) => sum + (present[i] ? card.balance : 0), 0);

export function useWallet() {
  const [s, set] = useReducer(merge, INITIAL);
  const timers = useRef([]);
  const frame = useRef(0);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  const later = useCallback((ms, fn) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // ---- Intro: wallet rises in, cards pop out, total counts up ----
  const runIntro = useCallback(() => {
    clear();
    const target = totalOf(INITIAL_PRESENT);
    if (prefersReducedMotion()) {
      set({ phase: READY, shown: target, booted: true, counting: false, swapping: false });
      return;
    }
    set({ phase: 0, open: -1, confirm: false, flipped: false, hoverCard: -1, hoverWallet: false, shown: 0, counting: true, swapping: false });
    later(60, () => set({ phase: 1, booted: true }));
    later(720, () => {
      set({ phase: 2 });
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / 850);
        set({ shown: target * (1 - Math.pow(1 - p, 3)) });
        if (p < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    });
    later(1700, () => set({ phase: READY, counting: false }));
  }, [clear, later]);

  useEffect(() => {
    runIntro();
    return clear;
  }, [runIntro, clear]);

  // ---- Derived values ----
  const L = getLayout(s.orient);
  const ready = s.phase === READY;
  const isOpen = s.open >= 0;
  const hoverWallet = isOpen ? false : s.hoverWallet;
  const hoverCard = isOpen ? -1 : s.hoverCard;
  const walletDrop = isOpen ? L.openShift : 0;
  const count = s.present.filter(Boolean).length;
  const total = totalOf(s.present);
  const selectedIndex = isOpen ? s.open : s.lastOpen;

  // Where each card sits right now, and how it should move there.
  const poses = CARDS.map((_, i) => {
    const present = !!s.present[i];
    const pulled = present && isOpen && i === s.open;
    const lifted = hoverCard === i;

    let y;
    if (!present) y = L.goneY;
    else if (s.phase < 2) y = L.hideY;
    else if (isOpen) {
      if (pulled) y = L.openTop - L.top - walletDrop;
      else {
        let rank = 0; // cards in front of this one, not counting the pulled-out card
        for (let j = i + 1; j < CARDS.length; j++) if (s.present[j] && j !== s.open) rank++;
        y = L.tuckFront - L.tuckStep * rank;
      }
    } else {
      let fromFront = 0;
      for (let j = i + 1; j < CARDS.length; j++) if (s.present[j]) fromFront++;
      y = (hoverWallet ? L.peekFront : L.restFront) - (hoverWallet ? L.peekStep : L.restStep) * fromFront;
      if (lifted) y -= L.lift;
    }

    const rotate = !present ? -8 : pulled ? L.openRot : lifted ? -1 : 0;
    const scale = !present ? 0.92 : pulled ? 1.04 : 1;

    let transition = 'none';
    if (s.phase === 1 && s.swapping) transition = 'transform 240ms cubic-bezier(.5,0,.8,.4)';
    if (s.phase === 2) transition = `transform 640ms cubic-bezier(.3,1.35,.45,1) ${i * 90}ms`;
    if (ready) transition = `transform ${isOpen ? 560 : 460}ms cubic-bezier(.3,1.3,.4,1), opacity 300ms ease`;

    return {
      present,
      pulled,
      lifted,
      flipped: pulled && s.flipped,
      transform: `translate3d(0,${y + LIFT_ROOM}px,0) rotate(${rotate}deg) scale(${scale})`,
      transition,
    };
  });

  // ---- Actions ----
  const switchTo = (next) => {
    if (!ready || isOpen || s.orient === next) return;
    clear();
    if (prefersReducedMotion()) {
      set({ orient: next, target: next });
      return;
    }
    set({ target: next, swapping: true, phase: 1, hoverWallet: false, hoverCard: -1 });
    later(240, () => set({ phase: 0 }));
    later(540, () => set({ orient: next, swapping: false }));
    later(600, () => set({ phase: 1 }));
    later(920, () => set({ phase: 2 }));
    later(1840, () => set({ phase: READY }));
  };

  const actions = {
    switchTo,
    enterWallet: () => ready && !isOpen && set({ hoverWallet: true }),
    leaveWallet: () => ready && set({ hoverWallet: false, hoverCard: -1 }),
    enterPocket: () => ready && s.hoverCard !== -1 && set({ hoverCard: -1 }),
    hoverCardAt: (i) => ready && !isOpen && set({ hoverWallet: true, hoverCard: i }),
    // Clicking a card pulls it out; clicking the pulled-out card puts it back.
    pickCard: (i) => {
      if (!ready) return;
      if (s.open === i) set({ open: -1, confirm: false, flipped: false, hoverCard: -1 });
      else set({ open: i, lastOpen: i, confirm: false, flipped: false, hoverCard: -1, copied: false });
    },
    toggleFlip: () => set({ flipped: !s.flipped }),
    toggleHidden: () => set({ hidden: !s.hidden }),
    copyNumber: (text) => {
      try {
        navigator.clipboard?.writeText(text)?.catch(() => {});
      } catch {
        /* clipboard not available: the label still confirms the action */
      }
      set({ copied: true });
      later(1400, () => set({ copied: false }));
    },
    addCard: () => {
      if (!ready) return;
      const slot = s.present.indexOf(false);
      if (slot < 0) return;
      set({ present: s.present.map((here, i) => (i === slot ? true : here)) });
    },
    askDelete: () => set({ confirm: true }),
    cancelDelete: () => set({ confirm: false }),
    confirmDelete: () =>
      set({
        present: s.present.map((here, i) => (i === selectedIndex ? false : here)),
        flipped: false,
        open: -1,
        confirm: false,
        hoverCard: -1,
        hoverWallet: false,
      }),
  };

  return {
    L,
    poses,
    ready,
    isOpen,
    count,
    selectedIndex,
    phase: s.phase,
    booted: s.booted,
    swapping: s.swapping,
    shownOrient: s.target || s.orient,
    confirm: s.confirm,
    flipped: s.flipped,
    hidden: s.hidden,
    copied: s.copied,
    total: s.phase === 2 && s.counting ? s.shown : total,
    walletDrop,
    actions,
  };
}
