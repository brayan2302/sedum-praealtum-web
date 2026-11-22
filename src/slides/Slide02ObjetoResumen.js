import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, fromTop, fromLeft, fromRight } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide02ObjetoResumen() {
  const [lang, setLang] = useState('es');
  const resumen = lang === 'es' ? D.resumenEs : D.abstractEn;

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-6 relative z-10"
    >
      <${motion.div}
        variants=${fromTop}
        className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
            02 · Especie Vegetal & Síntesis
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Objeto de Estudio: <span className="italic text-mint-300">Sedum praealtum</span>
          </h2>
        </div>

        <${motion.button}
          whileHover=${{ scale: 1.04 }}
          whileTap=${{ scale: 0.96 }}
          onClick=${() => setLang(lang === 'es' ? 'en' : 'es')}
          className="px-4 py-2 rounded-full bg-mint-400 hover:bg-mint-300 text-forest-950 text-xs font-extrabold transition cursor-pointer"
        >
          ${lang === 'es' ? 'View Abstract (EN)' : 'Ver Resumen (ES)'}
        </${motion.button}>
      </${motion.div}>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        <${motion.div}
          variants=${fromLeft}
          className="lg:col-span-5 glass-card rounded-3xl p-6 flex flex-col justify-between shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="assets/flatlay-succulents.jpg"
                alt="Sedum praealtum"
                className="w-20 h-20 rounded-2xl object-cover border border-mint-300/30 shrink-0"
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-mint-300 font-bold">
                  ${D.planta.familia}
                </p>
                <h3 className="text-xl font-extrabold text-white">Siempreviva / Matamatum</h3>
                <p className="text-xs text-white/70 mt-0.5">Origen: ${D.planta.origen}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-mint-300 font-semibold">
                  Altura
                </p>
                <p className="text-sm font-bold mt-0.5">${D.planta.altura}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-mint-300 font-semibold">
                  Naturaleza
                </p>
                <p className="text-sm font-bold mt-0.5">Suculenta adaptada</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-white/85">
              <p>• <strong>Hojas:</strong> ${D.planta.hojas}</p>
              <p>• <strong>Flores:</strong> ${D.planta.flores}</p>
              <p>• <strong>Cultivo local:</strong> ${D.planta.cultivoLocal}</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-2">
              Usos Tradicionales
            </p>
            <div className="flex flex-wrap gap-1.5">
              ${D.planta.usos.map(
                (u) => html`
                  <span
                    key=${u}
                    className="px-2.5 py-1 rounded-full bg-mint-400/15 border border-mint-400/25 text-mint-300 text-xs"
                  >
                    ${u}
                  </span>
                `
              )}
            </div>
          </div>
        </${motion.div}>

        <${motion.div}
          variants=${fromRight}
          className="lg:col-span-7 glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-center"
        >
          <${AnimatePresence} mode="wait">
            <${motion.div}
              key=${lang}
              initial=${{ opacity: 0, y: 12 }}
              animate=${{ opacity: 1, y: 0 }}
              exit=${{ opacity: 0, y: -12 }}
              transition=${{ duration: 0.28 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-mint-300 font-bold text-xs uppercase tracking-widest">
                <${Icon} name=${lang === 'es' ? 'file-text' : 'globe'} className="w-4 h-4" />
                <span>${lang === 'es' ? 'Resumen del Trabajo' : 'English Abstract'}</span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed">${resumen.intro}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-1">
                    ${lang === 'es' ? 'Objetivo' : 'Objective'}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    ${resumen.objetivo}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-1">
                    ${lang === 'es' ? 'Metodología' : 'Methodology'}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    ${resumen.metodologia}
                  </p>
                </div>
              </div>

              <div className="bg-forest-700/40 border border-mint-400/20 rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-mint-300 mb-1">
                  ${lang === 'es' ? 'Conclusión Síntesis' : 'Conclusion'}
                </p>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  ${resumen.conclusion}
                </p>
              </div>
            </${motion.div}>
          </${AnimatePresence}>
        </${motion.div}>
      </div>
    </${motion.div}>
  `;
}
