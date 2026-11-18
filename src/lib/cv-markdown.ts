import { contactDetails, content, type Locale } from '../i18n/content';

// Plain-Markdown versions of the CV for assistants and crawlers that read text
// better than HTML (/cv.md, /en/cv.md and /llms.txt). Everything comes from
// content.ts, so they can't drift from the page.

export const site = 'https://luciano-consulting.web.app';

export const cvMarkdownPath: Record<Locale, string> = { es: '/cv.md', en: '/en/cv.md' };

// The copy uses non-breaking hyphens (U+2011) so words don't wrap on the page;
// in plain text a regular hyphen is easier to read and search.
const plain = (text: string) => text.replace(/‑/g, '-');

const labels = {
  es: {
    location: 'Santa Fe, Argentina · disponible para roles remotos',
    profile: 'Perfil',
    experience: 'Experiencia',
    skills: 'Habilidades',
    education: 'Formación',
    languages: 'Idiomas',
    contact: 'Contacto',
    pdf: 'CV en PDF',
    web: 'CV online',
  },
  en: {
    location: 'Santa Fe, Argentina · open to remote roles',
    profile: 'Profile',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    contact: 'Contact',
    pdf: 'PDF CV',
    web: 'Online CV',
  },
} as const;

export function cvMarkdown(locale: Locale): string {
  const c = content[locale];
  const l = labels[locale];
  const home = new URL(locale === 'en' ? '/en/' : '/', site).href;
  const lines: string[] = [];

  lines.push(`# ${c.hero.firstName} ${c.hero.lastName}`, '');
  lines.push(`**${c.footer.role} · Product Owner** · ${l.location}`, '');
  lines.push(`> ${plain(c.hero.lead)}`, '');

  lines.push(`## ${l.profile}`, '', plain(c.profile.lead), '', plain(c.profile.body), '');

  lines.push(`## ${l.experience}`, '');
  for (const job of c.experience.items) {
    lines.push(`### ${plain(job.role)} · ${job.company} (${job.years})`, '');
    if (job.link) lines.push(job.link.href, '');
    lines.push(plain(job.description), '');
    for (const h of job.highlights ?? []) lines.push(`- **${h.year}:** ${plain(h.text)}`);
    if (job.highlights?.length) lines.push('');
  }

  lines.push(`## ${l.skills}`, '');
  for (const group of c.skills.groups) lines.push(`- **${group.title}:** ${group.items.map(plain).join(', ')}`);
  lines.push('');

  lines.push(`## ${l.education}`, '');
  for (const item of c.education.items) {
    lines.push(`- ${plain(item.name)} · ${item.org}${item.year ? ` · ${item.year}` : ''}`);
  }
  lines.push('');

  lines.push(`## ${l.languages}`, '');
  for (const lang of c.education.languages) lines.push(`- ${lang.name}: ${lang.level}`);
  lines.push('');

  lines.push(`## ${l.contact}`, '');
  lines.push(`- Email: ${contactDetails.email}`);
  lines.push(`- LinkedIn: ${contactDetails.linkedinUrl}`);
  lines.push(`- ${l.web}: ${home}`);
  lines.push(`- ${l.pdf}: ${new URL(c.cvPdf, site).href}`);
  lines.push('');

  return lines.join('\n');
}

export function llmsTxt(): string {
  const en = content.en;
  return [
    `# ${en.hero.firstName} ${en.hero.lastName}`,
    '',
    `> ${plain(en.meta.description)}`,
    '',
    `${en.footer.role} and Product Owner based in Santa Fe, Argentina, open to remote Technical / IT Project Manager and Product Owner roles. Started as a full-stack developer; led teams at Mercado Libre and a software factory; today runs client projects at Pipa Code Studio and his own product, Tino (estudiantino.com.ar), with teams of developers and AI agents.`,
    '',
    '## CV',
    '',
    `- [CV (English, Markdown)](${new URL(cvMarkdownPath.en, site).href}): full CV as plain text`,
    `- [CV (Español, Markdown)](${new URL(cvMarkdownPath.es, site).href}): CV completo en texto plano`,
    `- [CV (English, PDF)](${new URL(en.cvPdf, site).href})`,
    `- [CV (Español, PDF)](${new URL(content.es.cvPdf, site).href})`,
    `- [Online CV](${site}/): the same content as a web page (Spanish; English at /en/)`,
    '',
    '## Contact',
    '',
    `- Email: ${contactDetails.email}`,
    `- LinkedIn: ${contactDetails.linkedinUrl}`,
    `- Book a 30-minute call: ${site}/en/#booking`,
    '',
    '## Optional',
    '',
    `- [Blog](${site}/en/blog/): notes on delivery, product and AI-assisted teams`,
    '',
  ].join('\n');
}
