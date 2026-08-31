# Luciano Consulting — Sitio web

Sitio de consultoría IT, bilingüe (ES/EN), construido con [Astro](https://docs.astro.build) + Tailwind, desplegado en Firebase Hosting.

## Estructura

```text
/
├── src/
│   ├── pages/           # index.astro (es), en/index.astro, privacy.astro, en/privacy.astro, 404.astro
│   ├── components/      # Header, Hero, Services, About, Experience, Contact, Footer, CookieConsent
│   ├── layouts/Layout.astro
│   └── i18n/content.ts  # todo el copy del sitio, por locale (es/en)
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

Ninguna de estas variables se commitea con su valor real — los workflows las inyectan en build time desde GitHub Actions.

## Cookies y Google Analytics

- El sitio usa el snippet estándar de `gtag.js` (GA4), inyectado en `src/layouts/Layout.astro` solo cuando `PUBLIC_GA_ID` está definido. En staging esa variable no se setea, así que ahí el sitio corre **sin ningún script de analytics ni banner de cookies**.
- **Decisión de producto:** el tracking arranca desde la carga de la página, sin esperar ninguna acción del visitante. No se implementó un gate de consentimiento (Consent Mode) porque el sitio no espera tráfico relevante desde la UE, y gatear el tracking hubiera significado perder datos de visitas sin beneficio real.
- El banner que aparece (`src/components/CookieConsent.astro`) es **puramente informativo**: avisa que se usa Google Analytics y linkea a `/privacy/`. El botón "Entendido" no afecta el tracking en absoluto — solo guarda `cookie-notice-dismissed` en `localStorage` para no volver a mostrar el aviso en ese navegador.
- El copy de la política de privacidad (`content.ts` → `privacy`) explica esto mismo a los visitantes, y menciona cómo bloquear las cookies de Analytics desde el navegador si alguien no quiere ser trackeado.
- Verificación de Google Search Console: el meta tag se agrega en el `<head>` vía `PUBLIC_GSC_VERIFICATION`, independiente de si GA está activo o no (para que la verificación del sitio no dependa del estado de Analytics).

## Testing automatizado (Playwright)

- Los tests viven en `e2e/*.spec.ts` y corren contra un build real del sitio (`npm run build` + `npx serve dist`, ver `playwright.config.ts`), no contra el dev server. Se usa `serve` en vez de `astro preview` porque en este proyecto `astro preview` se demoniza en background y el proceso termina enseguida, lo que rompe el arranque del `webServer` de Playwright.
- Corren en dos "proyectos": **Desktop Chromium** y **Mobile Chromium** (emulando un Pixel 5), para cubrir tanto el nav de desktop como el menú hamburguesa mobile.
- El build usado para testear define valores de prueba *ficticios* para `PUBLIC_GA_ID`, `PUBLIC_GSC_VERIFICATION` y `PUBLIC_WEB3FORMS_ACCESS_KEY` (ver `playwright.config.ts`) — no son credenciales reales, solo lo necesario para que el banner de cookies y el snippet de GA se rendericen y puedan testearse. El envío del formulario de contacto se intercepta (`page.route`) para no pegarle a la API real de Web3Forms durante los tests.
- Qué cubren:
  - `site.spec.ts`: carga de home (es/en), switch de idioma, navegación a las páginas de privacidad desde el footer, página 404.
  - `cookie-consent.spec.ts`: el banner aparece en la primera visita, GA trackea igual desde el arranque, y "Entendido" oculta el banner de forma persistente.
  - `mobile-menu.spec.ts`: el menú hamburguesa se muestra/oculta según el viewport y funciona correctamente.
  - `contact-form.spec.ts`: envío exitoso y manejo de error del formulario (con la API mockeada).
- **Se disparan automáticamente en cada push a `develop`**, como un job `test` en `.github/workflows/deploy-staging.yml` — el job `deploy` a staging depende de que los tests pasen (`needs: test`). Si un test falla, no se deploya esa versión a staging.
- Para correrlos en local: `npm run test:e2e` (Playwright levanta el preview server solo, según `playwright.config.ts`).
