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
  };
}

export const content: Record<Locale, SiteContent> = {
  es: {
    meta: {
      title: 'Luciano Perez Ruiz — Consultoría IT: Desarrollo Full Stack y Liderazgo de Proyectos',
      description:
        'Consultor IT con 10+ años de experiencia en Mercado Libre y startups. Ayudo a founders y equipos a definir, planificar y construir productos de software full stack, de principio a fin.',
    },
    nav: {
      services: 'Servicios',
      about: 'Sobre mí',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Consultoría IT · Desarrollo Full Stack y Liderazgo de Proyectos',
      headline: 'Ayudo a startups y equipos a construir software que funciona — y que llega a tiempo.',
      subheadline:
        'Más de 10 años liderando equipos de desarrollo y construyendo productos full stack, desde Mercado Libre hasta startups en etapa temprana. Conecto la ejecución técnica con la entrega del proyecto.',
      cta: 'Hablemos de tu proyecto',
    },
    services: {
      heading: 'Qué puedo hacer por vos',
      intro:
        'Dos formas de trabajar juntos, según lo que tu proyecto necesite en este momento.',
      items: [
        {
          title: 'Desarrollo Full Stack',
          description:
            'Desarrollo hands-on y guía técnica para tu producto: decisiones de arquitectura, revisión de código y construcción de funcionalidades que escalan.',
          tags: ['PHP', 'JavaScript / TypeScript', 'React', 'WordPress', 'AWS'],
        },
        {
          title: 'Liderazgo y Gestión de Proyectos IT',
          description:
            'Organizo el roadmap, coordino a tu equipo y me aseguro de que la entrega se mantenga en alcance y en tiempo — igual que lideré equipos de hasta 8 desarrolladores en proyectos complejos con múltiples stakeholders.',
          tags: ['Agile / Scrum', 'Jira', 'Planificación', 'Stakeholders'],
        },
      ],
    },
    about: {
      heading: 'Sobre mí',
      paragraphs: [
        'Soy IT Project Leader con más de 10 años convirtiendo iniciativas complejas y en etapa temprana en productos entregados — para empresas como Mercado Libre y startups de alto ritmo.',
        'Empecé como desarrollador full stack, lo que significa que no solo gestiono roadmaps: entiendo lo que realmente es difícil al construir software, y hablo con fluidez tanto el idioma del negocio como el de la ingeniería. Eso me permitió liderar equipos de hasta 8 desarrolladores en proyectos que van desde plataformas de e-commerce construidas desde cero (con integraciones a SAP y BigQuery) hasta iniciativas cross-business que requerían consenso entre múltiples áreas.',
        'Algunas cosas de las que estoy orgulloso: mejorar métricas operativas clave en un 30% en un solo trimestre mediante un rediseño de procesos basado en datos, y lanzar en tiempo y forma la plataforma Adobe Commerce de un retailer líder del mercado.',
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
            'Ayudo a founders y startups a definir y planificar sus proyectos desde el inicio, combinando mi experiencia como desarrollador full stack y como project manager para guiarlos en la mejor forma de construir su producto.',
        },
        {
          role: 'IT Project Manager',
          company: 'IURCO',
          period: '2024 — 2025',
          description:
            'Responsable de supervisar múltiples proyectos simultáneamente, desde la planificación inicial hasta la entrega final, coordinando con product owners y stakeholders para definir alcance y procesos.',
        },
        {
          role: 'IT Project Leader',
          company: 'Mercado Libre',
          period: '2022 — 2024',
          description:
            'Lideré un equipo de desarrolladores en la unidad de logística de Mercado Libre, gestionando el ciclo de vida completo del desarrollo bajo metodologías Agile y Scrum.',
          highlights: [
            'Orquesté la planificación, ejecución y entrega end-to-end de una plataforma Adobe Commerce desde cero para un retailer líder de electrónica de consumo en Argentina, con integraciones a SAP y BigQuery.',
            'Mejoré métricas operativas clave del equipo de IT en un 30% en un trimestre mediante análisis de datos y rediseño de procesos.',
          ],
        },
        {
          role: 'Senior Developer / Project Manager',
          company: 'Serfe',
          period: '2018 — 2022',
          description:
            'Roles de project manager y team lead en 3 proyectos simultáneos con equipos de hasta 6 desarrolladores. Configuración de infraestructura AWS (Amplify) y automatización de testing para un enfoque CI/CD.',
        },
        {
          role: 'Desarrollador Web',
          company: 'Freelance',
          period: '2017 — 2018',
          description:
            'Desarrollé y completé dos proyectos de forma independiente: un showroom online en WordPress para una empresa de equipamiento comercial, y un sistema de gestión de expedientes en PHP/MySQL para una secretaría pública de educación.',
        },
        {
          role: 'Full-Stack Developer',
          company: 'Serfe',
          period: '2014 — 2017',
          description:
            'Desarrollo en PHP, JavaScript y SQL sobre Drupal, WordPress, Joomla y CodeIgniter, con configuración de servidores LAMP.',
        },
      ],
    },
    contact: {
      heading: 'Hablemos',
      intro:
        'Contame en qué estás trabajando y cómo puedo ayudarte. Te respondo a la brevedad.',
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
        },
        {
          role: 'IT Project Leader',
          company: 'Mercado Libre',
          period: '2022 — 2024',
          description:
            "Led a team of developers in Mercado Libre's shipping unit, managing the full software development lifecycle under Agile and Scrum methodologies.",
          highlights: [
            'Orchestrated the end-to-end planning, execution, and delivery of a from-scratch Adobe Commerce platform for a market-leading consumer electronics retailer in Argentina, with SAP and BigQuery integrations.',
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
    },
  },
};
