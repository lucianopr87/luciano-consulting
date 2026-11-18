# Luciano Consulting — Sitio web

CV online de Luciano Perez Ruiz (IT / Technical Project Manager), bilingüe (ES/EN), con blog, reserva de reuniones y formulario de contacto. Construido con [Astro](https://docs.astro.build) + Tailwind, desplegado en Firebase Hosting.

## Estructura

```text
/
├── src/
│   ├── pages/           # index.astro (es), en/index.astro, privacy.astro, en/privacy.astro, 404.astro
│   │                     # blog/index.astro + blog/[slug].astro (es), en/blog/ (en)
│   ├── content/blog/    # posts del blog (Markdown, un archivo por post, ver sección Blog abajo)
│   ├── content.config.ts # schema de la content collection "blog"
│   ├── components/      # Header (+ menú overlay), Hero, Profile, Experience, Skills, Education,
│   │                     # BlogTeaser + BlogCard, Booking, Contact, Footer, CookieConsent
│   ├── assets/          # luciano-portrait.jpg (foto del hero, Astro la optimiza a WebP)
│   ├── lib/blog.ts      # helpers del blog: posts publicados por locale, href y meta de cada card
│   ├── layouts/Layout.astro
│   ├── styles/global.css # tokens de diseño (paleta, Geist / Geist Mono) + estilos de .prose
│   └── i18n/content.ts  # todo el copy del sitio, por locale (es/en), ids de secciones y datos de contacto
├── apps-script/          # backend de reservas (Google Apps Script), ver apps-script/README.md
├── e2e/                 # tests end-to-end (Playwright)
└── .github/workflows/   # deploy-staging.yml (develop), deploy.yml (main)
```

## Diseño

- La home es un **CV online de una sola página**: Hero → Perfil → Experiencia → Habilidades → Formación → Blog (últimos posts) → Reservar reunión → Contacto. Cada sección tiene un id fijo, igual en ambos idiomas (`#top`, `#profile`, `#experience`, `#skills`, `#education`, `#blog`, `#booking`, `#contact`, definidos en `sectionIds` de `content.ts`), así los links tipo `/#contact` que usan los posts siguen funcionando.
- Tokens (colores, tipografías) en el `@theme` de `src/styles/global.css`: fondo papel `#f6f4f0`, tinta `#1a1917`, acento terracota `#b5542f`, secciones oscuras `#1a1917`. Tipografía Geist (texto) y Geist Mono (labels, fechas, horarios). Sin sombras: jerarquía por bordes hairline y fondos.
- El menú está **siempre colapsado** (desktop y mobile): botón "Menú" en el header que abre un overlay a pantalla completa con las secciones, contacto directo, descarga del CV y el switch de idioma. Además, el header tiene un **toggle de idioma `ES | EN` siempre visible** (el idioma actual resaltado), que respeta la página actual igual que el del menú. En mobile (<640px) el header muestra solo el monograma y el ícono de menú, sin el nombre ni la palabra "Menú" (siguen disponibles para lectores de pantalla), para que entre el toggle. Se cierra con "Cerrar", con Esc o al elegir un link, y bloquea el scroll del body mientras está abierto.
- El CV descargable es un PDF por idioma: `public/Luciano_Perez_Ruiz_CV_ES.pdf` en la versión ES y `public/Luciano_Perez_Ruiz_CV_EN.pdf` en la EN (definido en `cvPdf` de `content.ts`). Al actualizar el CV hay que reemplazar los dos.
- Identidad: monograma "LPR". Favicons, `apple-touch-icon`, `icon-192/512` y `og-image.png` se generaron con esa identidad (no hay fuente editable en el repo; si hace falta regenerarlos, se renderizó HTML con Geist y se capturó con Playwright).

## Perfil de desarrollador (`/developer/`)

- `/developer/` (ES) y `/en/developer/` (EN): la misma experiencia contada para roles de desarrollo full-stack/frontend. Usa los mismos componentes y secciones que el home; solo cambia el contenido, definido en `src/i18n/developer.ts`, que parte de `content.ts` y pisa el título, el hero, el perfil, la experiencia, el stack y el PDF.
- PDFs propios: `public/Luciano_Perez_Ruiz_CV_Dev_ES.pdf` y `_EN.pdf`. Al actualizar el CV de desarrollador hay que reemplazar los dos.
- Los dos perfiles se enlazan entre sí desde el hero (`hero.crossLink`). En `/developer/`, el menú apunta a las secciones de esa página (prop `sectionsPath` del `Header`) y el toggle de idioma lleva a la otra versión de desarrollador.
- Markdown: `/developer/cv.md` y `/en/developer/cv.md`, también listados en `/llms.txt`.
- Cobertura: `e2e/developer.spec.ts`.

## Versiones para IA y buscadores

- `/llms.txt` (convención [llms.txt](https://llmstxt.org)): quién es Luciano, qué roles busca y links a los CV en Markdown y PDF, y a los datos de contacto. En inglés, porque es lo que leen la mayoría de los asistentes.
- `/cv.md` y `/en/cv.md`: el CV completo en Markdown, para asistentes y rastreadores que leen mejor texto plano que HTML. Cada home los declara con `<link rel="alternate" type="text/markdown">`.
- Los tres se generan en el build desde `src/i18n/content.ts` (`src/lib/cv-markdown.ts` + endpoints en `src/pages/`), así que nunca se desincronizan con la página: si cambia el copy, cambian solos.
- El `Layout` publica un JSON-LD con un `@graph` que tiene la `Person` (cargo, empleador, temas, idiomas y perfiles) y Tino como `SoftwareApplication` creada por esa persona. Si cambia el rol o el empleador, actualizar `personJsonLd` en `src/layouts/Layout.astro`.
- Cobertura: `e2e/llms.spec.ts`.

## Comandos

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala dependencias |
| `astro dev --background` | Levanta el dev server en background (ver `astro dev stop/status/logs`) |
| `npm run build` | Build de producción a `./dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run test:e2e` | Corre los tests end-to-end (Playwright) |

## Variables de entorno

Definidas en `.env` local (ver `.env.example`) y, para CI/deploy, como variables de GitHub Actions (nunca hardcodeadas en el código):

| Variable | Para qué sirve | Dónde se carga |
| :--- | :--- | :--- |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Access key del formulario de contacto (Web3Forms) | Repo Variable distinta por ambiente: `WEB3FORMS_ACCESS_KEY_PROD` / `WEB3FORMS_ACCESS_KEY_STAGING` |
| `PUBLIC_GA_ID` | Measurement ID de Google Analytics (GA4) | Variable del GitHub Environment `production` (`GA_ID`). **No se define en staging a propósito** — ver sección Analytics abajo |
| `PUBLIC_GSC_VERIFICATION` | Contenido del meta tag de verificación de Google Search Console | Repo Variable `GSC_VERIFICATION`, igual en ambos ambientes |
| `PUBLIC_BOOKING_ENDPOINT` | URL `/exec` del Web App de Apps Script que usa el widget de reserva de la home (ver `apps-script/README.md`) | Repo Variable `BOOKING_ENDPOINT`, igual en ambos ambientes (un solo backend, no hay uno de staging separado) |
| `PUBLIC_BOOKING_ENV` | `staging` o `production` — el backend usa esto solo para prefijar `[STAGING TEST]` el título de los eventos creados desde staging | Hardcodeada en cada workflow (`deploy-staging.yml` / `deploy.yml`), no es una variable de GitHub |

Ninguna de estas variables se commitea con su valor real — los workflows las inyectan en build time desde GitHub Actions.

## Cookies y Google Analytics

- El sitio usa el snippet estándar de `gtag.js` (GA4), inyectado en `src/layouts/Layout.astro` solo cuando `PUBLIC_GA_ID` está definido. En staging esa variable no se setea, así que ahí el sitio corre **sin ningún script de analytics ni banner de cookies**.
- **Decisión de producto:** el tracking arranca desde la carga de la página, sin esperar ninguna acción del visitante. No se implementó un gate de consentimiento (Consent Mode) porque el sitio no espera tráfico relevante desde la UE, y gatear el tracking hubiera significado perder datos de visitas sin beneficio real.
- El banner que aparece (`src/components/CookieConsent.astro`) es **puramente informativo**: avisa que se usa Google Analytics y linkea a `/privacy/`. El botón "Entendido" no afecta el tracking en absoluto — solo guarda `cookie-notice-dismissed` en `localStorage` para no volver a mostrar el aviso en ese navegador.
- El copy de la política de privacidad (`content.ts` → `privacy`) explica esto mismo a los visitantes, y menciona cómo bloquear las cookies de Analytics desde el navegador si alguien no quiere ser trackeado.
- Verificación de Google Search Console: el meta tag se agrega en el `<head>` vía `PUBLIC_GSC_VERIFICATION`, independiente de si GA está activo o no (para que la verificación del sitio no dependa del estado de Analytics).
- El formulario de contacto tiene pastillas de "motivo" (multi-select, opcionales); se mandan a Web3Forms como un campo `motivos` con los valores separados por comas.
- Al enviarse el formulario de contacto con éxito se dispara un evento GA4 `generate_lead` (`src/components/Contact.astro`). Como en staging no hay `PUBLIC_GA_ID`, ahí no se puede ver el evento en tiempo real — la cobertura real está en el e2e (`e2e/contact-form.spec.ts`, que intercepta `window.gtag`). En GA4 hay que marcarlo manualmente como conversión (Admin → Eventos) si no aparece marcado por default.
- Al confirmarse una reserva de reunión con éxito se dispara un evento GA4 `booking_confirmed` (`src/components/Booking.astro`), mismo patrón que `generate_lead` — cobertura real en `e2e/booking.spec.ts`, y en GA4 hay que marcarlo manualmente como conversión igual que el anterior.

## Reserva de reunión (Google Meet)

- Los visitantes pueden reservar una reunión de 30 minutos desde la sección `#booking` de la home (`/booking/` y `/en/booking/` quedaron como redirects a `/#booking` y `/en/#booking`, configurados en `redirects` de `astro.config.mjs`), eligiendo entre los horarios disponibles según una plantilla semanal fija (martes a jueves 10:00–17:00, viernes 11:00–15:00, hora Argentina) menos lo que ya está ocupado en el calendario real de Luciano. No se puede reservar el mismo día — el horario más próximo disponible es a partir del día siguiente — y el horizonte de reserva es de 2 semanas.
- El backend es un **Google Apps Script** deployado como Web App (`apps-script/`, ver `apps-script/README.md` para setup y troubleshooting), no Firebase Functions — corre autenticado como la cuenta de Google de Luciano sin necesitar OAuth ni ningún plan pago de Firebase/GCP. `src/components/Booking.astro` le pega directo por `fetch` (GET para disponibilidad, POST para reservar), sin pasar por Firebase Hosting. El widget agrupa los `slots` del GET por día (hora Argentina) y muestra solo los días con horarios; mientras carga muestra un skeleton. Los errores `slot_taken`, `invalid_slot` y `rate_limited` se muestran inline (los dos primeros además recargan la disponibilidad).
- Al confirmar una reserva, el backend crea el evento en el calendario con un link de Google Meet autogenerado y manda la invitación nativa de Google Calendar al visitante (con el link, `.ics`, etc.) — no hay un email de confirmación aparte.
- El POST manda el body como `Content-Type: text/plain` a propósito, para evitar que el navegador dispare un preflight CORS que el Web App de Apps Script no maneja.
- Como solo existe un calendario real (no hay un backend de staging separado), probar la reserva desde el sitio de staging manda un invite real — el evento queda tageado `[STAGING TEST]` en el título para poder identificarlo y borrarlo del calendario después de probar.

## Blog

- Los posts son archivos Markdown en `src/content/blog/`, uno por artículo, con frontmatter tipado (`title`, `description`, `pubDate`, `tags`, `lang`, `draft`) validado por el schema de `src/content.config.ts`.
- Portada opcional: `coverImage` (ruta relativa a una imagen en `src/content/blog/`) + `coverImageAlt`. Astro genera en build las versiones WebP de la portada del post y del thumbnail del listado, así que no hace falta crear thumbnails a mano; solo conviene recomprimir la imagen fuente antes de commitearla (p. ej. con `sharp`, JPEG calidad ~82) para no inflar el repo. Las versiones ES y EN de un post pueden compartir la misma imagen.
- Bilingüe vía el campo `lang` en el frontmatter (`'es' | 'en'`), no por carpetas separadas — cada ruta filtra la colección por `lang` y locale.
- `draft: true` (default) excluye el post del listado y de la generación de su página de detalle, en cualquier ambiente. Un post recién creado no es público hasta que se cambia a `draft: false` explícitamente.
- Rutas: `/blog/` y `/blog/[slug]/` en español, `/en/blog/` y `/en/blog/[slug]/` en inglés. El slug es el nombre del archivo (sin extensión).
- **Posts republicados** (ej. artículos escritos primero en [pipacode.studio](https://pipacode.studio)): se agregan `canonicalUrl` (URL del original) y `canonicalSiteName` (nombre del sitio) al frontmatter. Con eso la página declara como `rel="canonical"` (y `og:url`) al original, muestra la nota "Publicado originalmente en …" bajo el autor, su JSON-LD `BlogPosting` lleva `isBasedOn` al original con Luciano como autor, y queda excluida del sitemap (`astro.config.mjs`). Así Google consolida las señales en el original en vez de tratarlo como contenido duplicado. Los links relativos del original (otros posts, `/#contact`) se reescriben como absolutos al sitio de origen.
- Los links del Markdown que apuntan a otro sitio abren en una pestaña nueva (`target="_blank"` + `rel="noopener noreferrer"`), vía un plugin hast de Sätteri (el procesador de Markdown de Astro) definido en `astro.config.mjs`; los links internos (`/#contact`, otros posts) no se tocan.
- El body en Markdown se renderiza con estilos mínimos definidos en `.prose` (`src/styles/global.css`) — el sitio no usa el plugin de tipografía de Tailwind, solo un puñado de reglas a mano para párrafos, listas, negritas y links.

## Testing automatizado (Playwright)

- Los tests viven en `e2e/*.spec.ts` y corren contra un build real del sitio (`npm run build` + `npx serve dist`, ver `playwright.config.ts`), no contra el dev server. Se usa `serve` en vez de `astro preview` porque en este proyecto `astro preview` se demoniza en background y el proceso termina enseguida, lo que rompe el arranque del `webServer` de Playwright.
- Corren en dos "proyectos": **Desktop Chromium** y **Mobile Chromium** (emulando un Pixel 5), para cubrir el layout en ambos anchos (el menú es el mismo overlay en los dos).
- El build usado para testear define valores de prueba *ficticios* para `PUBLIC_GA_ID`, `PUBLIC_GSC_VERIFICATION`, `PUBLIC_WEB3FORMS_ACCESS_KEY` y `PUBLIC_BOOKING_ENDPOINT` (ver `playwright.config.ts`) — no son credenciales reales, solo lo necesario para que el banner de cookies, el snippet de GA y el widget de reserva se rendericen y puedan testearse. El envío del formulario de contacto y las llamadas al backend de reservas se interceptan (`page.route`) para no pegarle a la API real de Web3Forms ni al Apps Script real durante los tests.
- Qué cubren:
  - `site.spec.ts`: la home renderiza todas las secciones del CV (es/en), el link de descarga del CV apunta al PDF del idioma correspondiente y el PDF existe, y la página 404.
  - `header.spec.ts`: el nombre/monograma linkea al home del locale actual, "Reservar" lleva a `#booking`, el toggle de idioma del header es visible y marca el locale actual, y cambia de locale (con el `hreflang` correcto) respetando la página actual (ej. desde `/privacy/` va a `/en/privacy/`, no al home); el switch del menú también sigue funcionando.
  - `footer.spec.ts`: texto de copyright con el año actual, y el link a la política de privacidad es correcto y navegable en ambos locales.
  - `cookie-consent.spec.ts`: el banner aparece en la primera visita, GA trackea igual desde el arranque, y "Entendido" oculta el banner de forma persistente.
  - `menu.spec.ts`: el menú overlay abre/cierra (botón, Esc, click en un link), lista todas las secciones con el href correcto, bloquea el scroll y usa las etiquetas del idioma.
  - `contact-form.spec.ts`: envío exitoso con pastillas de motivo (verifica el campo `motivos` enviado), motivos opcionales, la tarjeta de "gracias" + "Enviar otro mensaje", y manejo de error (con la API mockeada).
  - `blog.spec.ts`: la home muestra las cards de los últimos posts (con fecha y tags) que linkean al post del mismo idioma, "Ver todos los artículos" lleva al índice del locale actual, y el toggle de idioma en el blog lleva al índice traducido (no al home), el CTA de cierre de los posts lleva al formulario de contacto del locale, el post de métricas aparece en el listado con su thumbnail, y los posts republicados (costos cloud) tienen canonical/og:url/JSON-LD apuntando al original en pipacode.studio, la nota de atribución, y no figuran en el sitemap (los posts propios mantienen su canonical), y los links externos dentro de un post abren en pestaña nueva (los internos no).
  - `booking.spec.ts`: elegir día y horario en la home, completar datos y confirmar (con el backend mockeado) muestra "Reunión solicitada" con el link de Meet y dispara `booking_confirmed`; también cubre solo-días-con-horarios, "horario ya ocupado", rate limit, sin horarios, que cambiar de día invalida el horario elegido, y los redirects de `/booking/`.
- **Se disparan automáticamente en cada push a `develop`**, como un job `test` en `.github/workflows/deploy-staging.yml` — el job `deploy` a staging depende de que los tests pasen (`needs: test`). Si un test falla, no se deploya esa versión a staging.
- Para correrlos en local: `npm run test:e2e` (Playwright levanta el preview server solo, según `playwright.config.ts`). Ojo: si ya hay algo escuchando en el puerto 4321 (p. ej. el dev server de otro proyecto Astro), Playwright lo reutiliza y los tests corren contra ese otro sitio.
