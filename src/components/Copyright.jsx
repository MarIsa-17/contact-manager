export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-center text-xs text-white/30 mt-3">
      © {year}  Todos los derechos reservados.
    </p>
  );
}

