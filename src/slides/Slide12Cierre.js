import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import { staggerContainer, popIn, fromBottom } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide12Cierre() {
  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-10 flex flex-col justify-center items-center text-center gap-7 relative z-10"
    >
      <${motion.div}
        variants=${popIn}
        className="bg-white/95 rounded-2xl px-5 py-2.5 shadow-xl"
      >
        <img
          src="https://www.fcs.uc.edu.ve/wp-content/uploads/2026/04/logo-fcs.webp"
          alt="Logo Facultad de Ciencias de la Salud - UC"
          className="h-12 sm:h-14 w-auto object-contain"
        />
      </${motion.div}>

      <${motion.span}
        variants=${popIn}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-400 text-forest-950 text-xs font-extrabold uppercase tracking-widest shadow-lg"
      >
        <${Icon} name="award" className="w-4 h-4" />
        Estatus: ${D.documento.estatus}
      </${motion.span}>

      <${motion.h2}
        variants=${fromBottom}
        className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white"
      >
        ¡Muchas Gracias por su Atención!
      </${motion.h2}>

      <${motion.div}
        variants=${fromBottom}
        className="max-w-3xl mx-auto px-6 py-4 rounded-2xl bg-forest-800/60 border border-mint-400/30 backdrop-blur-md shadow-2xl"
      >
        <p className="text-base sm:text-xl italic text-mint-300 font-light leading-relaxed">
          “Mirar más allá de lo visible es el primer paso para transformar el conocimiento de nuestras plantas en ciencia para el futuro.”
        </p>
      </${motion.div}>

      <${motion.p} variants=${fromBottom} className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
        Jurado evaluador de la ${D.documento.institucion}, ${D.documento.facultad}, ${D.documento.escuela} — ${D.documento.lugarAprobacion}.
      </${motion.p}>

      <${motion.div} variants=${fromBottom} className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-mint-300 font-bold">Autores</p>
          <p className="text-sm font-semibold mt-1 text-white">
            Enyelver Ortiz · Fernando López · Sabrina Sequera
          </p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-mint-300 font-bold">Tutora</p>
          <p className="text-sm font-semibold mt-1 text-white">${D.documento.tutor}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-mint-300 font-bold">Línea</p>
          <p className="text-sm font-semibold mt-1 text-white">${D.documento.linea}</p>
        </div>
      </${motion.div}>

      <${motion.div} variants=${fromBottom} className="flex flex-wrap justify-center gap-2 pt-2">
        ${D.documento.palabrasClave.map(
          (kw) => html`
            <span
              key=${kw}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-mint-300"
            >
              #${kw.replace(/\s+/g, '')}
            </span>
          `
        )}
      </${motion.div}>
    </${motion.div}>
  `;
}
