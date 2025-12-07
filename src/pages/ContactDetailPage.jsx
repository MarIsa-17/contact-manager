import { useParams, Link, useNavigate } from "react-router-dom";

export default function ContactDetailPage({ contacts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = Number(id);

  const sortedContacts = [...contacts].sort((a, b) => a.id - b.id);
  const currentIndex = sortedContacts.findIndex((c) => c.id === currentId);
  const contact = sortedContacts[currentIndex]; // Usamos el contacto del array ordenado

  const previousContact = sortedContacts[currentIndex - 1];
  const nextContact = sortedContacts[currentIndex + 1];

  if (!contact) {
    return (
      <div className="pt-12 px-6">
        <h2 className="mb-5">Contacto no encontrado</h2>
        <Link to="/" className="p-2 text-sm border-2 border-indigo-400/30 rounded cursor-pointer bg-indigo-100 hover:bg-indigo-300">← Volver</Link>
      </div>
    );
  }
  return (
    <div className="pt-12 px-6">
      <Link to="/" className="p-2 text-sm border-2 border-indigo-400/30 rounded cursor-pointer bg-indigo-100 hover:bg-indigo-300">
        ← Volver
      </Link>
      <h1 className="text-3xl font-bold mt-4">{contact.name}</h1>
      <p className="text-lg">📞 {contact.phone}</p>
      <p className="text-lg">⭐ Favorito: {contact.isFavorite ? "Sí" : "No"}</p>
     
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate(`/contact/${previousContact.id}`)}
          disabled={!previousContact}
          className="p-2 border border-indigo-300 rounded cursor-pointer text-sm bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <button
          onClick={() => navigate(`/contact/${nextContact.id}`)}
          disabled={!nextContact}
          className="p-2 border border-indigo-300 rounded cursor-pointer text-sm bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
