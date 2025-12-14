import ContactCard from "./ContactCard";


export default function ContactList({
  contacts,
  onDeleteContact,
  onToggleFavorite,
  // Se remueve onSelectContact ya que el routing maneja el detalle
}) {
  if (!contacts || contacts.length === 0) {
    return <p>No hay contactos</p>;
  }

  // FUNCIÓN CLAVE: Detiene la propagación del clic para que NO navegue el Link de ContactCard
  const handleActionClick = (e, actionFn, contactId) => {
    e.stopPropagation();
    actionFn(contactId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
      {contacts && contacts.length >0 && contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex flex-col h-full justify-evenly items-center border-2 border-emerald-300 bg-white/50 m-4 p-3 rounded-lg max-w-full mx-auto"
        >
          <div className="grow w-full mb-3">
          <ContactCard key={contact.id} id={contact.id} {...contact} />
          </div>
          <div className="flex flex-col gap-2 self-end">
            <button
              className="py-1 border rounded cursor-pointer text-xs bg-emerald-100/50 hover:bg-emerald-300/60"
              type="button"
              onClick={(e) => handleActionClick(e, onDeleteContact, contact.id)} // Evita navegación
            >
              Eliminar
            </button>
            <button
              className="p-1 border rounded cursor-pointer text-xs bg-amber-100/20 hover:bg-amber-200"
              onClick={(e) =>
                handleActionClick(e, onToggleFavorite, contact.id)
              }
            >
              {contact.isFavorite ? "Quitar Favorito" : "Marcar Favorito"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
