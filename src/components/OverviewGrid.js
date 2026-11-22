import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function OverviewGrid({ slides, currentIndex, onSelect }) {
  return html`
    <div className="max-w-7xl mx-auto w-full px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${slides.map(
        (s, idx) => html`
          <${motion.button}
            key=${s.title}
            initial=${{ opacity: 0, y: 20 }}
            animate=${{ opacity: 1, y: 0 }}
            transition=${{ delay: idx * 0.035 }}
            whileHover=${{ y: -4, scale: 1.02 }}
            onClick=${() => onSelect(idx)}
            className=${`text-left rounded-2xl p-5 glass-card transition cursor-pointer ${
              idx === currentIndex ? 'border-2 border-mint-400' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-mint-300 uppercase">
                Diapositiva ${String(idx + 1).padStart(2, '0')}
              </span>
              ${s.badge &&
              html`
                <span className="px-2 py-0.5 rounded-full bg-mint-400/20 text-mint-300 text-[10px] font-bold">
                  ${s.badge}
                </span>
              `}
            </div>
            <p className="text-base font-bold text-white mt-1.5">${s.title}</p>
          </${motion.button}>
        `
      )}
    </div>
  `;
}
