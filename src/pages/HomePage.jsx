
import ContactList from "../components/ContactList";


export default function HomePage({ contacts, setContacts }) {
  const contactCount = contacts.length;
  const contactFavoriteCount = contacts.filter((c) => c.isFavorite).length;

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
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      setContacts(contacts.filter((contact) => contact.id !== contactId));
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          className="p-1 text-xs border-2 border-slate-200/30 rounded cursor-pointer hover:shadow-md hover:bg-blue-400/80 text-white"
          onClick={handleAddContact}
        >
          Agregar Contacto
        </button>
      </div>
      <h2 className="text-3xl text-white uppercase font-bold text-center">
        📞 Mis Contactos{" "}
      </h2>
      <div className="mt-3 font-normal flex row-auto gap-5 justify-center">
        <p className="bg-blue-400/50 text-white p-2 rounded-lg">
          Total: {contactCount} contactos
        </p>
        <p className="bg-amber-400/50 p-2 text-white rounded-lg">
          Favoritos: {contactFavoriteCount}
        </p>
      </div>
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onToggleFavorite={toggleFavorite}
      />
      <div className="mt-7 flex justify-end">
        <button
          onClick={deleteAll}
          className=" text-white text-sm font-semibold p-2  border border-emerald-300 rounded-lg hover:bg-emerald-300/80"
        >
          LIMPIAR TODO
        </button>
      </div>
    </div>
  );
}
