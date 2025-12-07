import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactDetailPage from "./pages/ContactDetailPage"; 

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Karlo Pintado", phone: "555-1234", isFavorite: true },
    { id: 2, name: "Cynthia López", phone: "555-5678", isFavorite: false },
    { id: 3, name: "María Villalobos", phone: "555-9012", isFavorite: true },
  ]);
 


  return (
    <>
    <Header/>
    <div className="py-20 px-4 max-w-3xl mx-auto w-full">

      <Routes>
        <Route path="/" element={<HomePage contacts={contacts} setContacts={setContacts}/>} /> 
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact/:id" element={<ContactDetailPage contacts={contacts}/>} /> 

      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
