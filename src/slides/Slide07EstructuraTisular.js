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

export function Slide07EstructuraTisular() {
  const [selectedOrgan, setSelectedOrgan] = useState(D.organos[0].id);
  const current = D.organos.find((o) => o.id === selectedOrgan) || D.organos[0];

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
            07 · Resultados · Objetivo Específico 1
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Estructura Tisular de Órganos Vegetativos
          </h2>
        </div>

        <div className="flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
          ${D.organos.map((org) => {
            const active = org.id === selectedOrgan;
            return html`
              <button
                key=${org.id}
                onClick=${() => setSelectedOrgan(org.id)}
                className=${`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  active ? 'text-forest-950' : 'text-white/80 hover:text-white'
                }`}
              >
                ${active &&
                html`
                  <${motion.span}
                    layoutId="organPill"
                    transition=${{ type: 'spring', stiffness: 320, damping: 26 }}
                    className="absolute inset-0 bg-mint-400 rounded-full -z-10"
                  />
                `}
                ${org.nombre}
              </button>
            `;
          })}
        </div>
      </${motion.div}>

      <div className="grid lg:grid-cols-12 gap-6 items-center">
        <${motion.div} variants=${fromLeft} className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8">
          <${AnimatePresence} mode="wait">
            <${motion.div}
              key=${current.id}
              initial=${{ opacity: 0, x: -20 }}
              animate=${{ opacity: 1, x: 0 }}
              exit=${{ opacity: 0, x: 20 }}
              transition=${{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-mint-300">
                    ${current.rol}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-white mt-0.5">
                    ${current.nombre}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-mint-400/20 border border-mint-400/35 flex items-center justify-center text-mint-300">
                  <${Icon} name=${current.icono} className="w-6 h-6" />
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                ${current.capas.map(
                  (capa, idx) => html`
                    <${motion.li}
                      key=${capa}
                      initial=${{ opacity: 0, y: 10 }}
                      animate=${{ opacity: 1, y: 0 }}
                      transition=${{ delay: idx * 0.06 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-sm text-white/90 flex items-start gap-3"
                    >
                      <span className="text-xs font-extrabold text-mint-300 mt-0.5">
                        0${idx + 1}
                      </span>
                      <span>${capa}</span>
                    </${motion.li}>
                  `
                )}
              </ul>
            </${motion.div}>
          </${AnimatePresence}>
        </${motion.div}>

        <${motion.div} variants=${fromRight} className="lg:col-span-5">
          <${motion.div}
            whileHover=${{ scale: 1.02 }}
            className="glass-card-dark rounded-3xl p-4 space-y-3"
          >
            <img
              src="assets/histology-tissue.jpg"
              alt="Corte transversal histológico de hoja suculenta"
              className="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10"
            />
            <p className="text-xs text-white/75 leading-relaxed px-1">
              La identificación histológica de estos tejidos establece la distribución espacial de los componentes celulares y orienta la localización posterior de metabolitos.
            </p>
          </${motion.div}>
        </${motion.div}>
      </div>
    </${motion.div}>
  `;
}
