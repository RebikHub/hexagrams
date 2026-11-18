import './iching.css';
import type { TLine } from '../types';

/**
 * lines — массив из 6 объектов { type: 'yang' | 'yin', changing: boolean }
 * Порядок: index 0 = нижняя линия, index 5 = верхняя.
 * Компонент только рисует. Никакой логики преобразования здесь нет.
 */

type Props = {
  lines: (TLine | null)[];
};

export default function Hexagram({ lines = [] }: Props) {
  return (
    <div className="hexagram" role="img" aria-label="Гексаграмма">
      {lines.map((line, i) => {
        if (!line) {
          return <div key={i} className="hexagram__line" aria-hidden="true" />;
        }

        const { type, changing } = line;
        const marker = changing ? (type === 'yang' ? '○' : '×') : null;

        return (
          <div
            key={`${i}-${type}-${changing}`}
            className={
              'hexagram__line ' +
              `hexagram__line--${type}` +
              (changing ? ' hexagram__line--changing' : '')
            }
          >
            <span className="hexagram__index">{7 - (i + 1)}</span>
            <span className="hexagram__bar" />
            {type === 'yin' && <span className="hexagram__bar" />}
            {marker && <span className="hexagram__marker">{marker}</span>}
          </div>
        );
      })}
    </div>
  );
}
