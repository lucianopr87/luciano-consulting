import { getCollection, type CollectionEntry } from 'astro:content';
import { content, type Locale } from '../i18n/content';

export type BlogPost = CollectionEntry<'blog'>;

/** Published posts for a locale, newest first. */
export async function getPublishedPosts(locale: Locale): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => data.lang === locale && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postHref(locale: Locale, post: BlogPost): string {
  return `${locale === 'es' ? '' : '/en'}/blog/${post.id}/`;
}

/** "23 SEP 2026 · EQUIPOS · MÉTRICAS": pub date plus the first two tags. */
export function postMeta(locale: Locale, post: BlogPost): string {
  const date = post.data.pubDate;
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = content[locale].blog.months[date.getUTCMonth()];
  const tags = post.data.tags.slice(0, 2).map((tag) => tag.toLocaleUpperCase(locale));
  return [`${day} ${month} ${date.getUTCFullYear()}`, ...tags].join(' · ');
}

/**
 * BlogPosting JSON-LD for a post. Republished posts (`canonicalUrl`) point `url` and
 * `mainEntityOfPage` at the original, so search engines credit that copy as the source.
 */
export function postJsonLd(post: BlogPost, pageUrl: URL): Record<string, unknown> {
  const { title, description, author, pubDate, lang, canonicalUrl, canonicalSiteName } = post.data;
  const originalUrl = canonicalUrl ?? pageUrl.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    inLanguage: lang,
    datePublished: pubDate.toISOString().slice(0, 10),
    author: {
      '@type': 'Person',
      name: author,
      url: new URL('/', pageUrl).href,
      sameAs: ['https://www.linkedin.com/in/luciano-perez-ruiz'],
    },
    url: originalUrl,
    mainEntityOfPage: originalUrl,
    ...(canonicalUrl && {
      isBasedOn: canonicalUrl,
      publisher: { '@type': 'Organization', name: canonicalSiteName, url: new URL('/', canonicalUrl).href },
    }),
  };
}
