import { content, type Locale, type SiteContent } from './content';

// Developer version of the online CV (/developer/ and /en/developer/). It reuses
// everything from the PM CV (nav, booking, contact, footer…) and overrides only
// what changes: title, hero, profile, experience, skills and the PDF.

export const developerPath: Record<Locale, string> = { es: '/developer/', en: '/en/developer/' };
export const developerMarkdownPath: Record<Locale, string> = { es: '/developer/cv.md', en: '/en/developer/cv.md' };

const es = content.es;
const en = content.en;

export const developerContent: Record<Locale, SiteContent> = {
  es: {
    ...es,
    cvPdf: '/Luciano_Perez_Ruiz_CV_Dev_ES.pdf',
    meta: {
      title: 'Luciano Perez Ruiz — Desarrollador Full‑Stack (TypeScript, React, Node)',
      description:
        'Desarrollador full‑stack con más de 12 años en productos web y mobile: React, Next.js, React Native, Node, NestJS, Supabase y AWS. Construyo de punta a punta, con agentes de IA y un flujo de trabajo prolijo.',
    },
    nav: { ...es.nav, downloadCv: 'Descargar CV de desarrollador (PDF) ↓' },
    hero: {
      ...es.hero,
      lead: 'Desarrollador full‑stack · TypeScript, React, Next.js y Node. Más de 12 años construyendo productos web y mobile, de la base de datos al deploy.',
      ctaCv: 'Descargar CV (PDF) ↓',
      crossLink: { label: '¿Buscás un IT / Technical PM? Ver mi perfil de gestión →', href: '/' },
    },
    profile: {
      label: '01 — PERFIL',
      lead: 'Escribo código pensando en el producto completo: alcance, trade‑offs, tests y producción.',
      body: 'Empecé con PHP, JavaScript y SQL sobre LAMP y WordPress, y hoy trabajo en monorepos TypeScript con React, Next.js, React Native, Node y NestJS. Pasé varios años liderando entregas en Mercado Libre y en una software factory, y en 2026 volví a construir de primera mano: lancé mi propio producto, Tino, de punta a punta, y llevo el repo, el CI/CD y la infraestructura de un marketplace para un cliente. Trabajo a diario con agentes de IA (Claude Code) dentro de un flujo prolijo: planificar antes de codear, PRs chicos, y tests y CI como condición para mergear.',
    },
    experience: {
      label: '02 — EXPERIENCIA',
      heading: 'Del código al producto en producción.',
      items: [
        {
          years: '2026 — Hoy',
          company: 'Tino · proyecto propio',
          role: 'Fundador · Desarrollador full‑stack',
          description:
            'App de estudio con repetición espaciada para estudiantes de Abogacía y cursos de habilitación. La construí solo, de la idea a producción en unos 2 meses, en un monorepo TypeScript con npm workspaces.',
          link: { label: 'estudiantino.com.ar ↗', href: 'https://estudiantino.com.ar' },
          highlights: [
            {
              year: 'App',
              text: 'Expo / React Native con Expo Router, publicada como PWA instalable (service worker y caché para uso con mala conexión). Motor de repetición espaciada (ts‑fsrs) en un paquete compartido con tests en Vitest.',
            },
            {
              year: 'API',
              text: 'Supabase: esquema Postgres con row‑level security, migraciones y 30 suites de tests pgTAP. Edge Functions para cobros con Mercado Pago, de pago único y suscripción (webhooks validados), y mails transaccionales.',
            },
            {
              year: 'Web',
              text: 'Panel de administración en Next.js 16 + Tailwind v4 (catálogo, revisión de contenido, estudiantes, reportes, precios) y landing en Astro sobre Cloudflare Pages, con una página por materia para SEO.',
            },
            {
              year: 'Datos',
              text: 'Pipeline en Python (Docling, OCR) que convierte manuales en bancos de preguntas con generación por IA y revisión humana.',
            },
          ],
        },
        {
          years: '2026 — Hoy',
          company: 'pipacode.studio',
          role: 'Cofundador · Tech Lead / PM',
          description:
            'Estudio de software. En Carn.AR, el MVP de un marketplace de carne para una cadena de carnicerías con 4 sucursales, llevo el repo, la infraestructura y el CI, y coordino a 2 desarrolladores full‑stack.',
          link: { label: 'pipacode.studio ↗', href: 'https://pipacode.studio' },
          highlights: [
            {
              year: 'Stack',
              text: 'Monorepo con Turborepo + pnpm: API REST en NestJS con OpenAPI y cliente tipado generado, Prisma, PostgreSQL/PostGIS, tienda y panel en Next.js 16, esquemas zod compartidos.',
            },
            {
              year: 'Infra',
              text: 'Entornos con Docker Compose, Caddy, MinIO, backups automáticos de Postgres, provisión del servidor, CI/CD con GitHub Actions, Sentry y monitoreo de disponibilidad.',
            },
            {
              year: 'Flujo',
              text: 'Conventional Commits, PRs chicos con review cruzada, y reglas, skills y hooks compartidos para que el agente de IA de cada desarrollador planifique antes de codear.',
            },
          ],
        },
        {
          years: '2024 — 2025',
          company: 'IURCO',
          role: 'IT Project Manager',
          description:
            'Software factory. Lideré la entrega de varios proyectos de clientes, trabajando con cada equipo en el diseño de la solución.',
          highlights: [
            {
              year: '2025',
              text: 'Lideré un equipo de 6 desarrolladores que construyó desde cero una plataforma Adobe Commerce (Magento 2) para un retailer líder de electrónica en Argentina, con integraciones con SAP y Google BigQuery. Lanzada en fecha, con el 100% del alcance.',
            },
          ],
        },
        {
          years: '2022 — 2024',
          company: 'Mercado Libre',
          role: 'IT Project Leader (líder de equipo)',
          description:
            'Lideré un equipo de desarrollo en la unidad de envíos durante todo el ciclo de vida del software con Agile/Scrum, definiendo las soluciones técnicas junto con el líder técnico. Servicios en Go y SQL sobre Fury, la plataforma cloud interna de Mercado Libre construida sobre servicios de AWS, con monitoreo en Sentry y Jira. También llevé contratación y desempeño del equipo.',
          highlights: [
            {
              year: '2024',
              text: 'Análisis de métricas de nivel 2 y diseño de soluciones con el equipo: mejora del 30% en métricas clave en un trimestre.',
            },
          ],
        },
        {
          years: '2018 — 2022',
          company: 'Serfe',
          role: 'Senior Developer / Project Manager',
          description:
            'Senior developer y team lead en 3 proyectos simultáneos con equipos de hasta 6 desarrolladores. Configuré AWS (apps en Amplify, repositorios y testing automatizado) para habilitar CI/CD.',
          highlights: [
            {
              year: '2022',
              text: 'Everprep: beta launch de una plataforma de estudio multi‑tenant de gran escala sobre AWS + React (Lambda, DynamoDB, S3, Cognito, Amplify). Publicada en App Store y Google Play. Di la capacitación interna de AWS Amplify.',
            },
            { year: '2021', text: '45R: construí y lancé una tienda WooCommerce.' },
            { year: '2020', text: 'Bluejacketeer: rediseño de la web app y nueva app mobile en React Native, publicada en App Store y Google Play.' },
            { year: '2019', text: 'Metro‑Manhattan: construí y lancé un sitio inmobiliario.' },
          ],
        },
        {
          years: '2017 — 2018',
          company: 'Independiente',
          role: 'Desarrollador web',
          description:
            'SIGE, sistema web de gestión de legajos para la Regional IV de Educación de Santa Fe (PHP/CodeIgniter, MySQL, jQuery): relevamiento, desarrollo, deploy y capacitación del personal. Patrone Equipamientos: showroom en WordPress con setup de marketing digital.',
        },
        {
          years: '2014 — 2017',
          company: 'Serfe',
          role: 'Desarrollador full‑stack',
          description:
            'Análisis de requerimientos, estimación y desarrollo de proyectos web en PHP, JavaScript y SQL con Drupal, WordPress, Joomla, CodeIgniter, jQuery y Bootstrap sobre servidores LAMP, con Git.',
        },
      ],
    },
    skills: {
      label: '03 — STACK',
      groups: [
        { title: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'Python', 'Go (conocimiento práctico)'] },
        { title: 'Frontend', items: ['React', 'Next.js (App Router)', 'React Native / Expo', 'Astro', 'Tailwind CSS', 'PWA'] },
        {
          title: 'Backend y datos',
          items: ['Node.js', 'NestJS', 'Supabase', 'Prisma', 'PostgreSQL / PostGIS', 'DynamoDB', 'MySQL', 'REST / OpenAPI'],
        },
        {
          title: 'Cloud y DevOps',
          items: ['AWS (Lambda, DynamoDB, S3, Cognito, EC2, Amplify)', 'Docker', 'GitHub Actions', 'Cloudflare Pages', 'Vercel', 'Firebase Hosting', 'Sentry'],
        },
        { title: 'Testing', items: ['Vitest', 'Playwright (e2e)', 'pgTAP'] },
        {
          title: 'Comercio, CMS e IA',
          items: ['Mercado Pago', 'Adobe Commerce (Magento 2)', 'WooCommerce', 'WordPress', 'Claude Code (agentes, skills, hooks)', 'Claude API'],
        },
      ],
    },
    footer: { ...es.footer, role: 'Desarrollador Full‑Stack · TypeScript / React / Node' },
  },
  en: {
    ...en,
    cvPdf: '/Luciano_Perez_Ruiz_CV_Dev_EN.pdf',
    meta: {
      title: 'Luciano Perez Ruiz — Full‑Stack Developer (TypeScript, React, Node)',
      description:
        'Full‑stack developer with 12+ years building web and mobile products: React, Next.js, React Native, Node, NestJS, Supabase and AWS. I build end to end, with AI coding agents inside a disciplined workflow.',
    },
    nav: { ...en.nav, downloadCv: 'Download developer CV (PDF) ↓' },
    hero: {
      ...en.hero,
      lead: 'Full‑stack developer · TypeScript, React, Next.js and Node. 12+ years building web and mobile products, from the database to the deploy.',
      ctaCv: 'Download CV (PDF) ↓',
      crossLink: { label: 'Looking for an IT / Technical PM? See my management profile →', href: '/en/' },
    },
    profile: {
      label: '01 — PROFILE',
      lead: 'I write code with the whole product in mind: scope, trade‑offs, tests and production.',
      body: 'I started with PHP, JavaScript and SQL on LAMP and WordPress, and today I work in TypeScript monorepos with React, Next.js, React Native, Node and NestJS. I spent several years leading delivery at Mercado Libre and a software factory, and in 2026 I went back to building hands‑on: I shipped my own product, Tino, end to end, and I own the repo, CI/CD and infrastructure of a client marketplace. I work daily with AI coding agents (Claude Code) inside a disciplined workflow: planning before code, small PRs, and tests and CI as merge gates.',
    },
    experience: {
      label: '02 — EXPERIENCE',
      heading: 'From code to products in production.',
      items: [
        {
          years: '2026 — Present',
          company: 'Tino · own product',
          role: 'Founder · Full‑Stack Developer',
          description:
            'A spaced‑repetition study app for law students and licensing courses. Built solo, from idea to production in about 2 months, in an npm‑workspaces TypeScript monorepo.',
          link: { label: 'estudiantino.com.ar ↗', href: 'https://estudiantino.com.ar' },
          highlights: [
            {
              year: 'App',
              text: 'Expo / React Native with Expo Router, shipped as an installable PWA (service worker, offline‑friendly caching). Spaced‑repetition engine (ts‑fsrs) in a shared core package tested with Vitest.',
            },
            {
              year: 'API',
              text: 'Supabase: Postgres schema with row‑level security, migrations and 30 pgTAP test suites. Edge Functions for Mercado Pago one‑time and subscription payments (validated webhooks) and transactional emails.',
            },
            {
              year: 'Web',
              text: 'Admin panel in Next.js 16 + Tailwind v4 (catalog, content review, students, reports, pricing) and an Astro landing site on Cloudflare Pages with one SEO page per subject.',
            },
            {
              year: 'Data',
              text: 'Python pipeline (Docling, OCR) that turns textbooks into question banks with AI generation and human review.',
            },
          ],
        },
        {
          years: '2026 — Present',
          company: 'pipacode.studio',
          role: 'Co‑founder · Tech Lead / PM',
          description:
            'Software studio. On Carn.AR, a meat marketplace MVP for a 4‑branch butcher chain, I own the repo, infrastructure and CI, and coordinate 2 full‑stack developers.',
          link: { label: 'pipacode.studio ↗', href: 'https://pipacode.studio' },
          highlights: [
            {
              year: 'Stack',
              text: 'Turborepo + pnpm monorepo: NestJS REST API with OpenAPI and a generated typed client, Prisma, PostgreSQL/PostGIS, Next.js 16 storefront and admin, shared zod schemas.',
            },
            {
              year: 'Infra',
              text: 'Docker Compose environments, Caddy, MinIO, automated Postgres backups, server provisioning, GitHub Actions CI/CD, Sentry and uptime monitoring.',
            },
            {
              year: 'Flow',
              text: 'Conventional Commits, small cross‑reviewed PRs, and shared rules, skills and hooks so each developer’s AI agent plans before coding.',
            },
          ],
        },
        {
          years: '2024 — 2025',
          company: 'IURCO',
          role: 'IT Project Manager',
          description:
            'Software factory. Led delivery of several client projects, working closely with each team on solution design.',
          highlights: [
            {
              year: '2025',
              text: 'Led a 6‑developer team building a from‑scratch Adobe Commerce (Magento 2) platform for a leading consumer‑electronics retailer in Argentina, with SAP and Google BigQuery integrations. Launched on schedule with 100% of scope.',
            },
          ],
        },
        {
          years: '2022 — 2024',
          company: 'Mercado Libre',
          role: 'IT Project Leader (Team Lead)',
          description:
            'Led a development team in the shipping unit across the full software lifecycle under Agile/Scrum, defining technical solutions together with the tech lead. Go and SQL services on Fury, Mercado Libre’s internal cloud platform built on AWS services, with Sentry monitoring and Jira. Also owned hiring and performance for the team.',
          highlights: [
            {
              year: '2024',
              text: 'Analyzed level‑2 metrics and designed solutions with the team, improving core metrics by 30% in one quarter.',
            },
          ],
        },
        {
          years: '2018 — 2022',
          company: 'Serfe',
          role: 'Senior Developer / Project Manager',
          description:
            'Senior developer and team lead on 3 concurrent projects with teams of up to 6 developers. Owned AWS setup (Amplify apps, repositories, automated testing) enabling CI/CD.',
          highlights: [
            {
              year: '2022',
              text: 'Everprep: beta launch of a large multi‑tenant study platform on AWS + React (Lambda, DynamoDB, S3, Cognito, Amplify). Published to the App Store and Google Play. Gave the company’s internal AWS Amplify training.',
            },
            { year: '2021', text: '45R: built and launched a WooCommerce store.' },
            { year: '2020', text: 'Bluejacketeer: web app redesign and a new React Native mobile app, published to the App Store and Google Play.' },
            { year: '2019', text: 'Metro‑Manhattan: built and launched a real‑estate website.' },
          ],
        },
        {
          years: '2017 — 2018',
          company: 'Independent',
          role: 'Web Developer',
          description:
            'SIGE, a records‑management web app for Santa Fe’s Regional IV Education authority (PHP/CodeIgniter, MySQL, jQuery): requirements, development, deployment and staff training. Patrone Equipamientos: WordPress showroom with a digital‑marketing setup.',
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
      label: '03 — STACK',
      groups: [
        { title: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'Python', 'Go (working knowledge)'] },
        { title: 'Frontend', items: ['React', 'Next.js (App Router)', 'React Native / Expo', 'Astro', 'Tailwind CSS', 'PWA'] },
        {
          title: 'Backend & data',
          items: ['Node.js', 'NestJS', 'Supabase', 'Prisma', 'PostgreSQL / PostGIS', 'DynamoDB', 'MySQL', 'REST / OpenAPI'],
        },
        {
          title: 'Cloud & DevOps',
          items: ['AWS (Lambda, DynamoDB, S3, Cognito, EC2, Amplify)', 'Docker', 'GitHub Actions', 'Cloudflare Pages', 'Vercel', 'Firebase Hosting', 'Sentry'],
        },
        { title: 'Testing', items: ['Vitest', 'Playwright (e2e)', 'pgTAP'] },
        {
          title: 'Commerce, CMS & AI',
          items: ['Mercado Pago', 'Adobe Commerce (Magento 2)', 'WooCommerce', 'WordPress', 'Claude Code (agents, skills, hooks)', 'Claude API'],
        },
      ],
    },
    footer: { ...en.footer, role: 'Full‑Stack Developer · TypeScript / React / Node' },
  },
};
