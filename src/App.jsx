import { useEffect, useState } from 'react';
import Wallet from './components/Wallet';
import { STAGE } from './lib/layouts';

// The wallet is drawn on a fixed 960 x 760 stage. On smaller windows the
// whole stage is scaled down to fit; it is never scaled up.
function useStageScale() {
  const fit = () => Math.min(1, window.innerWidth / STAGE.width, window.innerHeight / STAGE.height);
  const [scale, setScale] = useState(fit);

  useEffect(() => {
    const onResize = () => setScale(fit());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return scale;
}

export default function App() {
  const scale = useStageScale();
  return (
    <main className="grid h-full place-items-center overflow-hidden bg-ground">
      <div style={{ width: STAGE.width * scale, height: STAGE.height * scale }}>
        <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
          <Wallet />
        </div>
      </div>
    </main>
  );
}
