import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { Icon } from './Icon.js';

const html = htm.bind(React.createElement);

export function Navbar({
  currentIndex,
  totalSlides,
  slideTitle,
  viewMode, // 'slides' | 'vertical' | 'overview'
  onSetViewMode,
}) {
  const progressPct = ((currentIndex + 1) / totalSlides) * 100;

  return html`
    <header
      className="no-print fixed top-0 left-0 right-0 z-50 bg-forest-950/85 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/95 p-1 shadow-sm shrink-0 overflow-hidden"
          >
            <img
              src="https://www.fcs.uc.edu.ve/wp-content/uploads/2026/04/logo-fcs.webp"
              alt="Logo FCS Universidad de Carabobo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="truncate">
            <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#34d399] uppercase truncate">
              Sedum praealtum · Histoquímica
            </p>
            <p className="text-[11px] sm:text-xs text-white/75 truncate">
              ${viewMode === 'vertical' ? 'Modo Lectura Vertical (Todas las diapositivas)' : slideTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          ${viewMode === 'slides' &&
          html`
            <span className="text-[11px] sm:text-xs font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/10">
              ${String(currentIndex + 1).padStart(2, '0')}/${String(totalSlides).padStart(2, '0')}
            </span>
          `}

          <button
            type="button"
            onClick=${() => onSetViewMode(viewMode === 'vertical' ? 'slides' : 'vertical')}
            title="Alternar modo vertical para móviles y lectura continua"
            className=${`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'vertical'
                ? 'bg-[#34d399] text-forest-950 font-extrabold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <${Icon} name=${viewMode === 'vertical' ? 'presentation' : 'smartphone'} className="w-4 h-4" />
            <span className="hidden md:inline">
              ${viewMode === 'vertical' ? 'Modo Diapositivas' : 'Modo Vertical'}
            </span>
          </button>

          <button
            type="button"
            onClick=${() => onSetViewMode(viewMode === 'overview' ? 'slides' : 'overview')}
            title="Vista general (Tecla G)"
            className=${`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'overview'
                ? 'bg-[#34d399] text-forest-950 font-extrabold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <${Icon} name="layout-grid" className="w-4 h-4" />
            <span className="hidden md:inline">Vista General</span>
          </button>

          <button
            type="button"
            onClick=${() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
            title="Pantalla completa"
          >
            <${Icon} name="maximize-2" className="w-4 h-4" />
          </button>
        </div>
      </div>

      ${viewMode === 'slides' &&
      html`
        <div className="w-full h-0.5 bg-white/10">
          <${motion.div}
            className="h-full bg-[#34d399]"
            animate=${{ width: `${progressPct}%` }}
            transition=${{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      `}
    </header>
  `;
}
