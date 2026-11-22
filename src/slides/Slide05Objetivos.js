import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromLeft, fromBottom } from '../motion/variants.js';

const html = htm.bind(React.createElement);

export function Slide05Objetivos() {
  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-8 relative z-10"
    >
      <${motion.div} variants=${fromTop}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
          05 · Propósito del Estudio
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
          Objetivos de la Investigación
        </h2>
      </${motion.div}>

      <${motion.div}
        variants=${fromLeft}
        whileHover=${{ scale: 1.01 }}
        className="bg-cream text-forest-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-l-8 border-mint-400"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-forest-600 mb-2">
          Objetivo General
        </p>
        <p className="text-xl sm:text-2xl font-extrabold leading-snug">
          ${D.objetivos.general}
        </p>
      </${motion.div}>

      <div className="grid md:grid-cols-3 gap-6">
        ${D.objetivos.especificos.map(
          (obj) => html`
            <${motion.div}
              key=${obj.num}
              variants=${fromBottom}
              whileHover=${{ y: -6, borderColor: 'rgba(116, 198, 157, 0.5)' }}
              className="glass-card-dark rounded-3xl p-6 flex flex-col gap-3 transition-colors"
            >
              <span className="font-display text-4xl font-bold text-mint-300">${obj.num}</span>
              <h3 className="text-lg font-bold text-white">${obj.titulo}</h3>
              <p className="text-sm text-white/80 leading-relaxed">${obj.texto}</p>
            </${motion.div}>
          `
        )}
      </div>
    </${motion.div}>
  `;
}
