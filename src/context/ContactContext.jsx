import { createContext, useContext, useState, useEffect } from "react";
import { fetchContacts, getErrorMessage } from "../services/contactService";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // - El error ahora es global

  const loadContacts = async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setError(null); // - Limpiamos error previo

    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      // Usamos tu utilidad de service para el mensaje
      const msg = getErrorMessage(err);
      if (!isSilent) setError(msg);
      console.error("Error en carga:", err);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
    // Tu lógica de auto-refresco se queda aquí para ser global
    const intervalId = setInterval(() => loadContacts(true), 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, setContacts, isLoading, error, loadContacts }}>
      {children}
    </ContactContext.Provider>
  );
}

export const useContacts = () => useContext(ContactContext);