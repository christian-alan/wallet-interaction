// The four cards. All names, numbers and balances are sample data.
//
// `design` picks the card artwork (see components/cards/):
//   classic  plain colour, details on the front
//   gloss    glossy blue, big wordmark, details on the back
//   sun      mint sunburst with a notch cut out of the edge
//   geo      geometric shapes on charcoal

const GLOSS_FRONT =
  'linear-gradient(118deg, rgba(255,255,255,0) 28%, rgba(255,255,255,.16) 44%, rgba(255,255,255,.03) 56%, rgba(255,255,255,0) 70%), ' +
  'linear-gradient(180deg, #0B1A72 0%, #1838DC 36%, #2D4EF2 54%, #1429B0 80%, #0A155E 100%)';

const GLOSS_BACK =
  'linear-gradient(118deg, rgba(255,255,255,0) 34%, rgba(255,255,255,.1) 50%, rgba(255,255,255,0) 66%), ' +
  'linear-gradient(180deg, #060B3C 0%, #0E1F92 34%, #1E3DE4 62%, #0F209E 100%)';

const SUNBURST =
  'radial-gradient(circle at 52% 58%, rgba(255,255,255,.38) 0%, rgba(255,255,255,0) 55%), ' +
  'repeating-conic-gradient(from 3deg at 52% 58%, rgba(30,58,43,.045) 0deg 3.5deg, rgba(30,58,43,0) 3.5deg 9deg), ' +
  '#C9E8C3';

export const CARDS = [
  {
    id: 'halden',
    name: 'Halden',
    kind: 'Debit',
    last4: '4821',
    lead: '5241 8830 1976',
    cvv: '317',
    balance: 8240.5,
    design: 'gloss',
    fg: '#FFFFFF',
    front: GLOSS_FRONT,
    back: GLOSS_BACK,
  },
  {
    id: 'meridian',
    name: 'Meridian',
    kind: 'Credit',
    last4: '0937',
    lead: '4539 6620 7714',
    cvv: '842',
    balance: 2915,
    design: 'classic',
    fg: '#24123A',
    front: 'linear-gradient(100deg, #C79AF8 0%, #C79AF8 38%, #F4B551 88%)',
    back: 'linear-gradient(100deg, #C79AF8 0%, #C79AF8 38%, #F4B551 88%)',
  },
  {
    id: 'tern',
    name: 'Tern',
    kind: 'Savings',
    last4: '6610',
    lead: '5310 4482 9057',
    cvv: '506',
    balance: 31400,
    design: 'sun',
    fg: '#1E3A2B',
    front: SUNBURST,
    back: SUNBURST,
  },
  {
    id: 'koro',
    name: 'Koro',
    kind: 'Virtual',
    last4: '2254',
    lead: '4716 2093 5548',
    cvv: '129',
    balance: 0,
    design: 'geo',
    fg: '#FFFFFF',
    backFg: '#3A1206',
    front: '#1B1C20',
    back: '#FF7A52',
  },
];

// Which cards start in the wallet. The fourth arrives through "Add card".
export const INITIAL_PRESENT = [true, true, true, false];

export const fullNumber = (card) => `${card.lead} ${card.last4}`;

export const smallPrint = (card) =>
  `Issued by ${card.name}. If found, please return it to any ${card.name} branch.`;
