export const PRESENTATION_DATA = {
  documento: {
    titulo:
      'Estructura histoquímica de metabolitos y componentes orgánicos de la Sedum praealtum (siempreviva)',
    subtitulo: 'Para la determinación de su composición celular',
    tipo: 'Trabajo de investigación · Estudio monográfico-bibliográfico',
    institucion: 'Universidad de Carabobo',
    facultad: 'Facultad de Ciencias de la Salud',
    escuela: 'Escuela de Ciencias Biomédicas y Tecnológicas',
    carrera: 'T.S.U. Tecnología Histotecnología',
    unidadCurricular: 'Metodología de Investigación en Salud',
    lugarPortada: 'Barbula, 2026',
    lugarAprobacion: 'Naguanagua, 16 de noviembre de 2026',
    estatus: 'APROBADO',
    linea: 'Investigaciones bibliográficas',
    autores: [
      { nombre: 'Enyelver Ortiz', cedula: 'V.-33.265.553' },
      { nombre: 'Fernando López', cedula: 'V.-31.099.930' },
      { nombre: 'Sabrina Sequera', cedula: 'V.-29.681.278' },
    ],
    tutor: 'Prof. Legna Rojas',
    palabrasClave: [
      'Sedum praealtum',
      'Histoquímica',
      'Metabolitos secundarios',
      'Tejidos vegetales',
    ],
  },

  planta: {
    nombreCientifico: 'Sedum praealtum',
    nombresComunes: ['Siempreviva', 'Matamatum'],
    familia: 'Crassulaceae',
    origen: 'Madagascar y la India',
    altura: 'Hasta 1 metro',
    hojas: 'Carnosas; principal reservorio de metabolitos secundarios y compuestos orgánicos.',
    flores:
      'Inflorescencias rojizas, amarillas y verdosas; función reproductiva y acumulación fotoquímica biomédica.',
    cultivoLocal:
      'Huertos caseros, patios y mercados tradicionales de hierbas en Venezuela (ej. Mercado de Maturín).',
    usos: [
      'Afecciones inflamatorias',
      'Afecciones respiratorias',
      'Actividad antioxidante',
      'Propiedades cicatrizantes',
      'Regeneración y proliferación celular',
    ],
  },

  modelo3D: {
    hotspots: [
      {
        id: 'flores',
        label: 'Inflorescencias',
        subtitulo: 'Tonalidades amarillas, rojizas y verdosas',
        detalle:
          'Dispuestas en racimos terminales; cumplen función reproductiva y actúan como sistema de acumulación de sustancias fotoquímicas de interés biomédico.',
        position: [0.35, 2.55, 0.2],
        cameraPos: [2.2, 3.2, 2.8],
        target: [0.1, 2.2, 0],
      },
      {
        id: 'hojas',
        label: 'Hojas Carnosas',
        subtitulo: 'Principal reservorio de metabolitos',
        detalle:
          'Rosetas suculentas con epidermis protegida por cutícula, mesófilo fotosintético y amplio parénquima que almacena agua, mucílagos, flavonoides y taninos.',
        position: [-0.85, 1.55, 0.55],
        cameraPos: [-3.0, 2.2, 2.6],
        target: [-0.35, 1.45, 0.2],
      },
      {
        id: 'tallo',
        label: 'Tallo Suculento',
        subtitulo: 'Sostén, conducción y reserva',
        detalle:
          'Organizado en epidermis, corteza con parénquima cortical de reserva, xilema, floema y médula. Puede alcanzar hasta 1 metro de altura en ejemplares adultos.',
        position: [0.18, 0.72, 0.25],
        cameraPos: [2.4, 1.15, 2.6],
        target: [0, 0.85, 0],
      },
      {
        id: 'sustrato',
        label: 'Raíz y Sustrato',
        subtitulo: 'Regulación hídrica y drenaje',
        detalle:
          'Raíz típica de angiospermas (rizodermis, corteza, endodermis y cilindro vascular) adaptada a suelos drenantes y climas cálidos o templados.',
        position: [0.55, -0.05, 0.55],
        cameraPos: [2.7, 0.85, 3.1],
        target: [0, 0.1, 0],
      },
    ],
    cuidados: [
      {
        id: 'riego',
        titulo: 'Riego Moderado',
        icono: 'droplets',
        frecuencia: 'Cada 7–10 días',
        resumen: 'Espaciado, dejando secar el sustrato entre riegos.',
        detalle:
          'Sus hojas carnosas y mucílagos almacenan agua eficientemente. El exceso de humedad pudre las raíces; riega solo cuando el sustrato esté completamente seco.',
      },
      {
        id: 'luz',
        titulo: 'Luz Solar',
        icono: 'sun',
        frecuencia: '4–6 h diarias',
        resumen: 'Sol directo suave o semisombra muy luminosa.',
        detalle:
          'Una buena iluminación potencia la síntesis de flavonoides, estimula la floración amarillo-rojiza y mantiene las rosetas compactas y vigorosas.',
      },
      {
        id: 'sustrato',
        titulo: 'Sustrato y Clima',
        icono: 'wind',
        frecuencia: '18°C – 30°C',
        resumen: 'Mezcla porosa drenante y buena ventilación.',
        detalle:
          'Requiere sustrato mineral con perlita o arena gruesa para drenaje rápido. Se adapta muy bien a climas cálidos y templados en patios y huertos caseros.',
      },
    ],
  },

  resumenEs: {
    intro:
      'La Sedum praealtum, conocida comúnmente como siempreviva, es una especie suculenta empleada tradicionalmente con fines terapéuticos, existiendo confusión local en cuanto a su nomenclatura y escasos antecedentes que evalúen formalmente su fitoquímica y comportamiento celular.',
    objetivo:
      'Analizar la estructura histoquímica de metabolitos y componentes orgánicos de la Sedum praealtum para la determinación de su composición celular.',
    metodologia:
      'Investigación documental (monográfica-bibliográfica), de tipo descriptivo y diseño bibliográfico no experimental mediante fichaje y matrices de análisis documental.',
    conclusion:
      'Posee una organización tisular adaptada a la reserva hídrica (parénquima abundante y tejidos conductores). La integración de técnicas histológicas e histoquímicas vegetales permite localizar in situ flavonoides, taninos, alcaloides y mucílagos.',
  },

  abstractEn: {
    intro:
      'Sedum praealtum, commonly known as "siempreviva", is a succulent species traditionally used for therapeutic purposes, with local confusion regarding its nomenclature and scarce background formally evaluating its phytochemistry and cellular behavior.',
    objective:
      'To analyze the histochemical structure of metabolites and organic components of Sedum praealtum for the determination of its cellular composition.',
    methodology:
      'Documentary approach (monographic-bibliographic), descriptive type, and non-experimental bibliographic design using card-indexing and analytical matrices.',
    conclusion:
      'Possesses tissue organization adapted to water storage. Integrating histological and plant histochemical techniques identifies in situ spatial distribution of flavonoids, tannins, alkaloids, and mucilage.',
  },

  problematica: [
    {
      titulo: 'Confusión de Nomenclatura Popular',
      icono: 'alert-triangle',
      descripcion:
        'En Venezuela, el término "siempreviva" se emplea indistintamente para especies vegetales distintas basándose en su suculencia o resistencia, no en criterios taxonómicos.',
    },
    {
      titulo: 'Vacío Bibliográfico Nacional',
      icono: 'book-open',
      descripcion:
        'Persiste una notable escasez de antecedentes en Venezuela que integren la fitoquímica y el comportamiento celular de las plantas crasuláceas (matamatum).',
    },
    {
      titulo: 'Brecha en Localización Tisular',
      icono: 'microscope',
      descripcion:
        'Falta precisar la ubicación exacta de alcaloides, flavonoides, taninos y terpenoides en órganos vegetativos para optimizar cosecha y extracción.',
    },
  ],

  objetivos: {
    general:
      'Analizar la estructura histoquímica de metabolitos y componentes orgánicos de la Sedum praealtum para la determinación de su composición celular.',
    especificos: [
      {
        num: '01',
        titulo: 'Estructura Tisular',
        texto:
          'Describir la estructura tisular de los órganos vegetativos de Sedum praealtum observadas mediante técnicas histológicas.',
      },
      {
        num: '02',
        titulo: 'Técnicas de Tinción',
        texto:
          'Recopilar las principales técnicas de tinción histológica para optimizar la visualización y contraste de los componentes celulares de la planta.',
      },
      {
        num: '03',
        titulo: 'Importancia Histoquímica',
        texto:
          'Evaluar la importancia de la histoquímica para la determinación in situ de metabolitos vegetales.',
      },
    ],
  },

  metodologia: {
    naturaleza: 'Investigación documental (monográfica-bibliográfica)',
    tipo: 'Descriptivo',
    diseno: 'Bibliográfico no experimental',
    descriptores: [
      'Sedum praealtum',
      'Histología vegetal',
      'Técnicas de tinción',
      'Histoquímica',
      'Metabolitos secundarios',
      'Crassulaceae',
    ],
    inclusion: [
      'Artículos originales, revisiones y tesis arbitradas sobre anatomía o histología de Sedum praealtum o género Sedum.',
      'Protocolos histoquímicos para detección in situ de alcaloides, fenoles, lípidos y mucílagos.',
      'Textos en Español, Inglés o Portugués.',
    ],
    exclusion:
      'Estudios exclusivamente farmacológicos, etnobotánicos o fitoquímicos extractivos (cromatografía, espectrofotometría) que omitan el abordaje morfoanatómico o histoquímico.',
    tecnicas: [
      'Fichaje bibliográfico y lectura crítica',
      'Subrayado estructural',
      'Matrices de análisis documental',
      'Triangulación teórica cualitativa',
    ],
  },

  organos: [
    {
      id: 'hoja',
      nombre: 'Hoja',
      rol: 'Principal órgano de reserva',
      icono: 'leaf',
      capas: [
        'Epidermis externa protegida por cutícula con estomas que reducen la pérdida hídrica.',
        'Mesófilo diferenciado en tejido fotosintético y de reserva.',
        'Parénquima amplio con células de pared delgada y espacios intercelulares para agua, mucílagos y metabolitos.',
        'Haces vasculares distribuidos para conducir agua, sales minerales y productos del metabolismo.',
      ],
    },
    {
      id: 'tallo',
      nombre: 'Tallo',
      rol: 'Sostén, conducción y almacenamiento',
      icono: 'git-commit-vertical',
      capas: [
        'Organización histológica en epidermis, corteza, tejidos vasculares y médula.',
        'Parénquima cortical especializado en acumular reservas y compuestos orgánicos.',
        'Xilema y floema que transportan agua y nutrientes hacia las hojas y demás órganos.',
      ],
    },
    {
      id: 'raiz',
      nombre: 'Raíz',
      rol: 'Absorción, reserva y regulación hídrica',
      icono: 'sprout',
      capas: [
        'Estructura típica de angiospermas: epidermis (rizodermis), corteza, endodermis, periciclo y cilindro vascular.',
        'Participa activamente en el almacenamiento de reservas y regulación hídrica en suculentas.',
        'Clave para comprender la adaptación de Sedum praealtum a disponibilidad hídrica variable.',
      ],
    },
  ],

  tinciones: [
    {
      nombre: 'Safranina y verde rápido',
      categoria: 'pared',
      fundamento: 'Safranina tiñe paredes lignificadas (rojo); verde rápido tejidos celulósicos (verde).',
      aplicacion: 'Distinguir xilema/fibras vs. parénquima/floema y haces vasculares.',
    },
    {
      nombre: 'Azul de toluidina',
      categoria: 'pared',
      fundamento: 'Diferencia pared celular, núcleos y estructuras poliméricas con alto contraste.',
      aplicacion: 'Arquitectura celular general de plantas suculentas.',
    },
    {
      nombre: 'PAS (Ácido Peryódico de Schiff)',
      categoria: 'polisacaridos',
      fundamento: 'Detecta polisacáridos neutros.',
      aplicacion: 'Especialmente pertinente para tejidos de S. praealtum ricos en mucílagos.',
    },
    {
      nombre: 'Azul de Alcian',
      categoria: 'polisacaridos',
      fundamento: 'Identifica mucopolisacáridos ácidos.',
      aplicacion: 'Evidenciar mucílagos, polisacáridos y sustancias de reserva.',
    },
    {
      nombre: 'Rojo de Ruthenio',
      categoria: 'polisacaridos',
      fundamento: 'Coloración específica para mucílagos y polisacáridos.',
      aplicacion: 'Confirmación selectiva de mucílagos en parénquima.',
    },
    {
      nombre: 'Lugol',
      categoria: 'reservas',
      fundamento: 'Colorante específico para almidón.',
      aplicacion: 'Identificación de gránulos de almidón de reserva.',
    },
    {
      nombre: 'Sudan III o Sudan IV',
      categoria: 'reservas',
      fundamento: 'Colorantes lipofílicos para lípidos.',
      aplicacion: 'Localización de lípidos y cutícula.',
    },
  ],

  procesamientoPasos: [
    'Fijación',
    'Deshidratación',
    'Inclusión en parafina',
    'Cortes finos',
    'Desparafinado',
    'Hidratación',
    'Tinción',
    'Montaje permanente',
  ],

  metabolitos: [
    {
      nombre: 'Mucílagos',
      tipo: 'Polisacáridos hidrófilos',
      deteccion: 'PAS, Azul de Alcian y Rojo de Ruthenio.',
      funcion: 'Retención de agua, protección tisular y tolerancia al estrés hídrico.',
    },
    {
      nombre: 'Flavonoides',
      tipo: 'Metabolitos secundarios',
      deteccion: 'Reacciones cromáticas con reactivos fenólicos y sales metálicas in situ.',
      funcion: 'Actividad antioxidante, antiinflamatoria y fotoprotección en vacuolas e idioblastos.',
    },
    {
      nombre: 'Taninos',
      tipo: 'Compuestos polifenólicos',
      deteccion: 'Alta reactividad con sales metálicas en vacuolas, idioblastos o tricomas.',
      funcion: 'Defensa química vegetal y propiedades astringentes/cicatrizantes.',
    },
    {
      nombre: 'Alcaloides',
      tipo: 'Compuestos nitrogenados',
      deteccion: 'Reactivos que generan precipitados o cambios de color característicos.',
      funcion: 'Mecanismos de defensa y actividad farmacológica.',
    },
    {
      nombre: 'Terpenoides y Saponinas',
      tipo: 'Metabolitos bioactivos',
      deteccion: 'Reacciones colorimétricas histoquímicas específicas.',
      funcion: 'Protección frente a patógenos y potencial terapéutico.',
    },
    {
      nombre: 'Oxalato de Calcio',
      tipo: 'Inclusiones cristalinas',
      deteccion: 'Observación microscópica y pruebas histoquímicas.',
      funcion: 'Regulación osmótica, neutralización de metales pesados y defensa contra herbivoría.',
    },
    {
      nombre: 'Lípidos, Almidón y Proteínas',
      tipo: 'Componentes de reserva',
      deteccion: 'Sudan III/IV, Lugol y reactivos proteicos.',
      funcion: 'Disponibilidad energética vinculada a la síntesis de metabolitos complejos.',
    },
  ],

  conclusiones: [
    'La Sedum praealtum presenta una estructura tisular adaptada a la reserva de agua, con parénquima abundante y tejidos conductores especializados.',
    'Las técnicas de tinción histológica diferencian paredes celulares, tejidos vasculares, parénquima y reservas en hoja, tallo y raíz.',
    'La histoquímica permite localizar in situ flavonoides, taninos, alcaloides, mucílagos, lípidos y compuestos fenólicos sin destruir la muestra.',
    'Identificar la distribución espacial de estos metabolitos explica sus funciones defensivas, adaptativas y propiedades terapéuticas.',
    'La integración de histología y técnicas histoquímicas vegetales ofrece el abordaje más completo para caracterizar S. praealtum in situ.',
    'Persiste una limitada cantidad de investigaciones específicas en Venezuela, lo que evidencia la necesidad de ampliar los estudios experimentales.',
  ],

  discusion: [
    'La hoja es el órgano con mayor relevancia histoquímica al concentrar flavonoides, taninos y mucílagos asociados a efectos antiinflamatorios y cicatrizantes.',
    'Gran parte de la evidencia proviene de especies afines de Sedum o Crassulaceae; los hallazgos deben validarse localmente sin extrapolación absoluta.',
    'Identificar zonas de acumulación orienta una cosecha selectiva de hojas sin afectar innecesariamente tallo o raíz.',
    'Una fijación formalcohólica óptima es determinante para preservar la arquitectura tisular y garantizar la reactividad histoquímica vegetal.',
  ],

  recomendaciones: [
    {
      num: '01',
      titulo: 'Estandarizar Fijación',
      texto: 'Estandarizar los protocolos de fijación formalcohólica para conservar la morfología celular y la reactividad de los metabolitos vegetales.',
    },
    {
      num: '02',
      titulo: 'Estudios en Fresco',
      texto: 'Realizar estudios histológicos experimentales en muestras frescas para validar científicamente sus aplicaciones.',
    },
    {
      num: '03',
      titulo: 'Investigación Nacional',
      texto: 'Ampliar los estudios específicos sobre Sedum praealtum en el contexto científico venezolano.',
    },
  ],
};
