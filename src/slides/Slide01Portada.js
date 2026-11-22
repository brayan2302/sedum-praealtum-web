import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import htm from 'htm';
import { PRESENTATION_DATA as D } from '../data/presentationData.js';
import {
  staggerContainer,
  fromTop,
  fromLeft,
  fromRight,
  fromBottom,
} from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide01Portada({ onJumpTo3D, onJumpToQR }) {
  const [inspectCloche, setInspectCloche] = useState(false);

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10"
    >
      <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
        <${motion.div} variants=${fromTop} className="flex flex-wrap items-center gap-3">
          <div className="bg-white/95 rounded-2xl px-3 py-1.5 shadow-md flex items-center gap-2.5">
            <img
              src="https://www.fcs.uc.edu.ve/wp-content/uploads/2026/04/logo-fcs.webp"
              alt="Logo Facultad de Ciencias de la Salud - UC"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <span
            className="px-3.5 py-1 rounded-full bg-[#34d399]/15 border border-[#34d399]/40 text-[#34d399] text-xs font-bold tracking-widest uppercase"
          >
            01 · Trabajo de Investigación
          </span>
          <span
            className="px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-white/85 text-xs font-semibold"
          >
            ${D.documento.carrera}
          </span>
        </${motion.div}>

        <div className="space-y-3">
          <${motion.p}
            variants=${fromLeft}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#34d399]"
          >
            ${D.documento.institucion} · ${D.documento.facultad}
          </${motion.p}>

          <${motion.h1}
            variants=${fromLeft}
            className="font-display text-2xl sm:text-4xl lg:text-[2.7rem] font-bold leading-[1.12] tracking-tight text-white"
          >
            Estructura histoquímica de metabolitos y componentes orgánicos de la${' '}
            <span className="text-[#34d399] italic">Sedum praealtum</span> (siempreviva)
          </${motion.h1}>

          <${motion.p}
            variants=${fromLeft}
            className="text-sm sm:text-base text-white/75 font-medium max-w-2xl"
          >
            ${D.documento.subtitulo} · Estudio monográfico-bibliográfico
          </${motion.p}>
        </div>

        <${motion.div} variants=${fromLeft} className="flex flex-wrap gap-3">
          <${motion.button}
            whileHover=${{ scale: 1.04 }}
            whileTap=${{ scale: 0.96 }}
            onClick=${onJumpTo3D}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34d399] hover:bg-mint-300 text-forest-950 text-xs sm:text-sm font-extrabold shadow-lg transition cursor-pointer"
          >
            <${Icon} name="box" className="w-4 h-4" />
            <span>Explorar Sedum praealtum en 3D</span>
          </${motion.button}>

          <${motion.button}
            whileHover=${{ scale: 1.04 }}
            whileTap=${{ scale: 0.96 }}
            onClick=${onJumpToQR}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#34d399]/35 text-white text-xs sm:text-sm font-bold shadow-lg transition cursor-pointer"
          >
            <${Icon} name="qr-code" className="w-4 h-4 text-[#34d399]" />
            <span>Ver QR en Grande</span>
          </${motion.button}>
        </${motion.div}>

        <${motion.div} variants=${fromBottom} className="grid sm:grid-cols-2 gap-3.5">
          <${motion.div}
            whileHover=${{ y: -3, borderColor: 'rgba(52, 211, 153, 0.45)' }}
            className="glass-card rounded-2xl p-4 transition-colors"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#34d399] mb-2">
              Autores
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-white">
              ${D.documento.autores.map(
                (a) => html`
                  <li key=${a.cedula} className="flex items-center justify-between gap-2">
                    <span>${a.nombre}</span>
                    <span className="text-[11px] font-normal text-white/60">${a.cedula}</span>
                  </li>
                `
              )}
            </ul>
          </${motion.div}>

          <${motion.div}
            whileHover=${{ y: -3, borderColor: 'rgba(52, 211, 153, 0.45)' }}
            className="glass-card-dark rounded-2xl p-4 flex flex-col justify-between transition-colors"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#34d399] mb-1">
                Tutor Académico
              </p>
              <p className="text-sm sm:text-base font-bold text-white">${D.documento.tutor}</p>
              <p className="text-xs text-white/65 mt-1">${D.documento.escuela}</p>
            </div>
            <div className="pt-2.5 mt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-1 text-[11px] text-white/75">
              <span>${D.documento.unidadCurricular}</span>
              <span className="font-bold text-[#34d399]">${D.documento.lugarPortada}</span>
            </div>
          </${motion.div}>
        </${motion.div}>
      </div>

      <${motion.div} variants=${fromRight} className="lg:col-span-5 relative flex justify-center">
        <${motion.div}
          animate=${{ y: [0, -8, 0] }}
          transition=${{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover=${{ scale: 1.02 }}
          onClick=${() => setInspectCloche(!inspectCloche)}
          className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden glass-card p-3 cursor-pointer shadow-2xl group"
        >
          <div className="aspect-[4/4.2] rounded-2xl overflow-hidden relative bg-forest-950">
            <img
              src="assets/cloche-sedum.jpg"
              alt="Sedum praealtum en campana de cristal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-3 left-3 right-3 glass-card-dark rounded-xl p-3.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#34d399]">
                  Familia ${D.planta.familia}
                </p>
                <p className="text-sm font-bold text-white">
                  <em>Sedum praealtum</em> · Siempreviva
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#34d399] text-forest-950 text-xs font-extrabold shrink-0">
                ${inspectCloche ? 'Ocultar' : 'Ficha'}
              </span>
            </div>
          </div>

          <${AnimatePresence}>
            ${inspectCloche &&
            html`
              <${motion.div}
                initial=${{ opacity: 0, height: 0 }}
                animate=${{ opacity: 1, height: 'auto' }}
                exit=${{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 px-2 pb-1 text-xs text-white/85 space-y-1">
                  <p>• <strong>Origen:</strong> ${D.planta.origen}</p>
                  <p>• <strong>Altura:</strong> ${D.planta.altura}</p>
                  <p>• <strong>Reserva:</strong> ${D.planta.hojas}</p>
                </div>
              </${motion.div}>
            `}
          </${AnimatePresence}>
        </${motion.div}>
      </${motion.div}>
    </${motion.div}>
  `;
}
