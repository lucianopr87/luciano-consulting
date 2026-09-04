# Backend de reservas (Google Apps Script)

Backend gratuito para `/booking/`: un script de Apps Script vinculado a la cuenta de Google de Luciano (`lucianopr87@gmail.com`), que corre autenticado como esa cuenta — sin OAuth, sin service account, sin ningún plan pago de Firebase/GCP.

## Qué hace

- `doGet` → calcula los horarios disponibles (plantilla semanal menos ocupados del calendario real) para las próximas 2 semanas.
- `doPost` → recibe una reserva, revalida el horario server-side, crea el evento en el calendario con un link de Google Meet, y manda la invitación nativa de Calendar al visitante.

Toda la lógica de negocio (días/horarios ofrecidos, duración, horizonte) vive en `availability.js` como única fuente de verdad — el frontend (`src/components/Booking.astro`) solo muestra lo que devuelve `doGet`.

## Setup inicial (una sola vez)

1. Ir a [script.google.com](https://script.google.com) logueado como `lucianopr87@gmail.com` y crear un proyecto nuevo.
2. En el editor, `Servicios` (ícono +) → agregar **Calendar API** (el servicio avanzado, no el genérico `CalendarApp`) — esto habilita `Calendar.Events` y `Calendar.Freebusy` tal como los usa `calendar.js`, y actualiza el manifiesto del proyecto (`appsscript.json`) automáticamente. No hace falta tocar ese archivo a mano — `appsscript.json` en esta carpeta está solo como referencia/backup, por si se usa `clasp` (ver más abajo) o hay que revisar qué debería tener.
3. Pegar el contenido de `Code.js`, `availability.js`, `calendar.js` y `validation.js` como archivos separados dentro del proyecto (mismo nombre de archivo).
4. `Implementar > Nueva implementación > Tipo: Aplicación web`:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Copiar la URL `/exec` que devuelve — esa es la que va en la variable `PUBLIC_BOOKING_ENDPOINT` (ver README principal, tabla de variables de entorno).

### Alternativa con `clasp` (recomendado si se va a iterar seguido)

```bash
npm install -g @google/clasp
clasp login                 # abre el navegador, loguearse como lucianopr87@gmail.com
cd apps-script
clasp create --type webapp --title "Consulting IT - Booking"
clasp push                  # sube los archivos de esta carpeta
clasp deploy                # crea/actualiza el deployment del Web App
```

`clasp push` y `clasp deploy` son manuales — no están integrados al pipeline de GitHub Actions a propósito, para no meter credenciales de Google en CI por una pieza que cambia poco. Si en el futuro esto se vuelve una fricción real, se puede automatizar con un token de `clasp` guardado como secret de GitHub.

## Actualizar el backend

Después de editar cualquier archivo de esta carpeta:

```bash
cd apps-script
clasp push
clasp deploy
```

(o pegar los cambios a mano en el editor de script.google.com si no se usa `clasp`).

## Probar en staging sin ensuciar el calendario real

El build de staging manda `env: "staging"` en cada request de reserva (`PUBLIC_BOOKING_ENV`), y `calendar.js` prefija el título del evento con `[STAGING TEST]` cuando lo recibe. Al probar el flujo de reserva desde el sitio de staging: usar tu propio email como "visitante" y borrar el evento de prueba del calendario después — sigue siendo una reserva real con un invite real, no hay un calendario de staging separado (ver la sección de aislamiento staging/producción en el plan).

## Troubleshooting

- **CORS/`fetch` falla desde el browser**: confirmar que el `POST` desde `Booking.astro` mande `Content-Type: text/plain;charset=utf-8` (no `application/json` — dispara un preflight que Apps Script no maneja).
- **No se genera el link de Meet**: revisar que `Calendar.Events.insert` reciba `conferenceDataVersion: 1` como *opción* (tercer argumento), no solo dentro del body del evento.
- **`doPost` nunca recibe el body**: confirmar `e.postData.contents` — si el request no llega como texto plano, `postData` puede venir vacío.
