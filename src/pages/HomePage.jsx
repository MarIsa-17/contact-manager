
import ContactList from "../components/ContactList";

export default function HomePage({contacts, setContacts}) {

  const contactCount = contacts.length;
  const contactFavoriteCount = contacts.filter((c) => c.isFavorite).length;

  function handleAddContact() {
    const newContact = {
      id: Date.now(), // ID único temporal
      name: `Contacto ${contacts.length + 1}`,
      phone: "000-0000",
      isFavorite: false,
    };
    setContacts([...contacts, newContact]);
  }

  function handleDeleteContact(contactId) {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      setContacts(contacts.filter((contact)=>contact.id !== contactId));
    }
  }

  function toggleFavorite(contactId) {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
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

  return (
    <div className="pt-12 px-6 flex flex-col gap-6 ">
      <h2 className="text-2xl uppercase font-semibold text-center">Mis Contactos 📞 </h2>
      <div className="flex justify-end">
        <button
          className="p-1 text-sm border-2 border-indigo-400/30 rounded cursor-pointer bg-indigo-100 hover:bg-indigo-300"
          onClick={handleAddContact}
        >
          Agregar Contacto
        </button>
      </div>
      <ContactList 
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onToggleFavorite={toggleFavorite}

      />
      <div className="mt-10 font-medium flex row-auto gap-5 justify-center">
        <p className="bg-indigo-200 p-3 rounded-lg">Total: {contactCount} contactos</p>
        <p className="bg-indigo-200 p-3 rounded-lg">Contactos favoritos: {contactFavoriteCount}</p>
      </div>
      <div className="mt-7 flex justify-end">
        <button onClick={deleteAll} className="bg-blue-900/50 text-white text-sm font-semibold p-2 border border-blue-950 rounded-lg hover:bg-blue-900/80">LIMPIAR TODO</button>
      </div>
    </div>
  );
}
