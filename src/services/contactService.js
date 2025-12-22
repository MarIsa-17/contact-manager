const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL  no está funcionando en .env");
}

export async function fetchContacts() {
  console.log("🌐 Iniciando carga de contactos...");

  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error(
        `Error del servidor: ${response.status} ${response.statusText}`
      );
    }

    const contacts = await response.json();
    console.log(
      `✅ Contactos cargados: ${contacts.length} contactos cargados exitosamente.`
    );

    return contacts;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("❌ Error de red:", error.message);
      throw new Error(
        "No se pudo conectar al servidor. Verifica tu conexión a internet."
      );
    }
    console.error("❌ Error desconocido al cargar contactos.");
    throw error;
  }
}

export function getErrorMessage(error) {
  if (error.message.includes("Failed to fetch") || error.name === "TypeError") {
    return "No hay conexión a internet. Por favor, verifica tu red.";
  }

  if (error.message.includes("404")) {
    return "El recurso solicitado no existe.";
  }

  if (error.message.includes("500")) {
    return "Error en el servidor. Intenta más tarde.";
  }

  return error.message || "Ocurrió un error inesperado.";
}

export async function createContact(data) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear contacto: ${response.statusText}`);
    }

    return await response.json(); // Retornamos el contacto creado por el servidor
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error; // Re-lanzamos el error para que el componente lo maneje
  }
}

export async function updateContact(id, contactData) {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido para actualización");
  }
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(
        `Error al actualizar: ${response.status} ${response.statusText}`
      );
    }

    const updatedContact = await response.json();
    console.log("✅ Contacto actualizado:", updatedContact);

    return updatedContact;
  } catch (error) {
    console.error("❌ Error al actualizar contacto:", error.message);
    throw error;
  }
}
