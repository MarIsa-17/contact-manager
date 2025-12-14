# Contact Manager

Gestor de contactos hecho con **React**, **Vite** y **TailwindCSS**.

## Características

- Listado de contactos con nombre y teléfono.
- Agregar, eliminar y marcar contactos como favoritos.
- Eliminar todos los contactos con un solo clic.
- Navegación entre páginas con React Router.
- Detalle de contacto con navegación "anterior/siguiente".
- Estilos modernos y responsivos usando TailwindCSS.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MarIsa-17/contact-manager.git
   cd contact-manager
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

- `src/components/`: Componentes reutilizables (ContactList, ContactCard, Header, Footer, etc.)
- `src/pages/`: Páginas principales (HomePage, AboutPage, ContactDetailPage)
- `src/index.css`: Estilos globales y directivas de TailwindCSS
- `App.jsx`: Componente principal y rutas
- `public/`: Archivos estáticos

## Personalización

- Modifica los componentes en `src/components/` para agregar más campos o funcionalidades.
- Cambia los estilos usando clases de TailwindCSS en los archivos `.jsx`.
- Puedes ajustar la cuadrícula de las tarjetas de contacto modificando las clases Tailwind en `ContactList.jsx`.

## Tecnologías usadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)