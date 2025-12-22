import { useState } from "react";
import ContactList from "../components/ContactList";
import ContactEditForm from "../components/ContactEditForm";
import { useContacts } from "../context/ContactContext";

export default function HomePage() {
  const [editingContact, setEditingContact] = useState(null);
  const { loadContacts } = useContacts();

  const handleContactUpdated = () => {
    setEditingContact(null);
    loadContacts(); 
  };

  return (
    <div className="pt-12 px-6">
      {/* Pasamos la función para abrir el modal */}
      <ContactList onEditContact={(contact) => setEditingContact(contact)} />

      {/* Si hay un contacto seleccionado, mostramos el modal */}
      {editingContact && (
        <ContactEditForm
          contact={editingContact}
          onContactUpdated={handleContactUpdated}
          onCancel={() => setEditingContact(null)}
        />
      )}
    </div>
  );
}