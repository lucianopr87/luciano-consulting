export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

// Section anchors are shared by both locales so links like /#contact and
// /en/#contact (used in blog post CTAs) keep working.
export const sectionIds = {
  home: 'top',
  profile: 'profile',
  experience: 'experience',
  skills: 'skills',
  education: 'education',
  blog: 'blog',
  booking: 'booking',
  contact: 'contact',
} as const;
export type SectionKey = keyof typeof sectionIds;

export const contactDetails = {
  email: 'lucianopr87@gmail.com',
  linkedinHandle: 'luciano-perez-ruiz',
  linkedinUrl: 'https://www.linkedin.com/in/luciano-perez-ruiz',
};

export interface ExperienceEntry {
  years: string;
  company: string;
  role: string;
  description: string;
  link?: { label: string; href: string };
  highlights?: { year: string; text: string }[];
}

export interface SiteContent {
  /** Downloadable CV, one PDF per locale. */
  cvPdf: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    items: Record<SectionKey, string>;
    menu: string;
    close: string;
    bookShort: string;
    directContact: string;
    downloadCv: string;
    otherLanguage: string;
    languageSwitch: string;
  };
  hero: {
    status: string;
    firstName: string;
    lastName: string;
    lead: string;
    ctaBook: string;
    ctaCv: string;
    photoAlt: string;
    /** Link to the other version of the CV (PM ↔ developer). */
    crossLink: { label: string; href: string };
  };
  profile: {
    label: string;
    lead: string;
    body: string;
  };
  experience: {
    label: string;
    heading: string;
    items: ExperienceEntry[];
  };
  skills: {
    label: string;
    groups: { title: string; items: string[] }[];
  };
  education: {
    label: string;
    items: { name: string; org: string; year: string }[];
    languagesHeading: string;
    languages: { name: string; level: string }[];
  };
  blogTeaser: {
    label: string;
    heading: string;
    viewAll: string;
    readMore: string;
  };
  booking: {
    label: string;
    heading: string;
    intro: string;
    bullets: string[];
    stepDay: string;
    stepTime: string;
    stepDetails: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    topicPlaceholder: string;
    selectPrompt: string;
    timeSuffix: string;
    submit: string;
    successTitle: string;
    /** Placeholders: {name}, {date}, {time}, {email} */
    successSummary: string;
    meetLinkLabel: string;
    reset: string;
    noSlots: string;
    loadError: string;
    formError: string;
    slotTakenError: string;
    rateLimitedError: string;
    invalidSlotError: string;
  };
  contact: {
    label: string;
    heading: string;
    intro: string;
    emailLabel: string;
    linkedinLabel: string;
    formName: string;
    formEmail: string;
    reasonsLabel: string;
    reasons: string[];
    formMessage: string;
    formSubmit: string;
    successTitle: string;
    successBody: string;
    reset: string;
    formError: string;
  };
  footer: {
    role: string;
    backToTop: string;
    privacyLink: string;
  };
  cookieConsent: {
    message: string;
    policyLinkText: string;
    dismissLabel: string;
  };
  privacy: {
    heading: string;
    intro: string;
    sections: { heading: string; body: string }[];
  };
  blog: {
    heading: string;
    intro: string;
    backLink: string;
    emptyState: string;
    byline: string;
    /** Attribution note on republished posts, before the link to the original site. */
    republishedPrefix: string;
    months: string[];
  };
}

