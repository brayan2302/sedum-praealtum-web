import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import htm from 'htm';
import { staggerContainer, fromTop, fromLeft, fromRight, popIn } from '../motion/variants.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

const DEFAULT_PUBLIC_URL = 'https://extensions-endorsed-merger-ins.trycloudflare.com';

function getInitialQrUrl() {
  if (typeof window === 'undefined') return DEFAULT_PUBLIC_URL;
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
  if (!isLocal && window.location.origin) {
    return window.location.origin + window.location.pathname;
  }
  return DEFAULT_PUBLIC_URL;
}

export function Slide02QR({ onJumpTo3D }) {
  const [url, setUrl] = useState(getInitialQrUrl);
  const [draftUrl, setDraftUrl] = useState(getInitialQrUrl);

  useEffect(() => {
    // If running in production (e.g. on Vercel), automatically update the QR to the current URL
    if (typeof window !== 'undefined') {
      const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
      if (!isLocal) {
        const prodUrl = window.location.origin + window.location.pathname;
        setUrl(prodUrl);
        setDraftUrl(prodUrl);
      }
    }
  }, []);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url || window.location.href, {
      width: 520,
      margin: 2,
      color: {
        dark: '#091E15',
        light: '#FFFFFF',
      },
    })
      .then((data) => {
        if (active) setQrDataUrl(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [url]);

  const handleSaveUrl = (e) => {
    e.preventDefault();
    if (draftUrl.trim()) setUrl(draftUrl.trim());
    setEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return html`
    <${motion.div}
      variants=${staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-10 grid lg:grid-cols-12 gap-8 items-center relative z-10"
    >
      <!-- Left: Giant Scannable QR Sheet -->
      <${motion.div} variants=${popIn} className="lg:col-span-6 flex justify-center">
        <${motion.div}
          whileHover=${{ scale: 1.02 }}
          className="relative glass-card rounded-[2rem] p-5 sm:p-7 border border-[#34d399]/35 shadow-2xl flex flex-col items-center gap-4 w-full max-w-md"
        >
          <div className="bg-white rounded-3xl p-5 sm:p-6 w-full aspect-square max-w-[340px] flex items-center justify-center shadow-inner">
            ${qrDataUrl
              ? html`
                  <img
                    src=${qrDataUrl}
                    alt="Código QR en grande para acceder a la presentación"
                    className="w-full h-full object-contain"
                  />
                `
              : html`<span className="text-sm font-bold text-forest-900">Generando QR...</span>`}
          </div>

          <div className="w-full flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-semibold text-white/75 truncate">${url}</span>
            <button
              type="button"
              onClick=${handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#34d399] text-xs font-bold shrink-0 transition cursor-pointer"
            >
              <${Icon} name=${copied ? 'check' : 'copy'} className="w-3.5 h-3.5" />
              <span>${copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </${motion.div}>
      </${motion.div}>

      <!-- Right: Instructions & Classroom Controls -->
      <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
        <${motion.div} variants=${fromTop}>
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#34d399]/15 border border-[#34d399]/40 text-[#34d399] text-xs font-bold tracking-widest uppercase"
          >
            <${Icon} name="qr-code" className="w-3.5 h-3.5" />
            Acceso Interactivo en Clase
          </span>
        </${motion.div}>

        <${motion.div} variants=${fromRight} className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
            Escanea el <span className="text-[#34d399]">Código QR</span> desde tu teléfono
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Estudiantes y profesores pueden abrir la presentación en modo vertical, revisar las técnicas de tinción e interactuar en vivo con el <strong>modelo 3D de <em>Sedum praealtum</em></strong>.
          </p>
        </${motion.div}>

        <${motion.div} variants=${fromLeft} className="grid sm:grid-cols-3 gap-3">
          <div className="glass-card-dark rounded-2xl p-3.5 space-y-1">
            <span className="text-xs font-extrabold text-[#34d399]">01</span>
            <p className="text-xs font-bold text-white">Abre tu cámara</p>
            <p className="text-[11px] text-white/70">Apunta al código QR en pantalla.</p>
          </div>
          <div className="glass-card-dark rounded-2xl p-3.5 space-y-1">
            <span className="text-xs font-extrabold text-[#34d399]">02</span>
            <p className="text-xs font-bold text-white">Modo Vertical</p>
            <p className="text-[11px] text-white/70">Desliza o activa lectura continua.</p>
          </div>
          <div className="glass-card-dark rounded-2xl p-3.5 space-y-1">
            <span className="text-xs font-extrabold text-[#34d399]">03</span>
            <p className="text-xs font-bold text-white">Explora en 3D</p>
            <p className="text-[11px] text-white/70">Rota la planta y simula sus cuidados.</p>
          </div>
        </${motion.div}>

        <!-- Optional URL Editor for LAN IP or Public Link -->
        <${motion.div} variants=${fromRight} className="space-y-3 pt-1">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick=${() => {
                setDraftUrl(url);
                setEditing((v) => !v);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
            >
              <${Icon} name="link" className="w-3.5 h-3.5 text-[#34d399]" />
              <span>${editing ? 'Cerrar editor' : 'Cambiar enlace del QR'}</span>
            </button>

            <button
              type="button"
              onClick=${onJumpTo3D}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#34d399] hover:bg-mint-300 text-forest-950 text-xs font-extrabold transition cursor-pointer"
            >
              <${Icon} name="box" className="w-3.5 h-3.5" />
              <span>Ir al Modelo 3D</span>
            </button>
          </div>

          ${editing &&
          html`
            <form onSubmit=${handleSaveUrl} className="flex gap-2">
              <input
                type="text"
                value=${draftUrl}
                onChange=${(e) => setDraftUrl(e.target.value)}
                placeholder="https://tu-enlace-publico.com o http://192.168.1.x:5173"
                className="flex-1 min-w-0 px-3.5 py-2 rounded-xl bg-forest-950/90 border border-[#34d399]/40 text-xs text-white focus:outline-none focus:border-[#34d399]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#34d399] text-forest-950 text-xs font-extrabold cursor-pointer"
              >
                Actualizar QR
              </button>
            </form>
          `}
        </${motion.div}>
      </div>
    </${motion.div}>
  `;
}
