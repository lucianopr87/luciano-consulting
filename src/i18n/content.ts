export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    about: string;
    experience: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
  };
  services: {
    heading: string;
    intro: string;
    items: { title: string; description: string; tags: string[] }[];
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  experience: {
    heading: string;
    intro: string;
    items: ExperienceEntry[];
  };
  contact: {
    heading: string;
    intro: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    formError: string;
    directHeading: string;
    email: string;
    linkedin: string;
  };
  footer: {
    text: string;
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
}

export const content: Record<Locale, SiteContent> = {
  es: {
    meta: {
      title: 'Luciano Perez Ruiz — Consultoría IT: Desarrollo Full Stack y Gestión de Proyectos',
      description:
        'Consultor IT con más de 10 años de experiencia en Mercado Libre y startups. Ayudo a founders y equipos a planificar y construir productos de software full stack, de punta a punta.',
    },
    nav: {
      services: 'Servicios',
      about: 'Sobre mí',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Consultoría IT · Desarrollo Full Stack y Gestión de Proyectos',
      headline: 'Ayudo a startups y equipos a sacar adelante software que funciona — y que llega a tiempo.',
      subheadline:
        'Más de 10 años liderando equipos de desarrollo y construyendo productos full stack, desde Mercado Libre hasta startups que recién arrancan. Manejo tanto el código como la gestión, así el proyecto no se traba en el medio.',
      cta: 'Hablemos de tu proyecto',
    },
    services: {
      heading: 'Qué puedo hacer por vos',
      intro: 'Dos maneras de trabajar juntos, según lo que necesite tu proyecto hoy.',
      items: [
        {
          title: 'Desarrollo Full Stack',
          description:
            'Me meto de lleno en el código de tu producto: defino arquitectura, reviso código y construyo funcionalidades pensadas para escalar.',
          tags: ['PHP', 'JavaScript / TypeScript', 'React', 'WordPress', 'AWS'],
        },
        {
          title: 'Gestión y Liderazgo de Proyectos IT',
          description:
            'Ordeno el roadmap, coordino al equipo y me aseguro de que la entrega no se corra ni en alcance ni en tiempo — así lideré equipos de hasta 8 desarrolladores en proyectos complejos con múltiples stakeholders.',
          tags: ['Agile / Scrum', 'Jira', 'Planificación', 'Stakeholders'],
        },
      ],
    },
    about: {
      heading: 'Sobre mí',
      paragraphs: [
        'Soy IT Project Leader y tengo más de 10 años sacando adelante proyectos complejos, desde cero, en empresas como Mercado Libre y en startups que se mueven rápido.',
        'Arranqué como desarrollador full stack, así que no me quedo solo en la gestión del roadmap: sé lo que realmente cuesta construir software, y eso me permite hablar tanto el idioma del negocio como el de los developers. Gracias a esto pude liderar equipos de hasta 8 desarrolladores en proyectos que van desde plataformas de e-commerce armadas desde cero (con integraciones a SAP y BigQuery) hasta iniciativas que cruzaban varias áreas de la empresa y necesitaban que todos remaran para el mismo lado.',
        'Algo de lo que estoy orgulloso: mejorar métricas clave de IT en un 30% en un solo trimestre rediseñando procesos en base a datos, y lanzar a tiempo la plataforma de Adobe Commerce de un retailer líder del mercado.',
      ],
    },
    experience: {
      heading: 'Experiencia',
      intro: 'Un recorrido de más de 10 años entre desarrollo y liderazgo de proyectos.',
      items: [
        {
          role: 'IT Consultant & Project Manager',
          company: 'Freelance',
          period: '2026 — Actualidad',
          description:
            'Ayudo a founders y startups a definir y planificar sus proyectos desde cero. Como tengo experiencia tanto de desarrollador full stack como de project manager, puedo guiarlos para que construyan su producto de la mejor manera posible.',
        },
        {
          role: 'IT Project Manager',
          company: 'IURCO',
          period: '2024 — 2025',
          description:
            'Supervisé varios proyectos en simultáneo, desde la planificación inicial hasta la entrega final, coordinando con product owners y stakeholders para definir alcance y procesos.',
          highlights: [
            'Lideré de punta a punta la planificación, ejecución y entrega de una plataforma Adobe Commerce hecha desde cero para un retailer líder de electrónica de consumo en Argentina, con integraciones a SAP y BigQuery.',
          ],
        },
        {
          role: 'IT Project Leader',
          company: 'Mercado Libre',
          period: '2022 — 2024',
          description:
            'Lideré un equipo de desarrolladores en la unidad de logística de Mercado Libre, manejando todo el ciclo de desarrollo con Agile y Scrum.',
          highlights: [
            'Mejoré en un 30% las métricas clave del equipo de IT en un trimestre, a partir de análisis de datos y rediseño de procesos.',
          ],
        },
        {
          role: 'Senior Developer / Project Manager',
          company: 'Serfe',
          period: '2018 — 2022',
          description:
            'Trabajé como project manager y team lead en 3 proyectos en simultáneo, con equipos de hasta 6 desarrolladores. También configuré infraestructura en AWS (Amplify) y armé la automatización de testing para poder trabajar con CI/CD.',
        },
        {
          role: 'Desarrollador Web',
          company: 'Freelance',
          period: '2017 — 2018',
          description:
            'Encaré dos proyectos de forma independiente: un showroom online en WordPress para una empresa de equipamiento comercial, y un sistema de gestión de expedientes en PHP/MySQL para una secretaría de educación pública.',
        },
        {
          role: 'Full-Stack Developer',
          company: 'Serfe',
          period: '2014 — 2017',
          description:
            'Trabajé con PHP, JavaScript y SQL sobre Drupal, WordPress, Joomla y CodeIgniter, y configuré servidores LAMP.',
        },
      ],
    },
    contact: {
      heading: 'Hablemos',
      intro: 'Contame en qué estás trabajando y cómo te puedo ayudar. Te respondo apenas pueda.',
      formName: 'Nombre',
      formEmail: 'Email',
      formMessage: 'Contame sobre tu proyecto',
      formSubmit: 'Enviar mensaje',
      formSuccess: '¡Gracias! Tu mensaje fue enviado, te voy a responder pronto.',
      formError: 'Hubo un error al enviar el mensaje. Probá de nuevo o escribime directamente por email.',
      directHeading: 'O escribime directo',
      email: 'lucianopr87@gmail.com',
      linkedin: 'linkedin.com/in/luciano-perez-ruiz',
    },
    footer: {
      text: 'Luciano Perez Ruiz — Consultoría IT',
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
        'Esta política explica qué datos se recolectan en este sitio, con qué fin, y qué opciones tenés al respecto.',
      sections: [
        {
          heading: 'Qué datos recolectamos',
          body: 'Si completás el formulario de contacto, recibimos el nombre, email y mensaje que ingreses, únicamente para poder responderte. No compartimos esos datos con terceros.',
        },
        {
          heading: 'Cookies y Google Analytics',
          body: 'Usamos Google Analytics (GA4) para entender cuántas visitas recibe el sitio y qué páginas se consultan. Este servicio usa cookies, que se activan automáticamente al navegar el sitio. Si preferís no ser trackeado, podés bloquear las cookies de analytics desde la configuración de tu navegador o con una extensión de bloqueo.',
        },
        {
          heading: 'Tus derechos',
          body: 'Podés pedir acceso, corrección o borrado de tus datos escribiendo a lucianopr87@gmail.com.',
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Luciano Perez Ruiz — IT Consulting: Full Stack Development & Project Leadership',
      description:
        'IT consultant with 10+ years of experience at Mercado Libre and startups. I help founders and teams define, plan, and build full-stack software products from the ground up.',
    },
    nav: {
      services: 'Services',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'IT Consulting · Full Stack Development & Project Leadership',
      headline: 'I help startups and teams ship software that actually works — and stays on track.',
      subheadline:
        "10+ years leading development teams and building full-stack products, from Mercado Libre to early-stage startups. I bridge the gap between technical execution and project delivery.",
      cta: "Let's talk about your project",
    },
    services: {
      heading: 'What I can do for you',
      intro: 'Two ways to work together, depending on what your project needs right now.',
      items: [
        {
          title: 'Full Stack Development',
          description:
            'Hands-on development and technical guidance for your product — architecture decisions, code reviews, and building features that scale.',
          tags: ['PHP', 'JavaScript / TypeScript', 'React', 'WordPress', 'AWS'],
        },
        {
          title: 'IT Project Leadership & Management',
          description:
            "I organize the roadmap, coordinate your team, and make sure delivery stays on scope and on time — the same way I've led teams of up to 8 developers through complex, multi-stakeholder projects.",
          tags: ['Agile / Scrum', 'Jira', 'Planning', 'Stakeholders'],
        },
      ],
    },
    about: {
      heading: 'About me',
      paragraphs: [
        "I'm an IT Project Leader with 10+ years turning complex, early-stage initiatives into shipped products — for companies like Mercado Libre and fast-moving startups.",
        "I started as a full-stack developer, which means I don't just manage roadmaps — I understand what's actually hard about building software, and I speak both \"business\" and \"engineering\" fluently. That's let me lead teams of up to 8 developers through everything from e-commerce platforms built from scratch (with SAP and BigQuery integrations) to cross-business initiatives requiring buy-in from multiple stakeholders.",
        "Some things I'm proud of: improving core operational metrics by 30% in a single quarter through data-driven process redesign, and launching a market-leading retailer's Adobe Commerce platform on time and on scope.",
      ],
    },
    experience: {
      heading: 'Experience',
      intro: 'Over 10 years moving between hands-on development and project leadership.',
      items: [
        {
          role: 'IT Consultant & Project Manager',
          company: 'Freelance',
          period: '2026 — Present',
          description:
            'I help founders and startups define and plan their projects from the beginning, combining full-stack development and project management experience to guide them toward the best way to build their product.',
        },
        {
          role: 'IT Project Manager',
          company: 'IURCO',
          period: '2024 — 2025',
          description:
            'Responsible for overseeing multiple projects simultaneously, from initial planning to final delivery, coordinating with product owners and stakeholders to define scope and processes.',
          highlights: [
            'Orchestrated the end-to-end planning, execution, and delivery of a from-scratch Adobe Commerce platform for a market-leading consumer electronics retailer in Argentina, with SAP and BigQuery integrations.',
          ],
        },
        {
          role: 'IT Project Leader',
          company: 'Mercado Libre',
          period: '2022 — 2024',
          description:
            "Led a team of developers in Mercado Libre's shipping unit, managing the full software development lifecycle under Agile and Scrum methodologies.",
          highlights: [
            "Improved the IT team's core operational metrics by 30% in a quarter through data analysis and process redesign.",
          ],
        },
        {
          role: 'Senior Developer / Project Manager',
          company: 'Serfe',
          period: '2018 — 2022',
          description:
            'Project manager and team lead role across 3 concurrent projects with teams of up to 6 developers. AWS (Amplify) infrastructure configuration and automated testing setup for a CI/CD approach.',
        },
        {
          role: 'Web Developer',
          company: 'Freelance',
          period: '2017 — 2018',
          description:
            'Developed and completed two independent projects: a WordPress showroom for a commercial equipment company, and a PHP/MySQL records management system for a public education department.',
        },
        {
          role: 'Full-Stack Developer',
          company: 'Serfe',
          period: '2014 — 2017',
          description:
            'Development in PHP, JavaScript, and SQL on Drupal, WordPress, Joomla, and CodeIgniter, with LAMP server configuration.',
        },
      ],
    },
    contact: {
      heading: "Let's talk",
      intro: "Tell me what you're working on and how I can help. I'll get back to you shortly.",
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Tell me about your project',
      formSubmit: 'Send message',
      formSuccess: "Thanks! Your message was sent, I'll reply soon.",
      formError: 'There was an error sending your message. Please try again or email me directly.',
      directHeading: 'Or reach out directly',
      email: 'lucianopr87@gmail.com',
      linkedin: 'linkedin.com/in/luciano-perez-ruiz',
    },
    footer: {
      text: 'Luciano Perez Ruiz — IT Consulting',
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
        'This policy explains what data this site collects, why, and what choices you have about it.',
      sections: [
        {
          heading: 'What data we collect',
          body: "If you submit the contact form, we receive the name, email, and message you enter, solely to reply to you. We don't share that data with third parties.",
        },
        {
          heading: 'Cookies and Google Analytics',
          body: "We use Google Analytics (GA4) to understand how many people visit the site and which pages they view. This service uses cookies, which are enabled automatically as you browse the site. If you'd rather not be tracked, you can block analytics cookies in your browser settings or with a blocking extension.",
        },
        {
          heading: 'Your rights',
          body: 'You can request access to, correction of, or deletion of your data by writing to lucianopr87@gmail.com.',
        },
      ],
    },
  },
};
