import { CARDS } from '../data/cards';
import { LIFT_ROOM, STAGE } from '../lib/layouts';
import { useWallet } from '../hooks/useWallet';
import Card from './Card';
import OrientationSwitch from './OrientationSwitch';
import Pocket from './Pocket';

const LEATHER = '/textures/leather-smooth.jpg';
const GRAIN = 'pointer-events-none absolute object-cover opacity-60 mix-blend-hard-light';

export default function Wallet() {
  const wallet = useWallet();
  const { L, actions, phase, isOpen } = wallet;

  // While switching wallets the group leaves quickly; otherwise it eases in.
  const groupTransition = wallet.swapping
    ? 'transform 300ms cubic-bezier(.5,0,.8,.4), opacity 260ms ease-in'
    : 'transform 700ms cubic-bezier(.2,.8,.2,1), opacity 400ms ease';

  return (
    <div className="relative overflow-hidden bg-ground font-sans" style={{ width: STAGE.width, height: STAGE.height }}>
      <OrientationSwitch
        value={wallet.shownOrient}
        visible={wallet.booted && !isOpen}
        enabled={wallet.ready && !isOpen}
        stretching={wallet.swapping}
        onChange={actions.switchTo}
      />

      {/* The wallet. Everything inside is positioned from its top-left corner. */}
      <div
        onMouseEnter={actions.enterWallet}
        onMouseLeave={actions.leaveWallet}
        className="absolute"
        style={{
          left: L.left,
          top: L.top,
          width: L.W,
          height: L.H,
          opacity: phase === 0 ? 0 : 1,
          transform: phase === 0 ? 'translateY(120px) scale(.9)' : `translateY(${wallet.walletDrop}px) scale(1)`,
          transition: groupTransition,
        }}
      >
        {/* Back panel, slightly larger than the pocket so it shows as a rim */}
        <div
          className="leather-back absolute z-0 overflow-hidden bg-leather-back"
          style={{ left: L.back.offset, top: L.back.offset, width: L.back.width, height: L.back.height, borderRadius: L.back.radius }}
        >
          <img src={LEATHER} alt="" className={`${GRAIN} inset-0 size-full`} />
        </div>

        {/* Cards. The box clips them at the bottom of the wallet and leaves room above to rise. */}
        <div
          className="pointer-events-none absolute z-[1] overflow-hidden"
          style={{ left: -L.left, top: -LIFT_ROOM, width: STAGE.width, height: L.clipHeight }}
        >
          {CARDS.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              index={i}
              L={L}
              pose={wallet.poses[i]}
              ready={wallet.ready}
              hidden={wallet.hidden}
              onPick={actions.pickCard}
              onHover={actions.hoverCardAt}
            />
          ))}
        </div>

        {/* Front pocket: leather shape, top edge light, stitching */}
        <svg
          aria-hidden="true"
          width={L.W}
          height={L.pocketH}
          viewBox={`0 0 ${L.W} ${L.pocketH}`}
          className="pocket-shadow pointer-events-none absolute left-0 z-[2] overflow-visible"
          style={{ top: L.pocketTop }}
        >
          <path d={L.pocketD} onMouseEnter={actions.enterPocket} className="pointer-events-auto fill-leather-front" />
          <path d={L.edgeD} className="fill-none stroke-leather-edge" strokeWidth="1.5" />
          <path d={L.stitchD} className="fill-none stroke-leather-stitch" strokeWidth="1.5" strokeDasharray="9 7" strokeLinecap="round" />
        </svg>
        <img
          src={LEATHER}
          alt=""
          className={`${GRAIN} left-0 z-[2] object-[80%_70%]`}
          style={{ top: L.pocketTop, width: L.W, height: L.pocketH, clipPath: `path("${L.pocketD}")` }}
        />

        <Pocket wallet={wallet} />
      </div>
    </div>
  );
}
