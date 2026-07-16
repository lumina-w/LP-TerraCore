export interface Plan {
  name: string;
  target: string;
  features: string[];
  highlight: boolean;
  ctaText: string;
  ctaEvent: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const PLANS: Plan[] = [
  {
    name: 'Semilla',
    target: 'Para fincas que quieren dejar de operar a ciegas.',
    features: [
      '1 sede · 5 usuarios',
      'Gestión de Animales (CRUD + estado de salud)',
      'Salud Animal (vacunas + alertas próximas 30 días)',
      'Producción (lotes + eventos)',
      'Inventario (insumos + alertas de stock)',
      'Dashboard (4 KPI principales)',
    ],
    highlight: false,
    ctaText: 'Comenzar trial gratis',
    ctaEvent: 'click_cta_plans_semilla',
  },
  {
    name: 'Profesional',
    target: 'Para operaciones que necesitan saber qué genera y qué cuesta cada área.',
    features: [
      'Todo lo de Semilla',
      '3 sedes · 15 usuarios',
      'Gestión de Herramientas (mantenimiento)',
      'Costos automáticos por lote (rentabilidad)',
      'Proveedores y Compras',
      'Dashboard avanzado (comparativos, tendencias)',
      'Importación CSV en bulk',
      'Soporte WhatsApp + videollamada ≤4 h',
    ],
    highlight: true,
    ctaText: 'Quiero saber más',
    ctaEvent: 'click_cta_plans_pro',
  },
  {
    name: 'Enterprise',
    target: 'Para grupos empresariales y cooperativas.',
    features: [
      'Todo lo de Profesional',
      'Sedes y usuarios ilimitados',
      'Vista consolidada multifinca',
      'Trazabilidad GlobalG.A.P.',
      'Logística y despachos',
      'API para integraciones',
      'Reportes gerenciales',
      'SLA prioritario ≤2 h + 99.9 %',
    ],
    highlight: false,
    ctaText: 'Quiero saber más',
    ctaEvent: 'click_cta_plans_enterprise',
  },
];

export interface Problem {
  icon: string;
  title: string;
  desc: string;
}

export const PROBLEMS: Problem[] = [
  {
    icon: 'file-spreadsheet',
    title: 'Datos dispersos',
    desc: 'Información en Excel, WhatsApp y cuadernos. Sin una sola fuente de verdad.',
  },
  {
    icon: 'eye-off',
    title: 'Sin visibilidad en tiempo real',
    desc: 'No sabes el estado de salud animal ni de inventario hasta que ya es tarde.',
  },
  {
    icon: 'trending-down',
    title: 'Decisiones a ciegas',
    desc: 'Sin datos de rentabilidad por lote, cultivo o mes, no puedes optimizar.',
  },
  {
    icon: 'alert-triangle',
    title: 'Personal apagando incendios',
    desc: 'Tu equipo gestiona crisis en lugar de enfocarse en producir y crecer.',
  },
];

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: 'layout-dashboard',
    title: 'Dashboard centralizado',
    description:
      'Toda tu operación en una pantalla: inventario, personal, lotes y finanzas. Sin abrir diez hojas de cálculo.',
  },
  {
    icon: 'bell-ring',
    title: 'Alertas en tiempo real',
    description:
      'Recibe notificaciones antes de que los problemas escalen. Actúa sobre datos, no sobre rumores.',
  },
  {
    icon: 'shield-check',
    title: 'Control total de operación',
    description:
      'Toma decisiones basadas en rentabilidad real. Por lote, por mes, por cultivo. Sin adivinar.',
  },
];

