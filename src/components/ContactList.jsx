import { useState} from "react";
import { useContacts } from "../context/ContactContext";
import ContactCard from "./ContactCard";

export default function ContactList() {
const { contacts, setContacts, isLoading,error, loadContacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  


  function handleAddContact() {
    const newContact = {
      id: Date.now(), // ID único temporal
      fullname: `Contacto ${contacts.length + 1}`,
      phonenumber: "000-0000",
      isFavorite: false,
    };
    setContacts([...contacts, newContact]);
  }

  function handleDeleteContact(contactId) {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  }

  function toggleFavorite(id) {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  }
  function deleteAll() {
    if (window.confirm("¿Estás seguro de eliminar todos los contactos?")) {
      setContacts([]);
    }
  }
  // Evita que el clic en botones de la tarjeta active la navegación del Link
  const handleActionClick = (e, actionFn, id) => {
    e.stopPropagation();
    e.preventDefault();
    actionFn(id);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contactFavoriteCount = contacts.filter((c) => c.isFavorite).length;

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER Y CONTROLES */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-3xl text-white uppercase font-bold">
          📞 Agenda de Contactos
        </h3>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-xs border-2 border-white/20 rounded-lg text-white hover:bg-blue-500/50 transition-colors"
            onClick={()=>loadContacts()}
            disabled={isLoading}
          >
            {isLoading ? "⏳ Cargando..." : "🔄 Actualizar"}
          </button>
          <button
            className="px-3 py-1 text-xs border-2 border-white/20 rounded-lg text-white hover:bg-emerald-500/50 transition-colors"
            onClick={handleAddContact}
          >
            ➕ Agregar
          </button>
        </div>
      </div>

      {/* INPUT DE BÚSQUEDA */}
      {!error && (
        <div className="relative group">
          <input
            type="text"
            placeholder="Buscar contacto por nombre..."
            className="w-full p-3 pl-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3.5 opacity-40">🔍</span>
        </div>
      )}

      {/* ESTADOS DE LA UI */}

      {/* Cargando */}
      {isLoading && (
        <div className="text-center py-20 text-white">
          <div className="animate-spin text-4xl mb-4 inline-block">⏳</div>
          <p className="text-xl font-light">Sincronizando contactos...</p>
        </div>
      )}
      
      {/* ESTADO: CARGANDO */}
      {isLoading && contacts.length === 0 && (
        <div className="text-center py-20 text-white animate-pulse">
          <p className="text-2xl font-light">Sincronizando agenda...</p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="bg-red-500/20 border border-red-500/50 p-6 rounded-2xl text-center text-white">
          <p className="mb-4">❌ {error}</p>
          <button
            onClick={()=>loadContacts()}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            🔄 Reintentar conexión
          </button>
        </div>
      )}

      {/* LISTA DE CONTACTOS Y FILTRO */}
      {!isLoading && !error && contacts.length > 0 && (
        <>
          {/* Resumen de contadores */}
          <div className="flex justify-center gap-4">
            <span className="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs border border-blue-400/30">
              Total: {contacts.length}
            </span>
            <span className="bg-amber-500/30 text-amber-100 px-3 py-1 rounded-full text-xs border border-amber-400/30">
              ⭐ Favoritos: {contactFavoriteCount}
            </span>
          </div>

          {/* Grid de Contactos */}
          {filteredContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="group relative flex flex-col h-full bg-white/20 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/15 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="grow mb-4">
                    <ContactCard {...contact} />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) =>
                        handleActionClick(e, toggleFavorite, contact.id)
                      }
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        contact.isFavorite
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/40"
                          : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/20"
                      }`}
                    >
                      {contact.isFavorite ? "⭐ Quitar" : "☆ Favorito"}
                    </button>
                    <button
                      onClick={(e) =>
                        handleActionClick(e, handleDeleteContact, contact.id)
                      }
                      className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Error de búsqueda (No hay resultados) */
            <div className="text-center py-10 text-white/40 italic">
              No hay resultados para "{searchTerm}"
            </div>
          )}

          {/* Botón de Limpiar Todo */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={deleteAll}
              className="text-blue-300/60 p-2 border rounded-sm bg-emerald-200/20 hover:text-blue-800 hover:bg-emerald-500 text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Limpiar agenda
            </button>
          </div>
        </>
      )}
    </div>
  );
}
