/* eslint-disable react-hooks/refs */

import { useCallback, useEffect, useRef, useState } from 'react';
import './iching.css';

type Props = {
  sendResult: (arr: boolean[]) => void;
  completed: boolean;
  reset: () => void;
};

export default function CoinToss({ sendResult, completed, reset }: Props) {
  const result = useRef([true, true, true]);
  const [started, setStarted] = useState<'pending' | 'started' | 'ended'>('pending');
  const [spinning, setSpinning] = useState(false);

  const handleDown = useCallback(() => {
    setSpinning(true);
    setStarted('started');
  }, []);

  const handleUp = useCallback(() => {
    if (!spinning) return;
    setSpinning(false);
    setStarted('ended');
  }, [spinning]);

  const simplePredict = useCallback(() => {
    return Date.now() % 2 === 0;
  }, []);

  useEffect(() => {
    let timer = null;
    if (!spinning && started === 'ended') {
      timer = setTimeout(() => {
        sendResult(result.current);
        setStarted('pending');
        result.current = [true, true, true];
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [sendResult, spinning, started]);

  return (
    <div className="coin-toss">
      {started === 'pending' ? (
        <div className="coin-toss__coins">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                className={`coin `}
                style={{
                  animationDelay: undefined,
                }}
                aria-label={'орёл'}
              >
                <div className="coin__face coin__face--heads">
                  <span className="coin__mark">陽</span>
                  <span className="coin__hole" />
                </div>
                <div className="coin__face coin__face--tails">
                  <span className="coin__mark">陰</span>
                  <span className="coin__hole" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="coin-toss__coins">
          {[0, 1, 2].map((i) => {
            const face = simplePredict();
            const landedClass = spinning ? '' : face ? 'coin--show-heads' : 'coin--show-tails';

            result.current[i] = face;
            return (
              <div
                key={i}
                className={`coin ${spinning ? 'coin--spinning' : landedClass}`}
                style={{
                  animationDelay: spinning ? `${i * 0.08}s` : undefined,
                }}
                aria-label={spinning ? 'монета крутится' : face ? 'орёл' : 'решка'}
              >
                <div className="coin__face coin__face--heads">
                  <span className="coin__mark">陽</span>
                  <span className="coin__hole" />
                </div>
                <div className="coin__face coin__face--tails">
                  <span className="coin__mark">陰</span>
                  <span className="coin__hole" />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        type="button"
        className="coin-toss__btn"
        onPointerDown={!completed ? handleDown : undefined}
        onPointerUp={!completed ? handleUp : undefined}
        onPointerLeave={!completed ? handleUp : undefined}
        onPointerCancel={!completed ? handleUp : undefined}
        onClick={completed ? reset : undefined}
      >
        {completed ? 'Еще раз попробовать' : spinning ? 'Крутим…' : 'Бросить монеты'}
      </button>
    </div>
  );
}
