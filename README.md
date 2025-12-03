# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Contact Manager

Gestor de contactos hecho en React + Vite. Permite agregar, eliminar y marcar contactos como favoritos.

## Características

- Listado de contactos con nombre y teléfono
- Agregar nuevos contactos
- Eliminar contactos individuales o todos
- Marcar/desmarcar contactos como favoritos
- Estilos personalizados y soporte para TailwindCSS y Flowbite

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/MarIsa-17/contact-manager.git
   cd contact-manager
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia el proyecto en modo desarrollo:
   ```
   npm run dev
   ```

## Estructura del proyecto

- `src/components`: Componentes React (ContactList, ContactCard, etc.)
- `src/index.css`: Estilos globales y directivas de Tailwind
- `App.jsx`: Componente principal
- `public/`: Archivos estáticos

## Personalización

- Modifica los componentes en `src/components` para agregar más campos o funcionalidades.
- Cambia los estilos usando clases de TailwindCSS en los archivos `.jsx`.

## Licencia

Este proyecto está bajo la licencia ISC.

---