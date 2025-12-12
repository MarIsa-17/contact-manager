import { Routes, Route } from "react-router-dom";
import { useState, useEffect} from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactDetailPage from "./pages/ContactDetailPage";

const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [contacts, setContacts] = useState([]); // estado para almacenar contactos

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

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
      <Footer />
    </>
  );
}

export default App;
