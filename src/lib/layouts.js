// Geometry for the two wallets, in pixels on a fixed 960 x 760 stage.
// Vertical positions of cards are measured from the top of the wallet,
// so a negative number means the card sticks out above it.

export const STAGE = { width: 960, height: 760 };

// Extra room above the wallet inside the card clipping box, so cards can
// rise out of the wallet without being cut off.
export const LIFT_ROOM = 540;

// How far the back panel extends beyond the front pocket on every side.
const RIM = 10;

const LAYOUTS = {
  h: {
    // wallet
    W: 520, H: 420, left: 220, top: 240, radius: 50, pocketTop: 160,
    pocketD: 'M0,60 H40 C75,60 80,0 120,0 H400 C440,0 445,60 480,60 H520 V210 A50 50 0 0 1 470 260 H50 A50 50 0 0 1 0 210 Z',
    edgeD: 'M0,60 H40 C75,60 80,0 120,0 H400 C440,0 445,60 480,60 H520',
    stitchD: 'M14,76 V210 A36 36 0 0 0 50 246 H470 A36 36 0 0 0 506 210 V76',

    // card size and where cards sit in each state
    cardW: 440, cardH: 276, cardR: 26, cardInset: 40,
    restFront: 118, restStep: 42,   // resting: top of the front card, gap between cards
    peekFront: 104, peekStep: 54,   // wallet hovered: cards fan up
    lift: 84,                       // extra rise for the hovered card
    hideY: 240,                     // tucked fully behind the pocket (intro, wallet switch)
    openTop: 40, openShift: 60, openRot: -4, // pulled out: stage y, how far the wallet drops, tilt
    tuckFront: 136, tuckStep: 24,   // the other cards while one is pulled out
    goneY: -360,                    // a card that is not in the wallet

    // card faces
    pad: 22, strip: 42, nameSize: 17, amtSize: 14, chipTop: 28,
    numTop: 34, numSize: 21, footDir: 'row', fullNumber: true,
    stripeTop: 26, stripeH: 46, backGap: 18, backNum: 19,
    wordSize: 76, wordBottom: 16,
    gPad: '22px 22px 18px 88px', gStripeX: 24, gStripeW: 44, gNum: 19,
    sunMark: 30, sunChipTop: 96, sunWord: 32, notch: 22,
    geoFootL: '#FFFFFF',

    // pocket content
    inset: 34, rowBottom: 32, mainTop: 28, openHead: 26, confirmHead: 44,
    bigSize: 36, titleSize: 20, labelSize: 14, binFull: false,
  },

  v: {
    W: 292, H: 470, left: 334, top: 190, radius: 44, pocketTop: 150,
    pocketD: 'M0,0 H292 V276 A44 44 0 0 1 248 320 H44 A44 44 0 0 1 0 276 Z',
    edgeD: 'M0,0 H292',
    stitchD: 'M12,14 V276 A32 32 0 0 0 44 308 H248 A32 32 0 0 0 280 276 V14',

    cardW: 232, cardH: 368, cardR: 22, cardInset: 30,
    restFront: 108, restStep: 36,
    peekFront: 96, peekStep: 46,
    lift: 70,
    hideY: 160,
    openTop: 14, openShift: 58, openRot: -3,
    tuckFront: 148, tuckStep: 4,
    goneY: -420,

    pad: 16, strip: 36, nameSize: 15, amtSize: 12, chipTop: 22,
    numTop: 118, numSize: 20, footDir: 'column', fullNumber: false,
    stripeTop: 22, stripeH: 38, backGap: 16, backNum: 15,
    wordSize: 54, wordBottom: 20,
    gPad: '22px 14px 16px 60px', gStripeX: 16, gStripeW: 30, gNum: 16,
    sunMark: 26, sunChipTop: 86, sunWord: 28, notch: 16,
    geoFootL: '#17141F',

    inset: 24, rowBottom: 28, mainTop: 36, openHead: 32, confirmHead: 36,
    bigSize: 28, titleSize: 17, labelSize: 13, binFull: true,
  },
};

export function getLayout(orient) {
  const L = LAYOUTS[orient];
  return {
    ...L,
    orient,
    wide: orient === 'h',
    pocketH: L.H - L.pocketTop,
    cardX: L.left + L.cardInset,
    clipHeight: LIFT_ROOM + L.H - 10,
    back: { offset: -RIM, width: L.W + RIM * 2, height: L.H + RIM * 2, radius: L.radius + RIM },
  };
}
