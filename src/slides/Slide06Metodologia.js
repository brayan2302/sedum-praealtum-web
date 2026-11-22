import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromLeft, fromRight } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide06Metodologia() {
  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-6 relative z-10"
    >
      <${motion.div} variants=${fromTop}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
          06 · Marco Metodológico
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
          Materiales y Métodos
        </h2>
      </${motion.div}>

      <div className="grid lg:grid-cols-12 gap-6">
        <${motion.div} variants=${fromLeft} className="lg:col-span-5 glass-card rounded-3xl p-6 space-y-5">
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Naturaleza</p>
              <p className="text-sm font-bold text-white">${D.metodologia.naturaleza}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Tipo</p>
                <p className="text-sm font-bold text-white">${D.metodologia.tipo}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Diseño</p>
                <p className="text-sm font-bold text-white">${D.metodologia.diseno}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-2">
              Descriptores de Búsqueda (AND / OR)
            </p>
            <div className="flex flex-wrap gap-1.5">
              ${D.metodologia.descriptores.map(
                (tag) => html`
                  <${motion.span}
                    key=${tag}
                    whileHover=${{ scale: 1.07 }}
                    className="px-2.5 py-1 rounded-full bg-mint-400/15 border border-mint-400/30 text-mint-300 text-xs font-medium"
                  >
                    ${tag}
                  </${motion.span}>
                `
              )}
            </div>
          </div>
        </${motion.div}>

        <${motion.div} variants=${fromRight} className="lg:col-span-7 flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card-dark rounded-3xl p-5">
              <div className="flex items-center gap-2 text-mint-300 font-bold text-xs uppercase tracking-wider mb-2">
                <${Icon} name="check-circle-2" className="w-4 h-4" />
                <span>Criterios de Inclusión</span>
              </div>
              <ul className="space-y-2 text-xs text-white/85 leading-relaxed">
                ${D.metodologia.inclusion.map((inc) => html`<li key=${inc}>• ${inc}</li>`)}
              </ul>
            </div>

            <div className="glass-card-dark rounded-3xl p-5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                <${Icon} name="x-circle" className="w-4 h-4" />
                <span>Criterios de Exclusión</span>
              </div>
              <p className="text-xs text-white/85 leading-relaxed">${D.metodologia.exclusion}</p>
            </div>
          </div>

          <div className="bg-forest-700/70 border border-mint-400/25 rounded-3xl p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-mint-300">
              Técnicas e Instrumentos de Análisis
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-white/90">
              ${D.metodologia.tecnicas.map(
                (t) => html`
                  <div key=${t} className="bg-white/10 rounded-xl px-3.5 py-2.5 font-medium">
                    • ${t}
                  </div>
                `
              )}
            </div>
          </div>
        </${motion.div}>
      </div>
    </${motion.div}>
  `;
}
