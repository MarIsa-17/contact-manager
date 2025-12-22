import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../services/contactService";
import { useContacts } from "../context/ContactContext";

export default function ContactForm( {onContactCreated}) {
  const navigate = useNavigate();
  const { loadContacts } = useContacts(); // Para refrescar la lista global

  // Estado inicial sincronizado con los inputs
  const [inputs, setInputs] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    type: "Personal", // Valor por defecto
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,setError] = useState(false);

  // Función única para manejar todos los inputs
  function handleInput(event) {
    const { name, value } = event.target;
    setInputs({...inputs, [name]: value});
    if(error) setError("");
  }


  async function handleSubmit(event) {
    event.preventDefault();
    // -----------------------------------------------------------Reto Autonomo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (inputs.fullname.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    
    if (!inputs.phonenumber.trim()) {
      setError("El teléfono no puede estar vacío.");
      return;
    }
    
    if (inputs.email && !emailRegex.test(inputs.email)) {
      setError("El formato del email no es válido.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createContact(inputs); // Enviamos el objeto del estado
      
      // Actualizamos el contexto
      await loadContacts(); 

      if (onContactCreated) onContactCreated();
      
      alert("¡Contacto creado con éxito!");
      navigate("/"); // Redirigir a la lista de contactos
    } catch (_) {
      alert("Hubo un error al guardar el contacto.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="pt-20 px-6 max-w-2xl mx-auto">
      <section className="bg-white/10 p-10 rounded-2xl shadow-xl backdrop-blur-md">
        <h2 className="text-xl text-white text-center uppercase font-bold mb-8">
          Nuevo Contacto
        </h2>
        {/* Mostrar mensaje de error si existe */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm">
          ⚠️ {error}
        </div>
      )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="fullname"
            value={inputs.fullname} // El valor viene del estado
            onChange={handleInput}  // El cambio actualiza el estado
            type="text"
            placeholder="Nombre completo..."
            required
            className="h-12 pl-4 bg-white/70 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <input
            name="phonenumber"
            value={inputs.phonenumber}
            onChange={handleInput}
            type="text"
            placeholder="Teléfono..."
            required
            className="h-12 pl-4 bg-white/70 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <input
            name="email"
            value={inputs.email}
            onChange={handleInput}
            type="email"
            placeholder="Correo electrónico..."
            className="h-12 pl-4 bg-white/70 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <select
            name="type"
            value={inputs.type}
            onChange={handleInput}
            className="h-12 pl-4 bg-white/70 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Familia">Familia</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Guardar Contacto"}
          </button>
        </form>
      </section>
    </main>
  );
}