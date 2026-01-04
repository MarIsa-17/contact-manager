import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import ContactCard from "./ContactCard";
import { deleteContact } from "../services/contactService"; // función para eliminar contacto en la Api
import { toggleFavoritePersistence } from "./lib/utils"; //funcion para manejar favoritos en localStorage

export default function ContactList({ onEditContact }) {
  const { contacts, setContacts, isLoading, error, setError, loadContacts } =
    useContacts(); //contexto de contactos

  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("lastSearch") || "";
  }); // estado para buscar contactos

  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("lastSortOrder") || "asc";
  }); //estado para ordenar

  // Estados de eliminación
  const [deletingContact, setDeletingContact] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    localStorage.setItem("lastSearch", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("lastSortOrder", sortOrder);
  }, [sortOrder]);

  // filtrar contactos por nombre y ordenar
  const filteredAndSortedContacts = contacts
    .filter((contact) =>// filtrar contactos por nombre
      contact.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => { //ordenar contactos
      const result = a.fullname.localeCompare(b.fullname);
      return sortOrder === "asc" ? result : -result;
    });

  //contadores
  const totalContacts = contacts.length;
  const showingCount = filteredAndSortedContacts.length;

  function handleDeleteClick(contact) {
    setDeletingContact(contact);
  }

  // Ejecutar eliminación en API y Estado Local
  async function confirmDelete() {
    if (!deletingContact) return;
    setIsDeleting(true);
    try {
      //  Llamada a la API
      await deleteContact(deletingContact.id);

      // 2. Actualizar
      setContacts((prev) => prev.filter((c) => c.id !== deletingContact.id));

      // 3. Limpiar
      setDeletingContact(null);
      alert("Contacto eliminado exitosamente.");
    } catch (err) {
      setError("No se pudo eliminar el contacto: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  //cancelar eliminacion
  function cancelDelete() {
    setDeletingContact(null);
  }

  //funcion para ordenar contactos
  function toggleSortOrder() {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  //funcion para asignar o quitar favorito y persistir en localStorage
  function toggleFavorite(id) {
    toggleFavoritePersistence(id);
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  }

  /* asignar o quitar favorito sin persistencia en localStorage
  function toggleFavorite(id) {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  }
    */
  //botones de accion usado en favorito y editar
  const handleActionClick = (e, actionFn, id) => {
    e.stopPropagation();
    e.preventDefault();
    actionFn(id);
  };

  const contactFavoriteCount = contacts.filter((c) => c.isFavorite).length;

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER Y CONTROLES */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-3xl text-white uppercase font-bold">
          📞 Agenda de Contactos
        </h3>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 text-xs border-2 border-white/20 rounded-lg text-white hover:bg-blue-500/50 transition-colors"
            onClick={() => loadContacts()}
            disabled={isLoading}
          >
            {isLoading ? "⏳ Cargando..." : "🔄 Actualizar"}
          </button>
          {/*ordenar nombre ascendente y descendente */}
          <button
            className="px-3 py-1 text-xs border-2 border-white/20 rounded-lg text-white hover:bg-green-500/50 transition-colors flex items-center gap-2"
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? "🅰️ Ordenar A-Z" : "💤 Ordenar Z-A"}
          </button>
        </div>
      </div>

      {/* BUSCADOR */}
      {!error && (
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar contacto..."
            className="w-full p-3 pl-10 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3.5 opacity-40">🔍</span>
        </div>
      )}
{!isLoading && (
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Mostrando <span className="text-white font-bold">{showingCount}</span> de{" "}
            <span className="text-white font-bold">{totalContacts}</span> contactos
          </p>
        </div>
      )}

      {/* LISTA O ESTADO VACÍO (RETO C) */}
      {showingCount === 0 && !isLoading ? (
        <div className="bg-white/5 border border-dashed border-white/20 p-10 rounded-2xl text-center">
          <p className="text-white/50 italic text-lg">
            {searchTerm 
              ? `No se encontraron resultados para "${searchTerm}"` 
              : "Tu agenda está vacía. ¡Agrega un contacto!"}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-400 text-sm underline"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-4">
            <span className="bg-amber-500/30 text-amber-100 px-3 py-1 rounded-full text-xs">
              ⭐ Favoritos: {contactFavoriteCount}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedContacts.map((contact) => (
              <div
                key={contact.id}
                className="group relative flex flex-col bg-white/20 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/15 transition-all"
              >
                <div className="grow mb-4">
                  <ContactCard {...contact} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) =>
                      handleActionClick(e, toggleFavorite, contact.id)
                    }
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${
                      contact.isFavorite
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-white/5 text-white/70 border-white/10"
                    }`}
                  >
                    {contact.isFavorite ? "⭐ Quitar" : "☆ Favorito"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditContact(contact);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteClick(contact)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL DE CONFIRMACIÓN (Fuera del grid) */}
      {deletingContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/85 rounded-2xl p-8 max-w-sm w-full shadow-2xl scale-100 animate-in fade-in zoom-in duration-200">
            <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800 text-center">
              ¿Eliminar contacto?
            </h4>
            <p className="text-gray-600 text-center mb-6">
              Estás a punto de eliminar a{" "}
              <span className="font-bold text-gray-900">
                {deletingContact.fullname}
              </span>
              . Esta acción es permanente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2 rounded-xl bg-slate-400 hover:bg-slate-600 text-white font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? "⏳..." : "🗑️ Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
