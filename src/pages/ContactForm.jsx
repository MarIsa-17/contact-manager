import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../services/contactService";
import { useContacts } from "../context/ContactContext"; 
import { validateField } from "../components/lib/utils";

export default function ContactForm() {
  const navigate = useNavigate();
  const { loadContacts } = useContacts(); // Para refrescar la lista global

  // Estado inicial de los inputs
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    type: "Personal", // Valor por defecto
  });

  const [touched, setTouched] = useState({
    fullname: false,
    phonenumber: false,
    email: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // errores en tiempo real
  const errors = {
    fullname: validateField("fullname", formData.fullname),
    phonenumber: validateField("phonenumber", formData.phonenumber),
    email: validateField("email", formData.email),
  };

  const isFormValid = !errors.fullname && !errors.email && !errors.phonenumber && formData.fullname !== "";

  //función para manejar cambios en los inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //función para manejar toques en los inputs
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  } // marcar el campo como tocado

  async function handleSubmit(event) {
    event.preventDefault(); // evitar el comportmiento por defecto de la página - no recarga

    if (!isFormValid) return; 

    setIsSubmitting(true);
    setServerError(null);

    try {
      await createContact(formData); // Enviamos el objeto del estado
      await loadContacts(); // lista global se refresca
      navigate("/"); // enviamos a lista de contactos
      /*setFormData({
        // Limpiamos el formulario
        fullname: "",
        phonenumber: "",
        email: "",
        type: "Personal",
      });*/
    } catch (err) {
      setServerError("Error al guardar el contacto. Por favor, inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  }

const getBorderClass = (fieldName) => {  
    if (!touched[fieldName]) return "border-transparent bg-white/70";
    
    return errors[fieldName] 
      ? "border-red-500 bg-red-50" 
      : "border-emerald-500 bg-emerald-50";
  };

  return (
    <main className="pt-20 px-6 max-w-2xl mx-auto">
      <section className="bg-white/10 p-10 rounded-2xl shadow-xl backdrop-blur-md">
        <h2 className="text-2xl text-white text-center uppercase font-bold mb-8">
          Nuevo Contacto
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <input
            id="fullname"
              name="fullname"
              value={formData.fullname} // El valor viene del estado
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Nombre completo..."
              className={`w-full h-12 pl-4 rounded-xl outline-none transition-all border-2 ${getBorderClass("fullname")}`}
            />
            {touched.fullname && errors.fullname &&(
             <span className="text-red-300 text-xs mt-1 ml-1 font-semibold italic">
                {errors.fullname}
              </span>
            )}
          </div>
          <div>
            <input
            id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Teléfono..."
              className={`w-full h-12 pl-4 rounded-xl outline-none transition-all border-2 ${getBorderClass("phonenumber")}`}
            />
            {touched.phonenumber && errors.phonenumber &&(
              <span className="text-red-300 text-xs mt-1 ml-1 font-semibold italic">
                {errors.phonenumber}
              </span>
            )}
          </div>
          <div>
            <input
            id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder="Correo electrónico..."
              className={`w-full h-12 pl-4 rounded-xl outline-none transition-all border-2 ${getBorderClass("email")}`}
            />
            {touched.email && errors.email &&(
              <span className="text-red-300 text-xs mt-1 ml-1 font-semibold italic">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <select
            id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              onBlur={handleBlur}
              className= "w-full h-12 pl-4 bg-white/70 rounded-xl outline-none border-2 border-transparent focus:border-emerald-400"
            >
              <option value="Personal">Personal</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Familia">Familia</option>
            </select>
            {serverError && <p className="text-red-200 bg-red-500/20 p-3 rounded-lg text-center text-sm">{serverError}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting||!isFormValid}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Guardar Contacto"}
          </button>
        </form>
      </section>
    </main>
  );
}
