import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import { staggerContainer, fromTop, fromBottom } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

export function Slide10Comparativa() {
  const cols = [
    {
      badge: 'Método Extractivo',
      title: 'Fitoquímica Convencional',
      desc: 'Requiere maceración, molienda y extracción con solventes químicos. Cuantifica los metabolitos presentes, pero destruye la muestra vegetal y pierde por completo la arquitectura celular original.',
      highlight: false,
    },
    {
      badge: 'Localización In Situ',
      title: 'Histoquímica Vegetal',
      desc: 'Aplica reacciones químicas cromogénicas selectivas directamente sobre cortes tisulares intactos. Revela la distribución microscópica espacial exacta de flavonoides, taninos, mucílagos y lípidos.',
      highlight: true,
    },
    {
      badge: 'Valoración Funcional',
      title: 'Relevancia Farmacognóstica',
      desc: 'Vincula la acumulación de metabolitos en parénquima acuífero, haces vasculares y epidermis con las propiedades terapéuticas tradicionales (cicatrizante, emoliente) de la Sedum praealtum.',
      highlight: false,
    },
  ];

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col justify-center gap-7 relative z-10"
    >
      <${motion.div} variants=${fromTop}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
          10 · Integración Metodológica
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
          Histoquímica Vegetal vs. Fitoquímica Convencional
        </h2>
      </${motion.div}>

      <div className="grid md:grid-cols-3 gap-6">
        ${cols.map(
          (c) => html`
            <${motion.div}
              key=${c.title}
              variants=${fromBottom}
              whileHover=${{ y: -8 }}
              className=${`rounded-3xl p-6 space-y-3 ${
                c.highlight ? 'bg-cream text-forest-900 shadow-2xl' : 'glass-card text-white'
              }`}
            >
              <span
                className=${`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  c.highlight
                    ? 'bg-forest-800 text-white'
                    : 'bg-mint-400/15 text-mint-300 border border-mint-400/25'
                }`}
              >
                ${c.badge}
              </span>
              <h3 className="text-xl font-extrabold">${c.title}</h3>
              <p className=${`text-sm leading-relaxed ${c.highlight ? 'text-forest-800' : 'text-white/80'}`}>
                ${c.desc}
              </p>
            </${motion.div}>
          `
        )}
      </div>

      <${motion.div}
        variants=${fromBottom}
        className="glass-card-dark rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm border border-mint-400/25"
      >
        <${Icon} name="shield-check" className="w-5 h-5 text-mint-300 mt-0.5 shrink-0" />
        <p className="text-white/90">
          <strong>Principio fundamental de la Histoquímica Vegetal:</strong> A diferencia de los métodos extractivos que destruyen el tejido, la histoquímica vegetal preserva la muestra y revela el sitio celular preciso de biosíntesis y almacenamiento de los principios activos de la <em>Sedum praealtum</em>.
        </p>
      </${motion.div}>
    </${motion.div}>
  `;
}
