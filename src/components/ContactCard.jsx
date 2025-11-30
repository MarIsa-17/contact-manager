
export default function ContactCard(props) {
  return (
    <div className="contact-card">
      <h3>Contacto: {props.name} {props.lastName}</h3>
      <p>📱 Teléfono: {props.telefono}</p>
      <p>✉️ Email: {props.email}</p>
    </div>
  );
};