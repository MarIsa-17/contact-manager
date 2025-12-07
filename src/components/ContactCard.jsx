import { Link } from "react-router-dom";  

export default function ContactCard({id,name, phone,isFavorite}) {
  return (
   <Link to={`/contact/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
     <div >
      <h3>Contacto: {name}</h3>
      <p>📱 Teléfono: {phone}</p>
      <p>⭐ Favorito: {isFavorite? "Sí":"No"}</p>
    </div>
    </Link>
  );
}