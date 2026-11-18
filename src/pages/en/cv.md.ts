import type { APIRoute } from 'astro';
import { cvMarkdown } from '../../lib/cv-markdown';

export const GET: APIRoute = () =>
  new Response(cvMarkdown('en'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
