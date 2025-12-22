import { useState, useEffect } from "react";
import { updateContact } from "../services/contactService";

export default function ContactEditForm({
  contact,
  onContactUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    type: "",
    isFavorite: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contact) {
      setFormData({
        fullname: contact.fullname || "",
        phonenumber: contact.phonenumber || "",
        email: contact.email || "",
        type: contact.type || "",
        isFavorite: contact.isFavorite || false,
      });
    }
  }, [contact]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.fullname.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      setIsSaving(false);
      return;
    }
    if (!formData.phonenumber.trim()) {
      setError("El teléfono es obligatorio.");
      setIsSaving(false);
      return;
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      setError("Email inválido.");
      setIsSaving(false);
      return;
    }


    try {
 
      const updatedContact = await updateContact(contact.id, formData);
      onContactUpdated?.(updatedContact);
      alert("Contacto actualizado!");
    } catch (err) {
      console.log("Error datallado:", err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ Editar Contacto
        </h3>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
            ❌ {error}
          </div>
        )}

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
              required
              className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
              required
              className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
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

          <div>
            <label className="text-xs text-white/50 uppercase font-bold ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <input
              name="isFavorite"
              type="checkbox"
              checked={formData.isFavorite}
              onChange={handleChange}
              className="w-5 h-5 accent-amber-500"
            />
            <span>⭐ Marcar como favorito</span>
          </label>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl text-white/70 hover:bg-white/10 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
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
