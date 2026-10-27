# BioConnect · Frontend en Angular 21

Proyecto formativo ADSO 228118 · Ficha 3186675 · Nayive Jimena Serna Cañas

## Requisitos
- Node.js 20 o superior (https://nodejs.org)
- El backend `bioconnect-api` funcionando en XAMPP (ver su README)

## Cómo ejecutarlo
1. Abra una terminal en esta carpeta.
2. Instale las dependencias: `npm install`
3. Inicie la aplicación: `npx ng serve`
4. Abra http://localhost:4200 e inicie sesión con ana.ruiz@ejemplo.com · Clave1234

La dirección del backend se cambia en `src/environments/environment.ts`.

## Estructura
- `src/app/models`: interfaces de los datos.
- `src/app/services`: servicios que conectan con la API (HttpClient).
- `src/app/guards`: protección de rutas (authGuard).
- `src/app/pages`: componentes de cada pantalla (login, registro, layout, dashboard, red social, empleo, biodiversidad, usuarios).
