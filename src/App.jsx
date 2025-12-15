import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactDetailPage from "./pages/ContactDetailPage";
import { fetchContacts } from "./services/contacts";

function App() {
  const [loading, setLoading] = useState(false); // estado de carga
  const [contacts, setContacts] = useState([]); // estado para almacenar contactos

  useEffect(() => {
    setLoading(true);
    async function loadContacts() {
      const data = await fetchContacts();
      setContacts(data);
      setLoading(false);
    }
    loadContacts();
  }, []);

  if (loading) {
    // solución al mensaje de carga hasta que haga el fetch
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-white text-xl">Cargando contactos...</span>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="py-5 px-4 max-w-4xl mx-auto min-h-screen">
        <Routes>
          <Route
            path="/"
            element={<HomePage contacts={contacts} setContacts={setContacts} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/contact/:id"
            catch-all="*"
            element={<ContactDetailPage contacts={contacts} />}
          />
        </Routes>
      </div>
      <div></div>
      <Footer />
    </>
  );
}

export default App;
