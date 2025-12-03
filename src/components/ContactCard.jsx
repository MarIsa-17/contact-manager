
export default function ContactCard({name, phone,isFavorite}) {
  return (
    <div>
      <h3>Contacto: {name}</h3>
      <p>📱 Teléfono: {phone}</p>
      <p>⭐ Favorito: {isFavorite? "Sí":"No"}</p>
    </div>
  );
};