import React from 'react';
import { motion } from 'framer-motion';
import htm from 'htm';
import GradientWaves from './GradientWaves.js';

const html = htm.bind(React.createElement);

export function AmbientBackdrop({ variant = 'hero' }) {
  return html`
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <!-- ReactBits-style WebGL GradientWaves with exact requested parameters -->
      <div className="absolute inset-0">
        <${GradientWaves}
          waveColor="#34d399"
          amplitude=${2.6}
          swell=${38}
          lightAngle=${170}
          speed=${0.35}
        />
      </div>

      <!-- Subtle dark botanical foliage texture blended over the waves -->
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-lighten transition-opacity duration-700"
        style=${{ backgroundImage: `url('assets/dark-foliage.jpg')` }}
      ></div>

      <div
        className=${`absolute inset-0 opacity-75 ${
          variant === 'left' ? 'botanical-glow-left' : 'botanical-glow'
        }`}
      ></div>

      <${motion.div}
        animate=${{ y: [0, -18, 0], x: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition=${{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#34d399]/10 blur-3xl"
      />
      <${motion.div}
        animate=${{ y: [0, 16, 0], x: [0, -12, 0] }}
        transition=${{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-forest-600/20 blur-3xl"
      />
    </div>
  `;
}
