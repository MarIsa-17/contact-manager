import ContactCard from "./ContactCard";

export default function ContactList({
  contacts,
  onDeleteContact,
  onToggleFavorite,
}) {
  if (!contacts || contacts.length === 0) {
    return <p>No hay contactos</p>;
  }

  return (
    <div>
      <h3 style={{textAlign:"center"}}>Mis Contactos</h3>
      {contacts.map((contact) => (
        <div className="contact-card" key={contact.id}>
          <ContactCard key={contact.id} {...contact} />
          <div className="botones-card">
            <button className="eliminar" type="button" onClick={() => onDeleteContact(contact.id)}>
              Eliminar
            </button>
            <button className="favorito" onClick={() => onToggleFavorite(contact.id)}>
              {contact.isFavorite ? "Quitar Favorito" : "Marcar Favorito"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
