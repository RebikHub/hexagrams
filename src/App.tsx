import { useCallback, useState } from 'react';
import CoinToss from './components/CoinToss';
import Hexagram from './components/Hexagram';
import './App.css';
import type { TLine, TSumToLine } from './types';
import { HEXAGRAMS } from './configs/hexagrams';

/**
 * Традиционный трёхмонетный метод:
 *   true  = 陽 (золото)  = 3
 *   false = 陰 (серебро) = 2
 *
 * 9 — 老陽 (три 陽)     → сплошная, меняющаяся  → ○
 * 8 — 少陰 (два 陽)     → прерывистая, стабильная
 * 7 — 少陽 (одно 陽)    → сплошная, стабильная
 * 6 — 老陰 (три 陰)     → прерывистая, меняющаяся → ×
 */

const SUM_TO_LINE: TSumToLine = {
  9: { type: 'yang', changing: true },
  8: { type: 'yin', changing: false },
  7: { type: 'yang', changing: false },
  6: { type: 'yin', changing: true },
};

let lines: (TLine | null)[] = [null, null, null, null, null, null];

export default function App() {
  const [resultHexagram, setResultHexagram] = useState('');
  const sendResult = useCallback((arr: boolean[]) => {
    const sum = arr.reduce((a, b) => a + (b ? 3 : 2), 0);
    const line = SUM_TO_LINE[sum];

    if (!line) return;

    let nullableIndex: number = 0;
    lines.map((e, i) => {
      if (e === null) {
        nullableIndex = i;
      }
      return e;
    });

    lines[nullableIndex] = line;
    const result = [...lines]
      .reverse()
      .map((e) => {
        if (e?.type === 'yang') {
          return '1';
        } else if (e?.type === 'yin') {
          return '0';
        }
        return '';
      })
      .join('');

    setResultHexagram(result);
  }, []);

  const reset = useCallback(() => {
    lines = [null, null, null, null, null, null];
    setResultHexagram('');
  }, []);

  return (
    <section>
      <h3>Сформулируй четкий вопрос</h3>
      <div key={resultHexagram} className="app">
        <Hexagram lines={lines} />
        <CoinToss sendResult={sendResult} completed={!!HEXAGRAMS[resultHexagram]} reset={reset} />
        {HEXAGRAMS[resultHexagram] && (
          <div>
            {HEXAGRAMS[resultHexagram].n} {HEXAGRAMS[resultHexagram].ru}
          </div>
        )}
      </div>
    </section>
  );
}
