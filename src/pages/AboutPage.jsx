import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="pt-12 max-w-md mx-auto flex flex-col gap-4 px-6 text-white">
      <h2 className="text-2xl uppercase font-semibold text-center">
        ℹ️ Acerca de Contact Manager
      </h2>
      <p className="mt-4 font-normal">
        Contact Manager v1.0 - Módulo 1 Code 301, creada con React y Vite.
      </p>
      <p className="mt-4 text-light">
        Permite agregar, editar, eliminar y marcar contactos como favoritos.
      </p>
      <div>
        <Link
          to="/"
          className="p-2 text-sm border-2 border-emerald-400/30 rounded cursor-pointer bg-emerald-100/50 hover:bg-emerald-300"
        >
          ← Volver
        </Link>
      </div>
    </div>
  );
}