// Single source of truth for the FAQ: rendered by FAQSection.astro (visible
// accordion) and by index.astro (FAQPage JSON-LD schema). Keep visible copy and
// schema in sync by editing here only.
export const FAQ: FaqItem[] = [
  {
    q: '¿Cuánto tiempo toma implementar TerraCore?',
    a: 'Depende del plan. En Semilla arrancas en 24 horas: importas tu inventario desde Excel, defines usuarios y empiezas a registrar. En Profesional toma de 3 a 5 días, con sesiones de onboarding y migración de tus historiales. En Enterprise el despliegue es personalizado según el número de sedes e integraciones que necesites.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Desde $2.5M COP/mes según el tamaño de tu operación. El precio definitivo se confirma en una llamada, cuando conocemos tu número de sedes, usuarios y módulos. Pago mensual, sin permanencia forzada.',
  },
  {
    q: '¿Qué diferencia hay entre los planes?',
    a: 'Semilla (1 sede, 5 usuarios) cubre animales, salud, producción, inventario y dashboard básico. Profesional (3 sedes, 15 usuarios) suma herramientas, costos y rentabilidad por lote, proveedores, dashboard avanzado, importación CSV y soporte prioritario. Enterprise añade sedes y usuarios ilimitados, vista consolidada multifinca, trazabilidad GlobalG.A.P., API y SLA prioritario. El detalle completo está en la sección de Planes.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. Sin penalidades ni letras pequeñas: solo avísanos con 30 días de anticipación y te entregamos toda tu información antes de cerrar la cuenta.',
  },
  {
    q: '¿Funciona si en mi finca no hay buena señal?',
    a: 'Sí. La app web guarda todo lo que registres sin internet y sincroniza cuando vuelva la señal. El dashboard web requiere conexión, pero los registros del campo nunca se pierden.',
  },
  {
    q: '¿Puedo migrar desde Excel?',
    a: 'Sí. Tenemos plantillas de importación para animales, insumos, herramientas e historiales sanitarios. La migración está incluida en planes Profesional y Enterprise. En Semilla te damos las plantillas y lo haces tú mismo.',
  },
  {
    q: '¿Qué tipos de finca soporta?',
    a: 'Si produces en ella, TerraCore lo registra. Bovino (carne y leche), porcino, equino, ovino, caprino, avícola y cultivos asociados como plátano, cacao y maíz. Si tu operación combina ganadería y cultivos, mejor: animales, lotes, insumos compartidos y herramientas quedan en la misma cuenta.',
  },
  {
    q: '¿Tiene aplicación móvil?',
    a: 'TerraCore es una PWA (Progressive Web App) optimizada para mobile. La instalas desde el navegador en Android o iOS, sin pasar por el App Store. Funciona offline, con botones grandes y captura rápida pensada para usarla en el campo.',
  },
  {
    q: '¿Cómo adoptan TerraCore los operarios de campo?',
    a: 'La app está pensada para usarse con guantes y en condiciones de campo: botones grandes, flujo rápido, sin jerga técnica. Los operarios aprenden a registrar en minutos. Si tienes equipo con poca experiencia tecnológica, te acompañamos en el proceso de adopción.',
  },
  {
    q: '¿TerraCore usa mis datos para entrenar modelos de IA?',
    a: 'No. Tu información no se usa para publicidad, no se comparte con terceros y no entrena ningún modelo de inteligencia artificial. Trabajamos bajo la Ley 1581 de 2012. Tus datos son tuyos, y punto.',
  },
  {
    q: '¿Qué pasa con mis datos si dejo de usar TerraCore?',
    a: 'Te entregamos un export completo en CSV en máximo 48 horas y borramos tu información de nuestros servidores. Sin trampas, sin "datos rehén".',
  },
  {
    q: '¿El soporte es en español?',
    a: 'Sí. Nuestro equipo está en Colombia y entiende el contexto agroindustrial local.',
  },
  {
    q: '¿De dónde viene la cifra del 42%?',
    a: 'Del piloto con fincas reales. Al centralizar registros, alertas y reportes en TerraCore, los administradores redujeron casi a la mitad el tiempo dedicado a tareas administrativas. Es el promedio de esas operaciones, no una promesa: tu mejora depende de cómo esté hoy tu finca.',
  },
];
