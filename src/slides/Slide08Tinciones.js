import React, { useState } from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromBottom } from '../motion/variants.js';

const html = htm.bind(React.createElement);

export function Slide08Tinciones() {
  const [filter, setFilter] = useState('todos');
  const filters = [
    { id: 'todos', label: 'Todas (7)' },
    { id: 'pared', label: 'Pared y Haces' },
    { id: 'polisacaridos', label: 'Mucílagos / Polisacáridos' },
    { id: 'reservas', label: 'Reservas' },
  ];

  const rows =
    filter === 'todos' ? D.tinciones : D.tinciones.filter((t) => t.categoria === filter);

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 lg:py-10 flex flex-col justify-center gap-5 relative z-10"
    >
      <${motion.div} variants=${fromTop} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
            09 · Resultados · Objetivo Específico 2
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Técnicas de Tinción e Histoquímica Vegetal
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          ${filters.map(
            (f) => html`
              <button
                key=${f.id}
                onClick=${() => setFilter(f.id)}
                className=${`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  filter === f.id
                    ? 'bg-mint-400 text-forest-950'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                ${f.label}
              </button>
            `
          )}
        </div>
      </${motion.div}>

      <${motion.div} variants=${fromBottom} className="glass-card-dark rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-forest-950/90 text-mint-300 uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4 font-bold">Coloración</th>
                <th className="py-3 px-4 font-bold">Fundamento</th>
                <th className="py-3 px-4 font-bold">Aplicación en <em>S. praealtum</em></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/90">
              ${rows.map(
                (r) => html`
                  <tr key=${r.nombre} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-white">${r.nombre}</td>
                    <td className="py-2.5 px-4 text-white/80">${r.fundamento}</td>
                    <td className="py-2.5 px-4 text-mint-300/95">${r.aplicacion}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </${motion.div}>

      <${motion.div} variants=${fromBottom} className="glass-card rounded-2xl p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-2">
          Procesamiento de la Muestra (8 Pasos · Fijación óptima esencial)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-bold">
          ${D.procesamientoPasos.map(
            (paso, i) => html`
              <div
                key=${paso}
                className=${`rounded-xl py-2 px-1 ${
                  i >= 6
                    ? 'bg-mint-400 text-forest-950'
                    : 'bg-white/10 text-white border border-white/10'
                }`}
              >
                ${i + 1}. ${paso}
              </div>
            `
          )}
        </div>
      </${motion.div}>
    </${motion.div}>
  `;
}
