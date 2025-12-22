import { createContext, useState, useEffect, useContext } from "react";
import { fetchContacts, getErrorMessage } from "../services/contactService";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContacts = async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setError(null);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      const msg = getErrorMessage(err);
      if (!isSilent) setError(msg);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
    const intervalId = setInterval(() => loadContacts(true), 100000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, isLoading, error, loadContacts }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts debe usarse dentro de un ContactProvider");
  }
  return context;
};
