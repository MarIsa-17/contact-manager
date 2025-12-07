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
    <div>
      {contacts.map((contact) => (
        <div key={contact.id} className="flex justify-between items-center border border-blue-300 bg-white/50 m-4 p-5 rounded-lg">
          <ContactCard key={contact.id} id={contact.id} {...contact} /> 
          <div className="flex flex-col gap-2">
            <button 
              className="p-1 border rounded cursor-pointer text-xs bg-fuchsia-100/50 hover:bg-fuchsia-200" 
              type="button" 
              onClick={(e) => handleActionClick(e, onDeleteContact, contact.id)} // Evita navegación
            >
              Eliminar
            </button>
            <button 
              className="p-1 border rounded cursor-pointer text-xs bg-amber-100/20 hover:bg-amber-200" 
              onClick={(e) => handleActionClick(e, onToggleFavorite, contact.id)} 
            >
              {contact.isFavorite ? "Quitar Favorito" : "Marcar Favorito"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
