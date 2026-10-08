# Wallet

A leather wallet holding four payment cards, built with React, Vite and Tailwind CSS.

- Hover the wallet and the cards fan up; hover a card and it lifts.
- Click a card to pull it out; click it again to put it back.
- With a card out: flip it over, copy its number, or delete it (with a confirm step).
- Add card brings a removed card back. The eye hides all balances.
- The switch at the top swaps between a horizontal and a vertical wallet.

All names, card numbers and balances are sample data.

## Run it

Needs Node.js 20.19 or newer (or 22.12 or newer).

```bash
npm install
npm run dev      # start the dev server, then open the URL it prints
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Where things live

```
src/
  main.jsx                 entry point
  App.jsx                  centres the stage and scales it down on small windows
  index.css                Tailwind import, design tokens, surface recipes
  data/cards.js            the four cards: names, numbers, colours, which design
  lib/layouts.js           geometry of both wallets and where cards sit in each state
  lib/format.js            money formatting, reduced-motion check
  hooks/useWallet.js       all state and timing: intro, hover, pull out, flip, delete, switch
  components/
    Wallet.jsx             the stage: back panel, cards, front pocket, leather texture
    Card.jsx               one card: position, 3D flip, light sweep, pointer glare
    Pocket.jsx             what is written on the pocket (total, card actions, delete confirm)
    OrientationSwitch.jsx  the glass Horizontal / Vertical switch
    icons.jsx              inline SVG icons and the two card emblems
    cards/
      CardFront.jsx        the four front designs (classic, gloss, sun, geo)
      CardBack.jsx         the two back designs
      Chip.jsx             gold, silver and flat chips
public/textures/           leather grain image
```

## Changing things

| To change | Edit |
| --- | --- |
| Colours, fonts, easing | the `@theme` block in `src/index.css` |
| Card names, numbers, balances, colours | `src/data/cards.js` |
| Which cards start in the wallet | `INITIAL_PRESENT` in `src/data/cards.js` |
| Sizes and positions (wallet, cards, how far cards rise) | `src/lib/layouts.js` |
| Animation timing and order | `src/hooks/useWallet.js`, and the `transition` strings in `Card.jsx` and `Wallet.jsx` |
| Leather strength | `opacity-60` on `GRAIN` in `src/components/Wallet.jsx` |

## How it is put together

- **Fixed stage.** Everything is positioned in pixels on a 960 x 760 stage, the same
  coordinates as the design prototype. `App.jsx` scales the stage down to fit smaller
  windows.
- **Tailwind for what is static, inline `style` for what moves.** Layout, type and
  colour are Tailwind classes. Values that come from the layout tables or change with
  state (card positions, sizes, transforms) are inline styles. Long shadow and gradient
  recipes are named utilities in `index.css` (`glass-track`, `chip-gold`, `card-face` and so on).
- **Motion is CSS transitions.** State changes set a new transform and the browser
  animates it; there is no animation library. `prefers-reduced-motion` skips the intro
  and the wallet-switch animation.
- **One hook owns the behaviour.** `useWallet` holds the state and returns each card's
  current pose, so components only draw.

## Differences from the design prototype

- The prototype's Tweaks panel is gone. The choices settled on are built in: Ink leather
  with the smooth grain, Plus Jakarta Sans with Space Mono, Koro on charcoal. The other
  materials, grains and fonts were not carried over.
- "Copy number" really copies the card number to the clipboard.
- Pocket views that are faded out are also removed from keyboard and screen-reader
  reach (`inert`).
- The stage scales down to fit small windows.
