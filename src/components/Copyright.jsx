function Copyright({ name }) {
  const year = new Date().getFullYear();

  return (
    <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
      © {year} {name}. Todos los derechos reservados.
    </p>
  );
}

export default Copyright;
