import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="pt-12 max-w-md mx-auto flex flex-col gap-4 px-6">
      <h2 className="text-2xl uppercase font-semibold text-center">ℹ️ Acerca de Contact Manager</h2>
      <p className="mt-4 font-medium">
        Contact Manager v1.0 - Módulo 1 Code 301, creada con
        React y Vite.
      </p>
      <p className="mt-4">
        Permite agregar, eliminar y marcar contactos como favoritos.
      </p>
      <div>
        <Link to="/" className="p-2 text-sm border-2 border-indigo-400/30 rounded cursor-pointer bg-indigo-100 hover:bg-indigo-300">← Volver</Link>
      </div>
    </div>
  );
}