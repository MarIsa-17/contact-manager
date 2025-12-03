import { useState } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import Footer from "./components/footer";

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Karlo Pintado", phone: "555-1234", isFavorite: true },
    { id: 2, name: "Cynthia López", phone: "555-5678", isFavorite: false },
    { id: 3, name: "María Villalobos", phone: "555-9012", isFavorite: true },
  ]);

  const contactFavorite = contacts.filter((c) => c.isFavorite);

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
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      setContacts(updatedContacts);
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
    <div>
      <Header />
      <div className="info-contactos">
        <p>Total: {contacts.length} contactos</p>
        <p>Contactos favoritos: {contactFavorite.length}</p>
        <button className="agregar" onClick={handleAddContact}>Agregar Contacto</button>
      </div>
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onToggleFavorite={toggleFavorite}
      />
      <div className="contenedor-limpiar">
        <button className="limpiar" onClick={deleteAll}>LIMPIAR TODO</button>
      </div>      
      <Footer />
    </div>
  );
}

export default App;
