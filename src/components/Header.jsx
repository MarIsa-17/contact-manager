
function Header() {
    const contactImportantes = {
      background: "#fff1",
      width: "100vw"
    }
    const parrafo ={

        fontSize:"20px",
    }    
    
  return (
    <header style={contactImportantes}>
      <h1>📞 Contact Manager</h1>
      <p style={parrafo}>Mis contactos importantes</p>
    </header>
  )
}
export default Header;