export const content: Record<Locale, SiteContent> = {
  es: {
    cvPdf: '/Luciano_Perez_Ruiz_CV_ES.pdf',
    meta: {
      title: 'Luciano Perez Ruiz — IT / Technical Project Manager',
      description:
        'IT / Technical Project Manager y Product Owner con más de 10 años en Mercado Libre y startups. Empecé escribiendo código: hoy lidero equipos de desarrolladores y agentes de IA y convierto iniciativas complejas en productos lanzados.',
    },
    nav: {
      items: {
        home: 'Inicio',
        profile: 'Perfil',
        experience: 'Experiencia',
        skills: 'Habilidades',
        education: 'Formación',
        blog: 'Blog',
        booking: 'Reservar reunión',
        contact: 'Contacto',
      },
      menu: 'Menú',
      close: 'Cerrar',
      bookShort: 'Reservar',
      directContact: 'CONTACTO DIRECTO',
      downloadCv: 'Descargar CV (PDF) ↓',
      otherLanguage: 'English',
      languageSwitch: 'Idioma',
    },
    hero: {
      status: 'DISPONIBLE PARA ROLES REMOTOS · SANTA FE, ARGENTINA',
      firstName: 'Luciano',
      lastName: 'Perez Ruiz',
      lead: 'IT / Technical Project Manager y Product Owner. Más de 10 años convirtiendo iniciativas complejas en productos lanzados — con la mirada de alguien que empezó escribiendo código, y hoy con equipos que suman agentes de IA.',
      ctaBook: 'Reservar una reunión',
      ctaCv: 'Descargar CV (PDF) ↓',
      photoAlt: 'Luciano Perez Ruiz',
      crossLink: { label: '¿Buscás un desarrollador? Ver mi perfil full-stack →', href: '/developer/' },
    },
    profile: {
      label: '01 — PERFIL',
      lead: 'Hablo “negocio” e “ingeniería” con la misma fluidez. Lideré equipos de hasta 8 personas en Mercado Libre y startups, desde e‑commerce construidos desde cero hasta iniciativas que requerían alinear a múltiples unidades de negocio.',
      body: 'Empecé como desarrollador full‑stack, así que no solo gestiono roadmaps: entiendo qué es realmente difícil al construir software. Trabajo con Agile, Scrum, Kanban y esquemas híbridos. Mejoré métricas operativas clave un 30% en un solo trimestre con rediseño de procesos basado en datos, y entregué en tiempo y alcance la plataforma Adobe Commerce de un retailer líder del mercado. Hoy llevo proyectos de cliente y un producto propio en producción, y diseño la forma de trabajo de equipos donde desarrolladores y agentes de IA construyen juntos, con reglas, revisiones y CI compartidas.',
    },
    experience: {
      label: '02 — EXPERIENCIA',
      heading: 'De developer a líder de proyectos IT.',
      items: [
        {
          years: '2026 — Hoy',
          company: 'pipacode.studio',
          role: 'Cofundador · IT Project Manager',
          description:
            'Estudio de desarrollo de software, automatización y consultoría. Llevo la parte de producto y entrega: discovery con el cliente, propuestas por etapas, roadmap y coordinación de un equipo de desarrolladores y agentes de IA (Claude Code). También busco y califico clientes nuevos.',
          link: { label: 'pipacode.studio ↗', href: 'https://pipacode.studio' },
          highlights: [
            {
              year: '2026',
              text: 'Carn.AR: PM del MVP de un marketplace de carne para una cadena de carnicerías con 4 sucursales. Plan de 12 semanas en 6 etapas con un hito de cobro por etapa, backlog de más de 70 tareas en GitHub Projects, ADRs, actas y un registro de dudas y supuestos con el cliente. Coordino a 2 desarrolladores full‑stack y me ocupo del repo, la infraestructura (Docker, CI/CD, Sentry) y el panel de admin (NestJS, Next.js, PostgreSQL/PostGIS).',
            },
            {
              year: '2026',
              text: 'Armé la forma de trabajo del equipo con IA: reglas compartidas para los agentes de cada desarrollador, skills de análisis funcional y de planificación antes de codear, un resumen automático de novedades al empezar cada sesión, Conventional Commits, PRs chicos con review cruzada y CI obligatorio para mergear.',
            },
          ],
        },
        {
          years: '2026 — Hoy',
          company: 'Tino · proyecto propio',
          role: 'Fundador · Product Owner',
          description:
            'App de estudio con repetición espaciada para estudiantes de Abogacía (UNL) y cursos de habilitación (ANAC, CNV). La llevo solo de punta a punta: producto, diseño, desarrollo con agentes de IA, contenido y salida al mercado.',
          link: { label: 'estudiantino.com.ar ↗', href: 'https://estudiantino.com.ar' },
          highlights: [
            {
              year: '2026',
              text: 'De la idea a producción en unos 2 meses: app web instalable (PWA), panel de administración con reportes, cobros con Mercado Pago (pago único y suscripción mensual) y landing con una página por materia para SEO. Hoy en etapa de validación comercial con estudiantes.',
            },
            {
              year: '2026',
              text: 'Proceso propio para convertir manuales en bancos de preguntas: extracción con OCR y generación con IA, siempre con revisión humana.',
            },
          ],
        },
        {
          years: '2024 — 2025',
          company: 'IURCO',
          role: 'IT Project Manager',
          description:
            'Gestión simultánea de múltiples proyectos de software factory, desde la planificación inicial hasta la entrega final. Coordinación con product owners y stakeholders para definir alcance, alinear procesos y documentación, con feedback continuo y mejora de procesos.',
          highlights: [
            {
              year: '2025',
              text: 'Planificación, ejecución y entrega end‑to‑end de una plataforma Adobe Commerce de gran escala, desde cero, para un retailer líder de electrónica en Argentina. Equipo de 6 devs con Scrum y Jira, integraciones con SAP y Google BigQuery. Lanzada en fecha, con el 100% del alcance.',
            },
          ],
        },
        {
          years: '2022 — 2024',
          company: 'Mercado Libre',
          role: 'IT Project Leader',
          description:
            'Lideré un equipo de desarrollo en la unidad de envíos, a cargo del ciclo de vida completo del software bajo Agile/Scrum. Responsable de contratación, desarrollo y evaluación de desempeño del equipo.',
          highlights: [
            {
              year: '2024',
              text: 'Análisis de métricas de nivel 2 y diseño de soluciones con el equipo IT: mejora del 30% en métricas clave en un solo trimestre y definición del roadmap de largo plazo junto al liderazgo técnico.',
            },
            {
              year: '2023',
              text: 'Desarrollo y lanzamiento de iniciativas cross‑business que requirieron coordinación y negociación entre varias unidades de negocio, IT, producto y UX.',
            },
          ],
        },
        {
          years: '2018 — 2022',
          company: 'Serfe',
          role: 'Senior Developer / Project Manager',
          description:
            'Project manager y team lead en 3 proyectos simultáneos con equipos de hasta 6 desarrolladores. Configuración de AWS — apps en Amplify, repositorios y testing automatizado — habilitando CI/CD para el equipo.',
          highlights: [
            {
              year: '2022',
              text: 'Beta launch de Everprep sobre AWS + React, uno de los proyectos más grandes de la empresa. Capacitación interna en AWS Amplify.',
            },
            { year: '2021', text: 'Lanzamiento de la tienda WooCommerce del proyecto 45R.' },
            {
              year: '2020',
              text: 'Rediseño de web app y nueva app mobile (React / React Native) para Bluejacketeer.',
            },
          ],
        },
        {
          years: '2017 — 2018',
          company: 'Independiente',
          role: 'Web Developer',
          description:
            'Dos proyectos end‑to‑end: Patrone Equipamientos, showroom online en WordPress con setup de marketing digital; y SIGE, sistema de gestión de legajos para la Regional IV de Educación de Santa Fe (PHP/CodeIgniter, MySQL), incluyendo relevamiento, deploy y capacitación.',
        },
        {
          years: '2014 — 2017',
          company: 'Serfe',
          role: 'Full‑Stack Developer',
          description:
            'Análisis de requerimientos, estimación y desarrollo de proyectos web en PHP, JavaScript y SQL con Drupal, WordPress, Joomla, CodeIgniter, jQuery y Bootstrap sobre servidores LAMP, con Git.',
        },
      ],
    },
    skills: {
      label: '03 — HABILIDADES',
      groups: [
        {
          title: 'Metodologías y entrega',
          items: ['Agile', 'Scrum', 'Kanban', 'Waterfall', 'Híbrido', 'Roadmapping', 'Gestión de riesgo y alcance', 'Lanzamientos'],
        },
        {
          title: 'Producto',
          items: ['Product ownership', 'Discovery', 'Backlog y priorización', 'MVP', 'Go‑to‑market', 'Pagos (Mercado Pago)'],
        },
        {
          title: 'Liderazgo',
          items: ['Equipos cross‑funcionales', 'Stakeholders', 'Reportes ejecutivos', 'Hiring y coaching', 'Clientes y proveedores'],
        },
        {
          title: 'Herramientas',
          items: ['Jira', 'Confluence', 'GitHub Projects', 'Monday', 'Slack', 'Google Workspace', 'Excel / Sheets', 'BigQuery'],
        },
        {
          title: 'Base técnica',
          items: ['AWS', 'CI/CD', 'SDLC', 'Node.js', 'React', 'React Native', 'Next.js', 'NestJS', 'Supabase', 'Docker', 'PHP', 'SQL', 'CCNA'],
        },
        {
          title: 'IA y automatización',
          items: ['Orquestación de agentes de IA', 'Claude Code (skills, hooks)', 'Claude API', 'Automatización con IA'],
        },
      ],
    },
    education: {
      label: '04 — FORMACIÓN',
      items: [
        { name: 'Claude Platform 101', org: 'Anthropic', year: '2026' },
        { name: 'Claude Code 101', org: 'Anthropic', year: '2026' },
        { name: 'Kanban for Software Project Management', org: 'Packt', year: '2026' },
        { name: 'IBM IT Project Manager', org: 'Coursera', year: '2026' },
        { name: 'DevOps on AWS & Project Management', org: 'Coursera', year: '2026' },
        { name: 'Full‑Stack Web Development', org: 'Acámica', year: '2013–14' },
        { name: 'Cisco CCNA 1 & 2', org: 'UTN Academy', year: '2011–13' },
        { name: 'Ingeniería en Sistemas (4º año)', org: 'UTN', year: '2009–15' },
        { name: 'Inglés', org: 'Alicana Institute · 5 años', year: '' },
      ],
      languagesHeading: 'Idiomas',
      languages: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'Avanzado (B2/C1)' },
      ],
    },
    blogTeaser: {
      label: '05 — BLOG',
      heading: 'Notas sobre gestión y producto.',
      viewAll: 'Ver todos los artículos →',
      readMore: 'Leer artículo →',
    },
    booking: {
      label: '06 — RESERVAR REUNIÓN',
      heading: 'Hablemos de tu proyecto o de un rol.',
      intro:
        'Una videollamada sin costo para entender qué necesitás: planificar un producto desde cero, ordenar la entrega o sumar un IT Project Manager al equipo.',
      bullets: [
        '30 minutos por Google Meet',
        'Martes a jueves 10–17 h, viernes 11–15 h (GMT‑3)',
        'La invitación de Google Calendar llega con el link',
      ],
      stepDay: '1. Elegí un día',
      stepTime: '2. Elegí un horario',
      stepDetails: '3. Tus datos',
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Email',
      topicPlaceholder: '¿De qué te gustaría hablar? (opcional)',
      selectPrompt: 'Seleccioná día y horario',
      timeSuffix: 'hs',
      submit: 'Confirmar reunión',
      successTitle: 'Reunión solicitada',
      successSummary:
        '{name}, te espero el {date} a las {time} hs (30 min). Vas a recibir la invitación de Google Calendar con el link de Meet en {email}.',
      meetLinkLabel: 'Link de Google Meet',
      reset: 'Reservar otro horario',
      noSlots: 'No hay horarios disponibles por el momento. Escribime directamente para coordinar.',
      loadError: 'No se pudieron cargar los horarios disponibles. Probá de nuevo en un rato.',
      formError: 'Hubo un error al confirmar la reserva. Probá de nuevo o escribime directamente.',
      slotTakenError: 'Justo se ocupó ese horario. Elegí otro de la lista actualizada.',
      rateLimitedError: 'Ya recibimos una reserva tuya hace poco. Si necesitás otro horario, escribime directamente.',
      invalidSlotError: 'Ese horario ya no está disponible. Elegí otro de la lista actualizada.',
    },
    contact: {
      label: '07 — CONTACTO',
      heading: '¿Preferís escribir?',
      intro: 'Respondo en menos de 24 horas hábiles.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      formName: 'Nombre',
      formEmail: 'Email',
      reasonsLabel: 'Motivo del contacto (podés elegir varios)',
      reasons: ['Consultoría', 'Aplicación web', 'App mobile', 'Project Manager', 'Desarrollo', 'Oportunidad laboral'],
      formMessage: 'Mensaje',
      formSubmit: 'Enviar mensaje',
      successTitle: 'Gracias, mensaje enviado.',
      successBody: 'Te respondo a la brevedad.',
      reset: 'Enviar otro mensaje',
      formError: 'Hubo un error al enviar el mensaje. Probá de nuevo o escribime directamente por email.',
    },
    footer: {
      role: 'IT / Technical Project Manager',
      backToTop: 'Volver arriba ↑',
      privacyLink: 'Política de Privacidad',
    },
    cookieConsent: {
      message: 'Este sitio usa Google Analytics para entender cómo se usa.',
      policyLinkText: 'Más información',
      dismissLabel: 'Entendido',
    },
    privacy: {
      heading: 'Política de Privacidad',
      intro:
        'En este sitio valoramos tu privacidad. Esta política explica qué información recopilamos cuando lo navegás, con qué fin, y qué opciones tenés al respecto.',
      sections: [
        {
          heading: 'Información que recopilamos',
          body: 'Este sitio no te pide ningún registro ni dato personal para navegarlo. La única excepción es el formulario de contacto: si lo completás, recibimos el nombre, el email y el mensaje que ingreses, únicamente para poder responderte. No compartimos esos datos con terceros.',
        },
        {
          heading: 'Cookies y Google Analytics',
          body: 'Para entender cómo se usa el sitio y mejorar la experiencia de navegación, usamos Google Analytics. Esta herramienta nos permite ver datos estadísticos agregados —como las páginas más visitadas, el tiempo de permanencia, el tipo de navegador o el país o ciudad de acceso— sin identificarte individualmente. Google Analytics usa cookies (pequeños archivos de texto guardados en tu dispositivo) para esto, que se activan automáticamente al navegar el sitio.',
        },
        {
          heading: 'Gestión y desactivación de cookies',
          body: 'Podés aceptar, rechazar o configurar el uso de cookies en cualquier momento desde la configuración de privacidad de tu navegador (Chrome, Firefox, Safari, Edge, etc.), o instalando el Complemento de inhabilitación para navegadores de Google Analytics (tools.google.com/dlpage/gaoptout). Desactivar estas cookies no afecta el funcionamiento ni el acceso a los contenidos del sitio.',
        },
        {
          heading: 'Enlaces a sitios de terceros',
          body: 'Este sitio incluye enlaces a sitios externos, como LinkedIn. Una vez que hacés clic en esos enlaces y salís de este sitio, no tenemos control sobre el sitio al que sos redirigido ni somos responsables de sus términos o políticas de privacidad.',
        },
        {
          heading: 'Cambios en esta política',
          body: 'Podemos actualizar esta política en cualquier momento para reflejar cambios legislativos o en el funcionamiento del sitio. Te recomendamos revisarla periódicamente. Última actualización: agosto de 2026.',
        },
        {
          heading: 'Contacto',
          body: 'Si tenés dudas sobre esta política, o querés pedir acceso, corrección o borrado de tus datos, escribinos a lucianopr87@gmail.com.',
        },
      ],
    },
    blog: {
      heading: 'Blog',
      intro: 'Notas sobre desarrollo, gestión de proyectos y lo que aprendo trabajando con founders y equipos.',
      backLink: '← Volver al blog',
      emptyState: 'Todavía no hay artículos publicados. Volvé pronto.',
      byline: 'Por',
      republishedPrefix: 'Publicado originalmente en',
      months: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    },
  },
  en: {
    cvPdf: '/Luciano_Perez_Ruiz_CV_EN.pdf',
    meta: {
      title: 'Luciano Perez Ruiz — IT / Technical Project Manager',
      description:
        'IT / Technical Project Manager and Product Owner with 10+ years at Mercado Libre and startups. I started out writing code — today I lead teams of developers and AI agents and turn complex initiatives into shipped products.',
    },
    nav: {
      items: {
        home: 'Home',
        profile: 'Profile',
        experience: 'Experience',
        skills: 'Skills',
        education: 'Education',
        blog: 'Blog',
        booking: 'Book a meeting',
        contact: 'Contact',
      },
      menu: 'Menu',
      close: 'Close',
      bookShort: 'Book a call',
      directContact: 'DIRECT CONTACT',
      downloadCv: 'Download CV (PDF) ↓',
      otherLanguage: 'Español',
      languageSwitch: 'Language',
    },
    hero: {
      status: 'OPEN TO REMOTE ROLES · SANTA FE, ARGENTINA',
      firstName: 'Luciano',
      lastName: 'Perez Ruiz',
      lead: 'IT / Technical Project Manager and Product Owner. 10+ years turning complex initiatives into shipped products — with the eye of someone who started out writing code, now leading teams that include AI agents.',
      ctaBook: 'Book a meeting',
      ctaCv: 'Download CV (PDF) ↓',
      photoAlt: 'Luciano Perez Ruiz',
      crossLink: { label: 'Hiring a developer? See my full-stack profile →', href: '/en/developer/' },
    },
    profile: {
      label: '01 — PROFILE',
      lead: 'I speak both “business” and “engineering” fluently. I’ve led teams of up to 8 people at Mercado Libre and startups, from e‑commerce platforms built from scratch to initiatives that needed buy‑in from several business units.',
      body: 'I started out as a full‑stack developer, so I don’t just manage roadmaps — I understand what’s actually hard about building software. I work across Agile, Scrum, Kanban and hybrid delivery. I improved core operational metrics by 30% in a single quarter through data‑driven process redesign, and delivered a market‑leading retailer’s Adobe Commerce platform on time and on scope. Today I run client projects and my own product in production, and I design how teams of developers and AI agents build together, with shared rules, reviews and CI.',
    },
    experience: {
      label: '02 — EXPERIENCE',
      heading: 'From developer to IT project leader.',
      items: [
        {
          years: '2026 — Present',
          company: 'pipacode.studio',
          role: 'Co‑founder · IT Project Manager',
          description:
            'A software development, automation and consulting studio. I own product and delivery: client discovery, staged proposals, roadmap, and coordination of a team of developers and AI agents (Claude Code). I also source and qualify new clients.',
          link: { label: 'pipacode.studio ↗', href: 'https://pipacode.studio' },
          highlights: [
            {
              year: '2026',
              text: 'Carn.AR: PM for the MVP of a meat marketplace for a 4‑branch butcher chain. 12‑week plan in 6 stages with a payment milestone per stage, a 70+ task backlog in GitHub Projects, ADRs, meeting minutes and a client decisions‑and‑assumptions log. I coordinate 2 full‑stack developers and own the repo, infrastructure (Docker, CI/CD, Sentry) and admin panel (NestJS, Next.js, PostgreSQL/PostGIS).',
            },
            {
              year: '2026',
              text: 'Designed the team’s AI‑assisted workflow: shared rules for each developer’s agents, functional‑analysis and planning skills before any code is written, an automatic “what changed” briefing at the start of every session, Conventional Commits, small cross‑reviewed PRs and CI required to merge.',
            },
          ],
        },
        {
          years: '2026 — Present',
          company: 'Tino · own product',
          role: 'Founder · Product Owner',
          description:
            'A spaced‑repetition study app for law students (UNL) and licensing courses (ANAC, CNV). I run it solo end to end: product, design, development with AI agents, content and go‑to‑market.',
          link: { label: 'estudiantino.com.ar ↗', href: 'https://estudiantino.com.ar' },
          highlights: [
            {
              year: '2026',
              text: 'From idea to production in about 2 months: installable web app (PWA), admin panel with reporting, Mercado Pago payments (one‑time and monthly subscription) and a landing site with one SEO page per subject. Now in commercial validation with students.',
            },
            {
              year: '2026',
              text: 'Built a pipeline that turns textbooks into question banks: OCR extraction and AI generation, always with human review.',
            },
          ],
        },
        {
          years: '2024 — 2025',
          company: 'IURCO',
          role: 'IT Project Manager',
          description:
            'Managed multiple software‑factory projects simultaneously, from initial planning to final delivery. Coordinated with product owners and stakeholders to define scope and align on process and documentation, with continuous feedback and process improvement.',
          highlights: [
            {
              year: '2025',
              text: 'End‑to‑end planning, execution and delivery of a high‑scale, from‑scratch Adobe Commerce platform for a market‑leading consumer electronics retailer in Argentina. 6‑developer team under Scrum and Jira, with SAP and Google BigQuery integrations. Launched on schedule, meeting 100% of scope.',
            },
          ],
        },
        {
          years: '2022 — 2024',
          company: 'Mercado Libre',
          role: 'IT Project Leader',
          description:
            'Led a development team in the shipping unit, owning the full software development lifecycle under Agile/Scrum. Responsible for hiring, development and performance evaluation of the team.',
          highlights: [
            {
              year: '2024',
              text: 'Analyzed level‑2 metrics and designed solutions with the IT team: a 30% improvement in core metrics in a single quarter, and a long‑term roadmap defined alongside technical leadership.',
            },
            {
              year: '2023',
              text: 'Developed and released cross‑business initiatives that required coordination and negotiation across several business units, IT, product and UX.',
            },
          ],
        },
        {
          years: '2018 — 2022',
          company: 'Serfe',
          role: 'Senior Developer / Project Manager',
          description:
            'Project manager and team lead across 3 concurrent projects with teams of up to 6 developers. AWS configuration — Amplify apps, repositories and automated testing — enabling CI/CD for the team.',
          highlights: [
            {
              year: '2022',
              text: 'Beta launch of Everprep on AWS + React, one of the company’s largest projects. Internal AWS Amplify training.',
            },
            { year: '2021', text: 'Launched the WooCommerce store for the 45R project.' },
            {
              year: '2020',
              text: 'Web app redesign and new mobile app (React / React Native) for Bluejacketeer.',
            },
          ],
        },
        {
          years: '2017 — 2018',
          company: 'Independent',
          role: 'Web Developer',
          description:
            'Two end‑to‑end projects: Patrone Equipamientos, an online showroom built in WordPress with a digital‑marketing setup; and SIGE, a records‑management system for Santa Fe’s Regional IV Education authority (PHP/CodeIgniter, MySQL), including requirements gathering, deployment and staff training.',
        },
        {
          years: '2014 — 2017',
          company: 'Serfe',
          role: 'Full‑Stack Developer',
          description:
            'Requirements analysis, estimation and development of web projects in PHP, JavaScript and SQL with Drupal, WordPress, Joomla, CodeIgniter, jQuery and Bootstrap on LAMP servers, using Git.',
        },
      ],
    },
    skills: {
      label: '03 — SKILLS',
      groups: [
        {
          title: 'Delivery & methodology',
          items: ['Agile', 'Scrum', 'Kanban', 'Waterfall', 'Hybrid delivery', 'Roadmapping', 'Risk & scope management', 'Product launches'],
        },
        {
          title: 'Product',
          items: ['Product ownership', 'Discovery', 'Backlog & prioritization', 'MVP', 'Go‑to‑market', 'Payments (Mercado Pago)'],
        },
        {
          title: 'Leadership',
          items: ['Cross‑functional teams', 'Stakeholder management', 'Executive reporting', 'Hiring & coaching', 'Client & vendor coordination'],
        },
        {
          title: 'Tools',
          items: ['Jira', 'Confluence', 'GitHub Projects', 'Monday', 'Slack', 'Google Workspace', 'Excel / Sheets', 'BigQuery'],
        },
        {
          title: 'Technical background',
          items: ['AWS', 'CI/CD', 'SDLC', 'Node.js', 'React', 'React Native', 'Next.js', 'NestJS', 'Supabase', 'Docker', 'PHP', 'SQL', 'CCNA'],
        },
        {
          title: 'AI & automation',
          items: ['AI agent orchestration', 'Claude Code (skills, hooks)', 'Claude API', 'AI workflow automation'],
        },
      ],
    },
    education: {
      label: '04 — EDUCATION',
      items: [
        { name: 'Claude Platform 101', org: 'Anthropic', year: '2026' },
        { name: 'Claude Code 101', org: 'Anthropic', year: '2026' },
        { name: 'Kanban for Software Project Management', org: 'Packt', year: '2026' },
        { name: 'IBM IT Project Manager', org: 'Coursera', year: '2026' },
        { name: 'DevOps on AWS & Project Management', org: 'Coursera', year: '2026' },
        { name: 'Full‑Stack Web Development', org: 'Acámica', year: '2013–14' },
        { name: 'Cisco CCNA 1 & 2', org: 'UTN Academy', year: '2011–13' },
        { name: 'Systems Engineering (4th year)', org: 'UTN', year: '2009–15' },
        { name: 'English', org: 'Alicana Institute · 5 years', year: '' },
      ],
      languagesHeading: 'Languages',
      languages: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'Advanced (B2/C1)' },
      ],
    },
    blogTeaser: {
      label: '05 — BLOG',
      heading: 'Notes on delivery and product.',
      viewAll: 'See all articles →',
      readMore: 'Read article →',
    },
    booking: {
      label: '06 — BOOK A MEETING',
      heading: 'Let’s talk about your project or a role.',
      intro:
        'A free video call to understand what you need: planning a product from scratch, getting delivery back on track, or adding an IT Project Manager to your team.',
      bullets: [
        '30 minutes on Google Meet',
        'Tuesday to Thursday 10am–5pm, Friday 11am–3pm (GMT‑3)',
        'The Google Calendar invite includes the link',
      ],
      stepDay: '1. Pick a day',
      stepTime: '2. Pick a time',
      stepDetails: '3. Your details',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      topicPlaceholder: 'What would you like to talk about? (optional)',
      selectPrompt: 'Select a day and time',
      timeSuffix: '',
      submit: 'Confirm meeting',
      successTitle: 'Meeting requested',
      successSummary:
        '{name}, see you on {date} at {time} (30 min, GMT‑3). The Google Calendar invite with the Meet link is on its way to {email}.',
      meetLinkLabel: 'Google Meet link',
      reset: 'Book another time',
      noSlots: "No slots available right now. Reach out directly and we'll coordinate.",
      loadError: 'Could not load available slots. Please try again shortly.',
      formError: 'There was an error confirming your booking. Please try again or reach out directly.',
      slotTakenError: 'That slot was just taken. Please pick another one from the updated list.',
      rateLimitedError: 'We already received a booking from you recently. If you need another slot, reach out directly.',
      invalidSlotError: 'That slot is no longer available. Please pick another one from the updated list.',
    },
    contact: {
      label: '07 — CONTACT',
      heading: 'Rather write?',
      intro: 'I reply within 24 business hours.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      formName: 'Name',
      formEmail: 'Email',
      reasonsLabel: 'What is this about? (pick as many as you like)',
      reasons: ['Consulting', 'Web app', 'Mobile app', 'Project Manager', 'Development', 'Job opportunity'],
      formMessage: 'Message',
      formSubmit: 'Send message',
      successTitle: 'Thanks, message sent.',
      successBody: "I'll get back to you shortly.",
      reset: 'Send another message',
      formError: 'There was an error sending your message. Please try again or email me directly.',
    },
    footer: {
      role: 'IT / Technical Project Manager',
      backToTop: 'Back to top ↑',
      privacyLink: 'Privacy Policy',
    },
    cookieConsent: {
      message: 'This site uses Google Analytics to understand how it is used.',
      policyLinkText: 'Learn more',
      dismissLabel: 'Got it',
    },
    privacy: {
      heading: 'Privacy Policy',
      intro:
        'We value your privacy. This policy explains what information this site collects when you browse it, why, and what choices you have about it.',
      sections: [
        {
          heading: 'Information we collect',
          body: "This site doesn't require any sign-up or personal data to browse it. The one exception is the contact form: if you submit it, we receive the name, email, and message you enter, solely to reply to you. We don't share that data with third parties.",
        },
        {
          heading: 'Cookies and Google Analytics',
          body: 'To understand how the site is used and improve the browsing experience, we use Google Analytics. This tool lets us see aggregated statistics — such as the most visited pages, time spent on the site, browser type, or general country/city of access — without identifying you individually. Google Analytics uses cookies (small text files stored on your device) for this, which are enabled automatically as you browse the site.',
        },
        {
          heading: 'Managing and disabling cookies',
          body: 'You can accept, reject, or configure cookies at any time from your browser’s privacy settings (Chrome, Firefox, Safari, Edge, etc.), or by installing the Google Analytics Opt-out Browser Add-on (tools.google.com/dlpage/gaoptout). Disabling these cookies won’t affect the site’s functionality or your access to its content.',
        },
        {
          heading: 'Links to third-party sites',
          body: "This site includes links to external sites, such as LinkedIn. Once you click one of those links and leave this site, we have no control over the site you're redirected to and aren't responsible for its terms or privacy practices.",
        },
        {
          heading: 'Changes to this policy',
          body: 'We may update this policy at any time to reflect legal changes or changes to how the site works. We recommend checking this page periodically. Last updated: August 2026.',
        },
        {
          heading: 'Contact',
          body: 'If you have questions about this policy, or want to request access to, correction of, or deletion of your data, write to us at lucianopr87@gmail.com.',
        },
      ],
    },
    blog: {
      heading: 'Blog',
      intro: 'Notes on development, project management, and what I learn working with founders and teams.',
      backLink: '← Back to blog',
      emptyState: 'No articles published yet. Check back soon.',
      byline: 'By',
      republishedPrefix: 'Originally published on',
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    },
  },
};
