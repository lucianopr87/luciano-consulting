# Luciano Consulting — Sitio web

Sitio de consultoría IT, bilingüe (ES/EN), construido con [Astro](https://docs.astro.build) + Tailwind, desplegado en Firebase Hosting.

## Estructura

```text
/
├── src/
│   ├── pages/           # index.astro (es), en/index.astro, privacy.astro, en/privacy.astro, 404.astro
│   │                     # blog/index.astro + blog/[slug].astro (es), en/blog/ (en)
│   │                     # booking.astro (es), en/booking.astro
│   ├── content/blog/    # posts del blog (Markdown, un archivo por post, ver sección Blog abajo)
│   ├── content.config.ts # schema de la content collection "blog"
│   ├── components/      # Header, Hero, Services, About, Experience, Contact, Booking, Footer, CookieConsent
│   ├── layouts/Layout.astro
│   └── i18n/content.ts  # todo el copy del sitio, por locale (es/en)
├── apps-script/          # backend de reservas (Google Apps Script), ver apps-script/README.md
├── e2e/                 # tests end-to-end (Playwright)
└── .github/workflows/   # deploy-staging.yml (develop), deploy.yml (main)
```

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
| `PUBLIC_BOOKING_ENDPOINT` | URL `/exec` del Web App de Apps Script que sirve `/booking/` (ver `apps-script/README.md`) | Repo Variable `BOOKING_ENDPOINT`, igual en ambos ambientes (un solo backend, no hay uno de staging separado) |
| `PUBLIC_BOOKING_ENV` | `staging` o `production` — el backend usa esto solo para prefijar `[STAGING TEST]` el título de los eventos creados desde staging | Hardcodeada en cada workflow (`deploy-staging.yml` / `deploy.yml`), no es una variable de GitHub |

Ninguna de estas variables se commitea con su valor real — los workflows las inyectan en build time desde GitHub Actions.

## Cookies y Google Analytics

- El sitio usa el snippet estándar de `gtag.js` (GA4), inyectado en `src/layouts/Layout.astro` solo cuando `PUBLIC_GA_ID` está definido. En staging esa variable no se setea, así que ahí el sitio corre **sin ningún script de analytics ni banner de cookies**.
- **Decisión de producto:** el tracking arranca desde la carga de la página, sin esperar ninguna acción del visitante. No se implementó un gate de consentimiento (Consent Mode) porque el sitio no espera tráfico relevante desde la UE, y gatear el tracking hubiera significado perder datos de visitas sin beneficio real.
- El banner que aparece (`src/components/CookieConsent.astro`) es **puramente informativo**: avisa que se usa Google Analytics y linkea a `/privacy/`. El botón "Entendido" no afecta el tracking en absoluto — solo guarda `cookie-notice-dismissed` en `localStorage` para no volver a mostrar el aviso en ese navegador.
- El copy de la política de privacidad (`content.ts` → `privacy`) explica esto mismo a los visitantes, y menciona cómo bloquear las cookies de Analytics desde el navegador si alguien no quiere ser trackeado.
- Verificación de Google Search Console: el meta tag se agrega en el `<head>` vía `PUBLIC_GSC_VERIFICATION`, independiente de si GA está activo o no (para que la verificación del sitio no dependa del estado de Analytics).
- Al enviarse el formulario de contacto con éxito se dispara un evento GA4 `generate_lead` (`src/components/Contact.astro`). Como en staging no hay `PUBLIC_GA_ID`, ahí no se puede ver el evento en tiempo real — la cobertura real está en el e2e (`e2e/contact-form.spec.ts`, que intercepta `window.gtag`). En GA4 hay que marcarlo manualmente como conversión (Admin → Eventos) si no aparece marcado por default.
- Al confirmarse una reserva de reunión con éxito se dispara un evento GA4 `booking_confirmed` (`src/components/Booking.astro`), mismo patrón que `generate_lead` — cobertura real en `e2e/booking.spec.ts`, y en GA4 hay que marcarlo manualmente como conversión igual que el anterior.

## Reserva de reunión (Google Meet)

- Los visitantes pueden reservar una reunión de 30 minutos en `/booking/` (`/en/booking/`), eligiendo entre los horarios disponibles según una plantilla semanal fija (martes a jueves 10:00–17:00, viernes 11:00–15:00, hora Argentina) menos lo que ya está ocupado en el calendario real de Luciano. No se puede reservar el mismo día — el horario más próximo disponible es a partir del día siguiente — y el horizonte de reserva es de 2 semanas.
- El backend es un **Google Apps Script** deployado como Web App (`apps-script/`, ver `apps-script/README.md` para setup y troubleshooting), no Firebase Functions — corre autenticado como la cuenta de Google de Luciano sin necesitar OAuth ni ningún plan pago de Firebase/GCP. `src/components/Booking.astro` le pega directo por `fetch` (GET para disponibilidad, POST para reservar), sin pasar por Firebase Hosting.
- Al confirmar una reserva, el backend crea el evento en el calendario con un link de Google Meet autogenerado y manda la invitación nativa de Google Calendar al visitante (con el link, `.ics`, etc.) — no hay un email de confirmación aparte.
- El POST manda el body como `Content-Type: text/plain` a propósito, para evitar que el navegador dispare un preflight CORS que el Web App de Apps Script no maneja.
- Como solo existe un calendario real (no hay un backend de staging separado), probar la reserva desde el sitio de staging manda un invite real — el evento queda tageado `[STAGING TEST]` en el título para poder identificarlo y borrarlo del calendario después de probar.

## Blog

- Los posts son archivos Markdown en `src/content/blog/`, uno por artículo, con frontmatter tipado (`title`, `description`, `pubDate`, `tags`, `lang`, `draft`) validado por el schema de `src/content.config.ts`.
- Bilingüe vía el campo `lang` en el frontmatter (`'es' | 'en'`), no por carpetas separadas — cada ruta filtra la colección por `lang` y locale.
- `draft: true` (default) excluye el post del listado y de la generación de su página de detalle, en cualquier ambiente. Un post recién creado no es público hasta que se cambia a `draft: false` explícitamente.
- Rutas: `/blog/` y `/blog/[slug]/` en español, `/en/blog/` y `/en/blog/[slug]/` en inglés. El slug es el nombre del archivo (sin extensión).
- El body en Markdown se renderiza con estilos mínimos definidos en `.prose` (`src/styles/global.css`) — el sitio no usa el plugin de tipografía de Tailwind, solo un puñado de reglas a mano para párrafos, listas, negritas y links.

## Testing automatizado (Playwright)

- Los tests viven en `e2e/*.spec.ts` y corren contra un build real del sitio (`npm run build` + `npx serve dist`, ver `playwright.config.ts`), no contra el dev server. Se usa `serve` en vez de `astro preview` porque en este proyecto `astro preview` se demoniza en background y el proceso termina enseguida, lo que rompe el arranque del `webServer` de Playwright.
- Corren en dos "proyectos": **Desktop Chromium** y **Mobile Chromium** (emulando un Pixel 5), para cubrir tanto el nav de desktop como el menú hamburguesa mobile.
- El build usado para testear define valores de prueba *ficticios* para `PUBLIC_GA_ID`, `PUBLIC_GSC_VERIFICATION`, `PUBLIC_WEB3FORMS_ACCESS_KEY` y `PUBLIC_BOOKING_ENDPOINT` (ver `playwright.config.ts`) — no son credenciales reales, solo lo necesario para que el banner de cookies, el snippet de GA y el widget de reserva se rendericen y puedan testearse. El envío del formulario de contacto y las llamadas al backend de reservas se interceptan (`page.route`) para no pegarle a la API real de Web3Forms ni al Apps Script real durante los tests.
- Qué cubren:
  - `site.spec.ts`: carga de home (es/en) y página 404.
  - `header.spec.ts`: el logo linkea al home del locale actual, el switch de idioma cambia de locale (con el `hreflang` correcto) y respeta la página actual (ej. desde `/privacy/` va a `/en/privacy/`, no al home), y los links del nav de desktop apuntan a la sección correcta.
  - `footer.spec.ts`: texto de copyright con el año actual, y el link a la política de privacidad es correcto y navegable en ambos locales.
  - `cookie-consent.spec.ts`: el banner aparece en la primera visita, GA trackea igual desde el arranque, y "Entendido" oculta el banner de forma persistente.
  - `mobile-menu.spec.ts`: el menú hamburguesa se muestra/oculta según el viewport y funciona correctamente.
  - `contact-form.spec.ts`: envío exitoso y manejo de error del formulario (con la API mockeada).
  - `blog.spec.ts`: el link "Blog" del nav lleva al índice del locale actual, y el switch de idioma en el blog lleva al índice traducido (no al home).
  - `booking.spec.ts`: elegir un horario, completar el formulario y confirmar la reserva (con el backend mockeado) dispara el evento GA4 `booking_confirmed`; también cubre el caso de "horario ya ocupado".
- **Se disparan automáticamente en cada push a `develop`**, como un job `test` en `.github/workflows/deploy-staging.yml` — el job `deploy` a staging depende de que los tests pasen (`needs: test`). Si un test falla, no se deploya esa versión a staging.
- Para correrlos en local: `npm run test:e2e` (Playwright levanta el preview server solo, según `playwright.config.ts`).
