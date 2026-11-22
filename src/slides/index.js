import { Slide01Portada } from './Slide01Portada.js';
import { Slide02QR } from './Slide02QR.js';
import { Slide02ObjetoResumen } from './Slide02ObjetoResumen.js';
import { Slide03Modelo3D } from './Slide03Modelo3D.js';
import { Slide04Problematica } from './Slide04Problematica.js';
import { Slide05Objetivos } from './Slide05Objetivos.js';
import { Slide06Metodologia } from './Slide06Metodologia.js';
import { Slide07EstructuraTisular } from './Slide07EstructuraTisular.js';
import { Slide08Tinciones } from './Slide08Tinciones.js';
import { Slide09Metabolitos } from './Slide09Metabolitos.js';
import { Slide10Comparativa } from './Slide10Comparativa.js';
import { Slide11Sintesis } from './Slide11Sintesis.js';
import { Slide12Cierre } from './Slide12Cierre.js';

export const SLIDES = [
  { title: '01 · Portada', component: Slide01Portada },
  { title: '02 · Acceso Móvil (Código QR)', component: Slide02QR, badge: 'QR en Grande' },
  { title: '03 · Objeto de Estudio y Resumen', component: Slide02ObjetoResumen },
  { title: '04 · Modelo 3D y Cuidados Básicos', component: Slide03Modelo3D, badge: '3D Interactivo' },
  { title: '05 · Problemática y Justificación', component: Slide04Problematica },
  { title: '06 · Objetivos de la Investigación', component: Slide05Objetivos },
  { title: '07 · Materiales y Métodos', component: Slide06Metodologia },
  { title: '08 · Resultados I: Estructura Tisular', component: Slide07EstructuraTisular },
  { title: '09 · Resultados II: Técnicas de Tinción', component: Slide08Tinciones },
  { title: '10 · Resultados III: Metabolitos', component: Slide09Metabolitos },
  { title: '11 · Enfoque Analítico Comparado', component: Slide10Comparativa },
  { title: '12 · Discusión, Conclusiones y Recomendaciones', component: Slide11Sintesis },
  { title: '13 · Cierre y Constancia de Aprobación', component: Slide12Cierre },
];
