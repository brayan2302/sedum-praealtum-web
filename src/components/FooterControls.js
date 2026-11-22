import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { Icon } from './Icon.js';

const html = htm.bind(React.createElement);

export function FooterControls({ slides, currentIndex, onPrev, onNext, onGoTo }) {
  return html`
    <footer
      className="no-print fixed bottom-0 left-0 right-0 z-50 bg-forest-950/80 backdrop-blur-md border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <${motion.button}
          whileHover=${{ scale: 1.04 }}
          whileTap=${{ scale: 0.96 }}
          onClick=${onPrev}
          disabled=${currentIndex === 0}
          className=${`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold transition cursor-pointer ${
            currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <${Icon} name="chevron-left" className="w-4 h-4" />
          <span>Anterior</span>
        </${motion.button}>

        <div className="hidden sm:flex items-center gap-2">
          ${slides.map(
            (s, idx) => html`
              <button
                key=${s.title}
                onClick=${() => onGoTo(idx)}
                aria-label=${s.title}
                title=${s.title}
                className=${`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === currentIndex ? 'w-7 bg-mint-400' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            `
          )}
        </div>

        <${motion.button}
          whileHover=${{ scale: 1.04 }}
          whileTap=${{ scale: 0.96 }}
          onClick=${onNext}
          disabled=${currentIndex === slides.length - 1}
          className=${`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mint-400 hover:bg-mint-300 text-forest-950 text-xs font-extrabold transition cursor-pointer ${
            currentIndex === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <span>Siguiente</span>
          <${Icon} name="chevron-right" className="w-4 h-4" />
        </${motion.button}>
      </div>
    </footer>
  `;
}
