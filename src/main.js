import React from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';
import { App } from './App.js';

console.log('MAIN.JS EXECUTING', document.getElementById('root'));

try {
  const html = htm.bind(React.createElement);
  const container = document.getElementById('root');
  if (!container) throw new Error('#root container not found in DOM');
  const root = createRoot(container);
  root.render(html`<${App} />`);
  console.log('RENDER CALLED SUCCESSFULLY');
} catch (err) {
  console.error('RENDER ERROR:', err);
  const errDiv = document.createElement('div');
  errDiv.style =
    'position:fixed;top:0;left:0;right:0;background:#dc2626;color:white;padding:24px;z-index:999999;font-family:monospace;white-space:pre-wrap;font-size:16px;';
  errDiv.textContent = 'RENDER ERROR:\n' + (err.stack || err.message);
  document.body.appendChild(errDiv);
}
