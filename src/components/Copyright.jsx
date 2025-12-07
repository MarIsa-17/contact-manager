export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-center text-sm text-gray-500 mt-3">
      © {year} Maria Isabel Nuñez López. Todos los derechos reservados.
    </p>
  );
}

