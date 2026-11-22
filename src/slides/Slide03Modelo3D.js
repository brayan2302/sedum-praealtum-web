import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromLeft, fromRight } from '../motion/variants.js';
import { Sedum3DViewer } from '../three/Sedum3DViewer.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide03Modelo3D() {
  const [panelTab, setPanelTab] = useState('caracteristicas');
  const [activeHotspotId, setActiveHotspotId] = useState('hojas');
  const [activeCare, setActiveCare] = useState(null);
  const [showCloche, setShowCloche] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const [isFullscreen3D, setIsFullscreen3D] = useState(false);
  const stageRef = useRef(null);

  const selectedHotspot =
    D.modelo3D.hotspots.find((h) => h.id === activeHotspotId) || D.modelo3D.hotspots[0];

  const handleSelectHotspot = (id) => {
    setActiveHotspotId(id);
    setPanelTab('caracteristicas');
  };

  const handleToggleCare = (careId) => {
    setActiveCare((prev) => (prev === careId ? null : careId));
    if (careId === 'riego' || careId === 'sustrato') {
      setShowCloche(false);
    }
  };

  const toggleFullscreen3D = () => {
    setIsFullscreen3D((prev) => {
      const next = !prev;
      if (next && stageRef.current?.requestFullscreen) {
        stageRef.current.requestFullscreen().catch(() => {});
      } else if (!next && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      return next;
    });
  };

  // Sync if user exits native fullscreen with Esc
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement && isFullscreen3D) {
        setIsFullscreen3D(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape' && isFullscreen3D) {
        setIsFullscreen3D(false);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      window.removeEventListener('keydown', onKey);
    };
  }, [isFullscreen3D]);

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-6 lg:py-8 flex flex-col justify-center gap-5 relative z-10"
    >
      <!-- Header -->
      <${motion.div} variants=${fromTop} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#34d399]">
            03 · Laboratorio Botánico Interactivo 3D
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
            <span className="italic text-[#34d399]">Sedum praealtum</span> en 3D y Cuidados Básicos
          </h2>
        </div>

        <!-- 3D Viewport Controls -->
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick=${() => setShowCloche((v) => !v)}
            className=${`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              showCloche
                ? 'bg-[#34d399] text-forest-950'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <${Icon} name="sparkles" className="w-3.5 h-3.5" />
            <span>${showCloche ? 'Campana: ON' : 'Campana: OFF'}</span>
          </button>

          <button
            type="button"
            onClick=${() => setAutoRotate((v) => !v)}
            className=${`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              autoRotate
                ? 'bg-[#34d399]/20 border border-[#34d399]/40 text-[#34d399]'
                : 'bg-white/10 text-white/75 hover:bg-white/20'
            }`}
          >
            <${Icon} name="rotate-3d" className="w-3.5 h-3.5" />
            <span>Auto-Rotar</span>
          </button>

          <button
            type="button"
            onClick=${() => {
              setActiveHotspotId(null);
              setActiveCare(null);
              setResetSignal((n) => n + 1);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
          >
            <${Icon} name="refresh-ccw" className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>

          <button
            type="button"
            onClick=${toggleFullscreen3D}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#34d399] hover:bg-mint-300 text-forest-950 text-xs font-extrabold transition cursor-pointer shadow-md"
          >
            <${Icon} name="maximize" className="w-3.5 h-3.5" />
            <span>3D Pantalla Completa</span>
          </button>
        </div>
      </${motion.div}>

      <!-- Main 3D Stage + Interactive Inspector -->
      <div className="grid lg:grid-cols-12 gap-5 items-stretch">
        <!-- 3D Canvas Container (Expands to Fullscreen cleanly!) -->
        <${motion.div}
          ref=${stageRef}
          variants=${fromLeft}
          className=${isFullscreen3D
            ? 'fixed inset-0 z-[110] bg-forest-950 p-3 sm:p-5 flex flex-col'
            : 'lg:col-span-7 glass-card-dark rounded-3xl p-2 relative shadow-2xl border border-[#34d399]/25 min-h-[320px] sm:min-h-[440px] lg:min-h-[500px]'}
        >
          <div className="relative w-full h-full flex-1 rounded-3xl overflow-hidden bg-forest-950/60">
            <${Sedum3DViewer}
              hotspots=${D.modelo3D.hotspots}
              activeHotspotId=${activeHotspotId}
              onSelectHotspot=${handleSelectHotspot}
              activeCare=${activeCare}
              showCloche=${showCloche}
              autoRotate=${autoRotate}
              resetSignal=${resetSignal}
            />

            <!-- Floating Fullscreen Toggle Button inside 3D Canvas -->
            <button
              type="button"
              onClick=${toggleFullscreen3D}
              title=${isFullscreen3D ? 'Salir de pantalla completa (Esc)' : 'Ver 3D en pantalla completa'}
              className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-950/85 hover:bg-[#34d399] text-white hover:text-forest-950 border border-[#34d399]/40 text-xs font-bold backdrop-blur-md transition cursor-pointer shadow-lg"
            >
              <${Icon} name=${isFullscreen3D ? 'minimize-2' : 'maximize-2'} className="w-3.5 h-3.5" />
              <span>${isFullscreen3D ? 'Salir (Esc)' : 'Ampliar 3D'}</span>
            </button>

            <!-- Active Care Live Badge -->
            <${AnimatePresence}>
              ${activeCare &&
              html`
                <${motion.div}
                  initial=${{ opacity: 0, y: -12 }}
                  animate=${{ opacity: 1, y: 0 }}
                  exit=${{ opacity: 0, y: -12 }}
                  className="absolute top-3 left-3 z-30 px-3.5 py-1.5 rounded-full bg-[#34d399] text-forest-950 text-xs font-extrabold flex items-center gap-2 shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-forest-950 animate-ping"></span>
                  <span>
                    Simulando 3D:${' '}
                    ${D.modelo3D.cuidados.find((c) => c.id === activeCare)?.titulo}
                  </span>
                </${motion.div}>
              `}
            </${AnimatePresence}>

            <!-- Fullscreen HUD Overlay for Care & Hotspots -->
            ${isFullscreen3D &&
            html`
              <div className="absolute bottom-14 left-3 right-3 z-30 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
                <!-- Quick Care Pills -->
                <div className="flex flex-wrap gap-2 pointer-events-auto">
                  ${D.modelo3D.cuidados.map((c) => {
                    const isOn = activeCare === c.id;
                    return html`
                      <button
                        key=${c.id}
                        type="button"
                        onClick=${() => handleToggleCare(c.id)}
                        className=${`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold backdrop-blur-md transition cursor-pointer shadow-lg ${
                          isOn
                            ? 'bg-[#34d399] text-forest-950'
                            : 'bg-forest-950/80 text-white border border-white/15 hover:border-[#34d399]'
                        }`}
                      >
                        <${Icon} name=${c.icono} className="w-3.5 h-3.5" />
                        <span>${c.titulo}</span>
                      </button>
                    `;
                  })}
                  <button
                    type="button"
                    onClick=${() => setShowCloche((v) => !v)}
                    className=${`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold backdrop-blur-md transition cursor-pointer shadow-lg ${
                      showCloche
                        ? 'bg-[#34d399] text-forest-950'
                        : 'bg-forest-950/80 text-white border border-white/15'
                    }`}
                  >
                    <${Icon} name="sparkles" className="w-3.5 h-3.5" />
                    <span>Campana</span>
                  </button>
                </div>

                <!-- Compact Selected Hotspot Detail -->
                ${selectedHotspot &&
                html`
                  <div className="pointer-events-auto max-w-sm glass-card-dark rounded-2xl p-3.5 border border-[#34d399]/30 shadow-xl hidden sm:block">
                    <p className="text-[11px] font-bold uppercase text-[#34d399]">
                      ${selectedHotspot.label} · ${selectedHotspot.subtitulo}
                    </p>
                    <p className="text-xs text-white/85 mt-1 leading-relaxed">
                      ${selectedHotspot.detalle}
                    </p>
                  </div>
                `}
              </div>
            `}
          </div>
        </${motion.div}>

        <!-- Right Interactive Control Panel -->
        <${motion.div}
          variants=${fromRight}
          className="lg:col-span-5 glass-card rounded-3xl p-4 sm:p-5 flex flex-col justify-between gap-4"
        >
          <div className="grid grid-cols-2 gap-2 bg-forest-950/60 p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick=${() => setPanelTab('caracteristicas')}
              className=${`relative py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                panelTab === 'caracteristicas' ? 'text-forest-950' : 'text-white/80 hover:text-white'
              }`}
            >
              ${panelTab === 'caracteristicas' &&
              html`
                <${motion.span}
                  layoutId="panelTab3D"
                  transition=${{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="absolute inset-0 bg-[#34d399] rounded-xl -z-10"
                />
              `}
              Características 3D
            </button>

            <button
              type="button"
              onClick=${() => setPanelTab('cuidados')}
              className=${`relative py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                panelTab === 'cuidados' ? 'text-forest-950' : 'text-white/80 hover:text-white'
              }`}
            >
              ${panelTab === 'cuidados' &&
              html`
                <${motion.span}
                  layoutId="panelTab3D"
                  transition=${{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="absolute inset-0 bg-[#34d399] rounded-xl -z-10"
                />
              `}
              Cuidados Básicos
            </button>
          </div>

          <${AnimatePresence} mode="wait">
            ${panelTab === 'caracteristicas'
              ? html`
                  <${motion.div}
                    key="caracteristicas"
                    initial=${{ opacity: 0, y: 12 }}
                    animate=${{ opacity: 1, y: 0 }}
                    exit=${{ opacity: 0, y: -12 }}
                    className="flex-1 flex flex-col justify-between gap-3"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      ${D.modelo3D.hotspots.map((hs) => {
                        const isSel = hs.id === activeHotspotId;
                        return html`
                          <button
                            key=${hs.id}
                            type="button"
                            onClick=${() => setActiveHotspotId(hs.id)}
                            className=${`text-left p-3 rounded-2xl border transition cursor-pointer ${
                              isSel
                                ? 'bg-forest-700/90 border-[#34d399] text-white shadow-lg'
                                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                            }`}
                          >
                            <p className="text-xs font-extrabold">${hs.label}</p>
                            <p className="text-[11px] text-[#34d399]/90 mt-0.5 line-clamp-1">
                              ${hs.subtitulo}
                            </p>
                          </button>
                        `;
                      })}
                    </div>

                    <div className="bg-forest-950/75 border border-[#34d399]/25 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#34d399]">
                          Enfoque Anatómico 3D
                        </span>
                        <${Icon} name="focus" className="w-4 h-4 text-[#34d399]" />
                      </div>
                      <h3 className="text-lg font-extrabold text-white">
                        ${selectedHotspot.label}
                      </h3>
                      <p className="text-xs text-[#34d399] font-semibold">
                        ${selectedHotspot.subtitulo}
                      </p>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                        ${selectedHotspot.detalle}
                      </p>
                    </div>
                  </${motion.div}>
                `
              : html`
                  <${motion.div}
                    key="cuidados"
                    initial=${{ opacity: 0, y: 12 }}
                    animate=${{ opacity: 1, y: 0 }}
                    exit=${{ opacity: 0, y: -12 }}
                    className="flex-1 flex flex-col gap-3"
                  >
                    <p className="text-xs text-white/75">
                      Pulsa cualquier cuidado para <strong>animarlo en vivo</strong> sobre el modelo 3D:
                    </p>

                    ${D.modelo3D.cuidados.map((c) => {
                      const isOn = activeCare === c.id;
                      return html`
                        <${motion.button}
                          key=${c.id}
                          type="button"
                          whileHover=${{ scale: 1.015 }}
                          whileTap=${{ scale: 0.985 }}
                          onClick=${() => handleToggleCare(c.id)}
                          className=${`text-left p-3.5 rounded-2xl border transition cursor-pointer ${
                            isOn
                              ? 'bg-forest-700/95 border-[#34d399] shadow-lg'
                              : 'bg-forest-950/60 border-white/10 hover:border-[#34d399]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span
                                className=${`w-9 h-9 rounded-xl flex items-center justify-center ${
                                  isOn
                                    ? 'bg-[#34d399] text-forest-950'
                                    : 'bg-white/10 text-[#34d399]'
                                }`}
                              >
                                <${Icon} name=${c.icono} className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-sm font-extrabold text-white">${c.titulo}</p>
                                <p className="text-[11px] font-semibold text-[#34d399]">
                                  ${c.frecuencia}
                                </p>
                              </div>
                            </div>
                            <span
                              className=${`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                isOn
                                  ? 'bg-[#34d399] text-forest-950'
                                  : 'bg-white/10 text-white/75'
                              }`}
                            >
                              ${isOn ? 'Activo' : 'Simular'}
                            </span>
                          </div>
                          <p className="text-xs text-white/80 mt-2 leading-relaxed">
                            ${isOn ? c.detalle : c.resumen}
                          </p>
                        </${motion.button}>
                      `;
                    })}
                  </${motion.div}>
                `}
          </${AnimatePresence}>
        </${motion.div}>
      </div>
    </${motion.div}>
  `;
}
