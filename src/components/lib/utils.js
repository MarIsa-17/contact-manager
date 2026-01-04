const FAVORITES_KEY = 'favorites_contacts'; // llave para localStorage

//funcion de validacion
export function validateField(name, value) {
  switch (name) {
    case "fullname":
      if (!value.trim()) return "El nombre es obligatorio.";
      if (value.length < 3) return "El nombre debe tener al menos 3 caracteres.";
      return "";
    case "phonenumber":
      if (!value.trim()) return "El número de teléfono es obligatorio.";
      // Limpia caracteres no numéricos y valida que tenga al menos 9 dígitos
      if (value && !/^\d{9,}$/.test(value.replace(/\D/g, ''))) {
        return "Teléfono debe tener al menos 9 dígitos";
      }
      return "";
    case "email":
      if (!value.trim()) return "El email es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido, formato debe tener @ y dominio.";
      return "";
    default:
      return "";
  }
}
//funciones de favoritos para localStorage

export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error leyendo favoritos:', error);
    return [];
  }
}

export function saveFavorites(favoriteIds) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.error('Error guardando favoritos:', error);
  }
}

export function toggleFavoritePersistence(contactId) {
  const favorites = getFavorites();
  const newFavorites = favorites.includes(contactId)
    ? favorites.filter(id => id !== contactId)
    : [...favorites, contactId];
  saveFavorites(newFavorites);
  return newFavorites; // Retorna la lista actualizada de IDs
}