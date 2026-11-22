import React, { useEffect, useRef } from 'react';
import { createIcons, icons } from 'lucide';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function Icon({ name, className = 'w-4 h-4' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      try {
        createIcons({
          icons,
          nameAttr: 'data-lucide',
          attrs: { class: className },
          root: ref.current.parentElement || document.body,
        });
      } catch {
        // fallback
      }
    }
  });

  return html`<i ref=${ref} data-lucide=${name} className=${className}></i>`;
}
