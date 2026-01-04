import { useState } from "react";
import { updateContact } from "../services/contactService";
import { validateField } from "./lib/utils";

export default function ContactEditForm({
  contact,
  onContactUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    fullname: contact?.fullname || "",
    phonenumber: contact?.phonenumber || "",
    email: contact?.email || "",
    type: contact?.type || "Personal",
  });

  const [touched, setTouched] = useState({
    fullname: false,
    phonenumber: false,
    email: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Validación derivada
  const errors = {
    fullname: validateField("fullname", formData.fullname),
    phonenumber: validateField("phonenumber", formData.phonenumber),
    email: validateField("email", formData.email),
  };

  const isFormValid = !errors.fullname && !errors.phonenumber && !errors.email;
  //función para inputs con cambios
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  // función para inputs desenfocados
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }
  // función para enviar formulario
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSaving(true);
    setServerError(null);

    const dataToSend = {
      fullname: formData.fullname.trim(),
      phonenumber: formData.phonenumber.trim(),
      email: formData.email.trim(),
      type: formData.type,
    };
    console.log("URL DE PRUEBA:", `${import.meta.env.VITE_API_URL}/${contact.id}`);

    try {
      console.log("petición a la API con ID:",contact.id);
      await updateContact(contact.id, dataToSend);
      onContactUpdated();
      alert("Contacto actualizado!");

    } catch (err) {
      console.log("Error datallado:", err);
      setServerError(err.message);
      setIsSaving(false);
    }
  }

  //estilos para los inputs con error
  const getFieldStyles = (name) => {
    const base =
      "w-full bg-white/10 border p-3 rounded-xl text-white outline-none transition-all";
    if (!touched[name])
      return `${base} border-white/10 focus:ring-2 focus:ring-blue-500`;
    return errors[name]
      ? `${base} border-red-500 bg-red-500/10`
      : `${base} border-emerald-500 bg-emerald-500/10`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ Editar Contacto
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-white/50 uppercase font-bold ml-1">
              Nombre
            </label>
            <input
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getFieldStyles("fullname")}
            />
            {touched.fullname && errors.fullname && (
              <p className="text-red-400 text-[10px] mt-1 ml-1">
                {errors.fullname}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase font-bold ml-1">
              Teléfono
            </label>
            <input
              name="phonenumber"
              type="tel"
              value={formData.phonenumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getFieldStyles("phonenumber")}
            />
            {touched.phonenumber && errors.phonenumber && (
              <p className="text-red-400 text-[10px] mt-1 ml-1">
                {errors.phonenumber}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs text-white/50 uppercase font-bold ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getFieldStyles("email")}
            />
            {touched.email && errors.email && (
              <p className="text-red-400 text-[10px] mt-1 ml-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-slate-800" value="Personal">
                Personal
              </option>
              <option className="bg-slate-800" value="Trabajo">
                Trabajo
              </option>
              <option className="bg-slate-800" value="Familia">
                Familia
              </option>
            </select>
          </div>
          {serverError && (
            <p className="text-red-400 text-center text-sm">{serverError}</p>
          )}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl text-white/70 hover:bg-white/10 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving || !isFormValid}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-50 shadow-lg shadow-blue-900/20"
            >
              {isSaving ? "⏳ Guardando..." : "💾 Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
