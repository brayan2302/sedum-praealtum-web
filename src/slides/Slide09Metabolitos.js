import React, { useState } from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, popIn } from '../motion/variants.js';

const html = htm.bind(React.createElement);

export function Slide09Metabolitos() {
  const [activeMet, setActiveMet] = useState(0);

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-6 relative z-10"
    >
      <${motion.div} variants=${fromTop}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
          09 · Resultados · Objetivo Específico 3
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
          Metabolitos Detectables e Importancia Histoquímica
        </h2>
      </${motion.div}>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${D.metabolitos.map((m, idx) => {
          const isSelected = idx === activeMet;
          return html`
            <${motion.div}
              key=${m.nombre}
              variants=${popIn}
              whileHover=${{ y: -5, scale: 1.02 }}
              onClick=${() => setActiveMet(idx)}
              className=${`rounded-2xl p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-forest-700/85 border-2 border-mint-400 shadow-xl'
                  : 'glass-card-dark hover:border-mint-300/35'
              }`}
            >
              <span className="text-[11px] font-bold text-mint-300 uppercase tracking-wider">
                ${m.tipo}
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">${m.nombre}</h3>
              <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                <strong>Detección:</strong> ${m.deteccion}
              </p>
              <p className="text-xs text-mint-300/90 mt-1 leading-relaxed">
                <strong>Función:</strong> ${m.funcion}
              </p>
            </${motion.div}>
          `;
        })}
      </div>
    </${motion.div}>
  `;
}
