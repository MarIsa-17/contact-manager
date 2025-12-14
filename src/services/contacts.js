const API_URL = import.meta.env.VITE_API_URL;

export async function fetchContacts() {
  try {
          const response = await fetch(`${API_URL}`);
          return await response.json();
        
        } catch (error) {
            console.error("Error fetching contacts:", error);
            return error;
        }
      }

