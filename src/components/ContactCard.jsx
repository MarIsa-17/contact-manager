import { Link } from "react-router-dom";

export default function ContactCard({
  id,
  fullname,
  phonenumber,
  isFavorite,
  email,
}) {
  return (
    <Link to={`/contact/${id}`} className="block h-full">
      <div className="h-full">
        <h3 className="font-bold text-lg mb-2 text-blue-900/90">{fullname}</h3>
        <div className="text-sm text-gray-900">
          <p>📱 Teléfono: {phonenumber}</p>
          <p>⭐ Favorito: {isFavorite ? "Sí" : "No"}</p>
          <p>✉️ email:{email} </p>
        </div>
      </div>
    </Link>
  );
}
