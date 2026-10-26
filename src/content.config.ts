import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().default('Luciano Perez Ruiz'),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()),
      lang: z.enum(['es', 'en']),
      draft: z.boolean().default(true),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      // Republished posts: the original article's URL (used as the page's canonical) and the
      // name of the site it was first published on (shown in the attribution note).
      canonicalUrl: z.string().url().optional(),
      canonicalSiteName: z.string().optional()
    })
});

export const collections = { blog };
