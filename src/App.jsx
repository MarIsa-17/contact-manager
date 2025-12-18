import { Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";// proveedor principal
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactDetailPage from "./pages/ContactDetailPage";
import TestPage from "./pages/test-page";

function App() {
  return (
    <ContactProvider> {/* proveedor principal */}
      <Header />
      <div className="py-5 px-4 max-w-4xl mx-auto min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/formulario" element={<TestPage />} />
          <Route
            path="/contact/:id"
            element={<ContactDetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </ContactProvider>
  );
}

export default App;
