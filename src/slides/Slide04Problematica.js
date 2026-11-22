import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromBottom } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide04Problematica() {
  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-8 relative z-10"
    >
      <${motion.div} variants=${fromTop} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
            04 · Planteamiento y Justificación
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Problemática y Relevancia Científica
          </h2>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-white/10 text-mint-300 text-xs font-bold">
          Contexto Etnobotánico Venezolano
        </span>
      </${motion.div}>

      <div className="grid md:grid-cols-3 gap-6">
        ${D.problematica.map(
          (item, i) => html`
            <${motion.div}
              key=${item.titulo}
              variants=${fromBottom}
              whileHover=${{ y: -8, scale: 1.015 }}
              className=${`rounded-3xl p-6 flex flex-col gap-4 transition-shadow ${
                i === 1
                  ? 'bg-forest-700/80 border border-mint-400/35 shadow-xl'
                  : 'glass-card'
              }`}
            >
              <div
                className="w-14 h-14 rounded-full bg-mint-400 text-forest-950 flex items-center justify-center shadow-lg"
              >
                <${Icon} name=${item.icono} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">${item.titulo}</h3>
              <p className="text-sm text-white/80 leading-relaxed">${item.descripcion}</p>
            </${motion.div}>
          `
        )}
      </div>

      <${motion.div}
        variants=${fromBottom}
        className="glass-card-dark rounded-2xl p-5 flex items-start gap-3"
      >
        <${Icon} name="sparkles" className="w-5 h-5 text-mint-300 mt-0.5 shrink-0" />
        <p className="text-sm text-white/90">
          <strong>Aporte del estudio:</strong> Interrelaciona los hallazgos histoquímicos con la correlación funcional frente a afecciones inflamatorias y respiratorias, proveyendo respaldo documental sólido a la medicina tradicional.
        </p>
      </${motion.div}>
    </${motion.div}>
  `;
}
