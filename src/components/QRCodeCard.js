import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import QRCode from 'qrcode';
import htm from 'htm';
import { Icon } from './Icon.js';

const html = htm.bind(React.createElement);

export function QRCodeCard() {
  const [url, setUrl] = useState(() => window.location.href);
  const [draftUrl, setDraftUrl] = useState(() => window.location.href);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url || window.location.href, {
      width: 320,
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
    if (draftUrl.trim()) {
      setUrl(draftUrl.trim());
    }
    setEditing(false);
  };

  return html`
    <div className="glass-card-dark rounded-2xl p-3.5 border border-mint-400/25 flex items-center gap-3.5">
      <button
        type="button"
        onClick=${() => setExpanded(true)}
        title="Ampliar QR para escanear en clase"
        className="w-20 h-20 rounded-xl bg-white p-1.5 shrink-0 shadow-md hover:scale-105 transition cursor-pointer overflow-hidden flex items-center justify-center"
      >
        ${qrDataUrl
          ? html`<img src=${qrDataUrl} alt="Código QR de la presentación" className="w-full h-full object-contain" />`
          : html`<span className="text-[10px] text-forest-900 font-bold">QR...</span>`}
      </button>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-mint-300 flex items-center gap-1.5">
            <${Icon} name="qr-code" className="w-3.5 h-3.5" />
            <span>Acceso Móvil (QR)</span>
          </p>
          <button
            type="button"
            onClick=${() => setExpanded(true)}
            className="text-[11px] font-bold text-mint-300 hover:underline cursor-pointer"
          >
            Ampliar
          </button>
        </div>

        <p className="text-xs text-white/80 leading-snug">
          Escanea con tu teléfono para seguir la presentación y explorar el modelo 3D.
        </p>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[10px] text-white/55 truncate max-w-[170px] sm:max-w-[220px]">
            ${url}
          </span>
          <button
            type="button"
            onClick=${() => {
              setDraftUrl(url);
              setEditing((v) => !v);
            }}
            className="text-[10px] font-bold text-mint-300 hover:text-white transition cursor-pointer shrink-0"
          >
            ${editing ? 'Cerrar' : 'Cambiar URL'}
          </button>
        </div>

        ${editing &&
        html`
          <form onSubmit=${handleSaveUrl} className="flex gap-1.5 pt-1">
            <input
              type="text"
              value=${draftUrl}
              onChange=${(e) => setDraftUrl(e.target.value)}
              placeholder="https://tu-sitio.com"
              className="flex-1 min-w-0 px-2.5 py-1 rounded-lg bg-forest-950 border border-mint-400/30 text-xs text-white focus:outline-none focus:border-mint-400"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg bg-mint-400 text-forest-950 text-xs font-extrabold cursor-pointer"
            >
              OK
            </button>
          </form>
        `}
      </div>

      <!-- Fullscreen QR Modal for Classroom Projection -->
      <${AnimatePresence}>
        ${expanded &&
        html`
          <${motion.div}
            initial=${{ opacity: 0 }}
            animate=${{ opacity: 1 }}
            exit=${{ opacity: 0 }}
            onClick=${() => setExpanded(false)}
            className="fixed inset-0 z-[120] bg-forest-950/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <${motion.div}
              initial=${{ scale: 0.88, opacity: 0 }}
              animate=${{ scale: 1, opacity: 1 }}
              exit=${{ scale: 0.88, opacity: 0 }}
              onClick=${(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border border-mint-400/35 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-mint-300">
                  Escanea el QR
                </span>
                <button
                  type="button"
                  onClick=${() => setExpanded(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <${Icon} name="x" className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 mx-auto w-64 h-64 flex items-center justify-center shadow-xl">
                ${qrDataUrl &&
                html`<img src=${qrDataUrl} alt="QR ampliado" className="w-full h-full object-contain" />`}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-extrabold text-white">
                  <em>Sedum praealtum</em> · Presentación 3D
                </p>
                <p className="text-xs text-white/70 break-all">${url}</p>
              </div>
            </${motion.div}>
          </${motion.div}>
        `}
      </${AnimatePresence}>
    </div>
  `;
}
