import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import htm from 'htm';
import { SLIDES } from './slides/index.js';
import { slideVariants } from './motion/variants.js';
import { AmbientBackdrop } from './components/AmbientBackdrop.js';
import { Navbar } from './components/Navbar.js';
import { FooterControls } from './components/FooterControls.js';
import { OverviewGrid } from './components/OverviewGrid.js';

const html = htm.bind(React.createElement);

export function App() {
  const [[currentIndex, direction], setSlide] = useState([0, 1]);
  const [viewMode, setViewMode] = useState('slides'); // 'slides' | 'vertical' | 'overview'
  const touchStartRef = useRef({ x: 0, y: 0, ignore: false });

  const goTo = useCallback(
    (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= SLIDES.length) return;
      if (viewMode === 'vertical') {
        const el = document.getElementById(`vertical-slide-${nextIdx}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setSlide([nextIdx, 1]);
        return;
      }
      const dir = nextIdx > currentIndex ? 1 : -1;
      setSlide([nextIdx, dir]);
      setViewMode('slides');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [currentIndex, viewMode]
  );

  const next = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      setSlide([currentIndex + 1, 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setSlide([currentIndex - 1, -1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (viewMode === 'slides') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      }
      if (e.key === 'g' || e.key === 'G') {
        setViewMode((m) => (m === 'overview' ? 'slides' : 'overview'));
      } else if (e.key === 'v' || e.key === 'V') {
        setViewMode((m) => (m === 'vertical' ? 'slides' : 'vertical'));
      } else if (e.key === 'Escape' && viewMode === 'overview') {
        setViewMode('slides');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, viewMode]);

  // Touch swipe navigation on mobile (ignores swipes on 3D canvas)
  const handleTouchStart = (e) => {
    const isCanvas = e.target?.tagName === 'CANVAS';
    touchStartRef.current = {
      x: e.changedTouches[0].screenX,
      y: e.changedTouches[0].screenY,
      ignore: isCanvas,
    };
  };

  const handleTouchEnd = (e) => {
    if (viewMode !== 'slides' || touchStartRef.current.ignore) return;
    const dx = touchStartRef.current.x - e.changedTouches[0].screenX;
    const dy = Math.abs(touchStartRef.current.y - e.changedTouches[0].screenY);
    if (Math.abs(dx) > 65 && dy < 80) {
      if (dx > 0) next();
      else prev();
    }
  };

  const ActiveSlideComponent = SLIDES[currentIndex].component;

  return html`
    <div
      onTouchStart=${handleTouchStart}
      onTouchEnd=${handleTouchEnd}
      className="min-h-screen flex flex-col bg-forest-900 text-white relative"
    >
      <${AmbientBackdrop} variant=${currentIndex % 2 === 0 ? 'hero' : 'left'} />

      <${Navbar}
        currentIndex=${currentIndex}
        totalSlides=${SLIDES.length}
        slideTitle=${SLIDES[currentIndex].title}
        viewMode=${viewMode}
        onSetViewMode=${setViewMode}
      />

      <main
        className=${`flex-1 flex flex-col justify-center pt-14 relative z-10 ${
          viewMode === 'slides' ? 'pb-16' : 'pb-10'
        }`}
      >
        ${viewMode === 'overview' &&
        html`
          <${OverviewGrid}
            slides=${SLIDES}
            currentIndex=${currentIndex}
            onSelect=${(idx) => {
              setViewMode('slides');
              setSlide([idx, idx >= currentIndex ? 1 : -1]);
            }}
          />
        `}

        ${viewMode === 'vertical' &&
        html`
          <div className="w-full divide-y divide-white/10">
            ${SLIDES.map((s, idx) => {
              const Comp = s.component;
              return html`
                <section
                  key=${s.title}
                  id=${`vertical-slide-${idx}`}
                  className="w-full py-6 sm:py-10 scroll-mt-14"
                >
                  <${Comp} onJumpTo3D=${() => goTo(3)} onJumpToQR=${() => goTo(1)} />
                </section>
              `;
            })}
          </div>
        `}

        ${viewMode === 'slides' &&
        html`
          <${AnimatePresence} mode="wait" custom=${direction}>
            <${motion.section}
              key=${currentIndex}
              custom=${direction}
              variants=${slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex-1 flex flex-col justify-center items-center py-4 sm:py-6 overflow-y-auto"
            >
              <${ActiveSlideComponent} onJumpTo3D=${() => goTo(3)} onJumpToQR=${() => goTo(1)} />
            </${motion.section}>
          </${AnimatePresence}>
        `}
      </main>

      ${viewMode === 'slides' &&
      html`
        <${FooterControls}
          slides=${SLIDES}
          currentIndex=${currentIndex}
          onPrev=${prev}
          onNext=${next}
          onGoTo=${goTo}
        />
      `}
    </div>
  `;
}
