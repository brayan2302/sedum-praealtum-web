import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop } from '../motion/variants.js';

const html = htm.bind(React.createElement);

export function Slide11Sintesis() {
  const [tab, setTab] = useState('conclusiones');
  const tabs = [
    { id: 'conclusiones', label: 'Conclusiones (6)' },
    { id: 'discusion', label: 'Discusión' },
    { id: 'recomendaciones', label: 'Recomendaciones' },
  ];

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-6 relative z-10"
    >
      <${motion.div} variants=${fromTop} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
            11 · Síntesis Final
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Discusión, Conclusiones y Recomendaciones
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
          ${tabs.map((t) => {
            const active = t.id === tab;
            return html`
              <button
                key=${t.id}
                onClick=${() => setTab(t.id)}
                className=${`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  active ? 'text-forest-950' : 'text-white/80 hover:text-white'
                }`}
              >
                ${active &&
                html`
                  <${motion.span}
                    layoutId="tabIndicator11"
                    transition=${{ type: 'spring', stiffness: 320, damping: 26 }}
                    className="absolute inset-0 bg-mint-400 rounded-full -z-10"
                  />
                `}
                ${t.label}
              </button>
            `;
          })}
        </div>
      </${motion.div}>

      <${AnimatePresence} mode="wait">
        ${tab === 'conclusiones' &&
        html`
          <${motion.div}
            key="conclusiones"
            initial=${{ opacity: 0, y: 16 }}
            animate=${{ opacity: 1, y: 0 }}
            exit=${{ opacity: 0, y: -16 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            ${D.conclusiones.map(
              (c, i) => html`
                <${motion.div}
                  key=${c}
                  whileHover=${{ y: -4 }}
                  className=${`rounded-2xl p-5 ${
                    i === 5 ? 'bg-forest-700/80 border border-mint-400/35' : 'glass-card-dark'
                  }`}
                >
                  <span className="font-display text-2xl font-bold text-mint-300">0${i + 1}</span>
                  <p className="text-sm text-white/90 mt-2 leading-relaxed">${c}</p>
                </${motion.div}>
              `
            )}
          </${motion.div}>
        `}

        ${tab === 'discusion' &&
        html`
          <${motion.div}
            key="discusion"
            initial=${{ opacity: 0, y: 16 }}
            animate=${{ opacity: 1, y: 0 }}
            exit=${{ opacity: 0, y: -16 }}
            className="grid md:grid-cols-2 gap-4"
          >
            ${D.discusion.map(
              (item, idx) => html`
                <div key=${item} className="glass-card rounded-2xl p-5 text-sm text-white/90 leading-relaxed">
                  <span className="text-xs font-bold text-mint-300 uppercase block mb-1">
                    Punto de Discusión 0${idx + 1}
                  </span>
                  ${item}
                </div>
              `
            )}
          </${motion.div}>
        `}

        ${tab === 'recomendaciones' &&
        html`
          <${motion.div}
            key="recomendaciones"
            initial=${{ opacity: 0, y: 16 }}
            animate=${{ opacity: 1, y: 0 }}
            exit=${{ opacity: 0, y: -16 }}
            className="grid md:grid-cols-3 gap-5"
          >
            ${D.recomendaciones.map(
              (rec) => html`
                <div key=${rec.num} className="glass-card rounded-3xl p-6 space-y-2">
                  <span className="font-display text-3xl font-bold text-mint-300">${rec.num}</span>
                  <h3 className="text-lg font-bold text-white">${rec.titulo}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">${rec.texto}</p>
                </div>
              `
            )}
          </${motion.div}>
        `}
      </${AnimatePresence}>
    </${motion.div}>
  `;
}
