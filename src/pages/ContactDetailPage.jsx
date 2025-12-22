import { useParams, Link, useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

export default function ContactDetailPage() {
  const { id } = useParams();
  const { contacts } = useContacts();
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
        <Link
          to="/"
          className="p-2 text-sm border-2 border-emerald-400/30 rounded cursor-pointer bg-emerald-100/50 hover:bg-emerald-300"
        >
          ← Volver
        </Link>
      </div>
    );
  }
  return (
    <div className="pt-12 px-6">
      <Link
        to="/"
        className="p-2 text-sm border-2 border-emerald-400/30 rounded cursor-pointer bg-emerald-100/50 hover:bg-emerald-300"
      >
        ← Volver
      </Link>
      <div className="my-6">
        <h1 className="text-black/50 font-bold text-3xl ">Detalles del Contacto</h1>
      </div>
      <div className="text-white bg-white/10 p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-2xl mb-2 font-bold">{contact.fullname}</h2>
        <p className="text-lg">📞 {contact.phonenumber}</p>
        <p className="text-lg">✉️ {contact.email}</p>
        <p className="text-lg">📝 {contact.type}</p>
        <p className="text-lg">
          ⭐ Favorito: {contact.isFavorite ? "Sí" : "No"}
        </p>

      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate(`/contact/${previousContact.id}`)}
          disabled={!previousContact}
          className="p-2 border border-emerald-300 rounded cursor-pointer text-sm bg-emerald-100/20 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <button
          onClick={() => navigate(`/contact/${nextContact.id}`)}
          disabled={!nextContact}
          className="p-2 border border-emerald-300 rounded cursor-pointer text-sm bg-emerald-100/20 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
