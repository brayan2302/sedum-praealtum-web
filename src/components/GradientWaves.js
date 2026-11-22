import React, { useEffect, useRef } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

function hexToRgbNorm(hex) {
  const clean = (hex || '#34d399').replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const VERT_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_res;
  uniform vec3 u_waveColor;
  uniform float u_amplitude;
  uniform float u_swell;
  uniform float u_lightAngle;

  // Smooth procedural layered waves with directional specular sheen
  float waveHeight(vec2 p, float t) {
    float freq = max(0.8, u_swell * 0.085);
    float amp = u_amplitude * 0.12;
    float h = 0.0;
    h += sin(p.x * freq + t * 1.1 + sin(p.y * 1.6 + t * 0.7)) * amp;
    h += cos(p.y * freq * 0.85 - t * 0.85 + p.x * 1.3) * amp * 0.65;
    h += sin((p.x - p.y) * freq * 1.35 + t * 1.45) * amp * 0.4;
    h += cos((p.x + p.y * 1.4) * freq * 0.6 - t * 0.6) * amp * 0.55;
    return h;
  }

  void main() {
    vec2 aspect = vec2(u_res.x / max(u_res.y, 1.0), 1.0);
    vec2 p = (v_uv - 0.5) * aspect * 2.2;

    float eps = 0.015;
    float h = waveHeight(p, u_time);
    float hx = waveHeight(p + vec2(eps, 0.0), u_time);
    float hy = waveHeight(p + vec2(0.0, eps), u_time);

    vec3 normal = normalize(vec3((h - hx) / eps, (h - hy) / eps, 1.35));

    float rad = radians(u_lightAngle);
    vec3 lightDir = normalize(vec3(cos(rad), sin(rad), 0.72));

    float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(normal, halfVec), 0.0), 22.0);

    vec3 deepBg = vec3(0.028, 0.092, 0.064);     // #071710 deep forest
    vec3 midForest = vec3(0.065, 0.195, 0.140);  // #113224 botanical emerald
    vec3 highlight = mix(midForest, u_waveColor, 0.72);

    float ridge = smoothstep(-0.35, 0.55, h);
    vec3 col = mix(deepBg, midForest, ridge * 0.85 + diff * 0.25);
    col = mix(col, highlight, pow(diff, 1.65) * 0.62);
    col += u_waveColor * spec * 0.42;

    // Soft vignette toward edges
    float dist = length(v_uv - 0.5);
    col *= smoothstep(0.95, 0.22, dist * 0.92);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function GradientWaves({
  waveColor = '#34d399',
  amplitude = 2.6,
  swell = 38,
  lightAngle = 170,
  speed = 0.35,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vert = compile(gl.VERTEX_SHADER, VERT_SRC);
    const frag = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uWaveColor = gl.getUniformLocation(program, 'u_waveColor');
    const uAmplitude = gl.getUniformLocation(program, 'u_amplitude');
    const uSwell = gl.getUniformLocation(program, 'u_swell');
    const uLightAngle = gl.getUniformLocation(program, 'u_lightAngle');

    const rgb = hexToRgbNorm(waveColor);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    let rafId = 0;
    const start = performance.now();

    function render(now) {
      rafId = requestAnimationFrame(render);
      const elapsed = ((now - start) / 1000) * speed;

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3f(uWaveColor, rgb[0], rgb[1], rgb[2]);
      gl.uniform1f(uAmplitude, amplitude);
      gl.uniform1f(uSwell, swell);
      gl.uniform1f(uLightAngle, lightAngle);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [waveColor, amplitude, swell, lightAngle, speed]);

  return html`
    <canvas
      ref=${canvasRef}
      className=${`w-full h-full block ${className}`}
      aria-hidden="true"
    />
  `;
}
