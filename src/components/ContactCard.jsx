
function ContactCard() {
   const cardStyle = {
    backgroundColor: "#ffffff22",     // gris claro
    padding: "20px",
    borderRadius: "12px",
    width: "280px",
    margin: "20px auto",            // centra horizontalmente
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",  
    fontFamily: "Arial, sans-serif",
    color: "#fff"
  };
    const titleStyle = {
    marginBottom: "10px",
    fontSize: "20px",
    color: "#ffee88"
  };


  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Mi Primer Contacto</h3>
      <p>📱 Teléfono: 555-1234</p>
      <p>✉️ Email: contacto@email.com</p>
    </div>
  );
}
export default ContactCard;