import Header from './components/Header'
import ContactList from './components/ContactList'
import Footer from './components/footer'

function App() {
  const cuerpo = {
   textAlign: "center",          // Centra texto
    display: "flex",
    flexDirection: "column",
    alignItems: "center",         // Centra elementos hijos
    justifyContent: "center",
    marginTop: "40px",
    color: "#fff"
  }
  const styleMain ={
    marginTop: "20px",
    background:"#ffffff11",
    width: "90vw",
    borderRadius:"15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  }
  return (
    <div style={cuerpo}>
      {/* Aquí renderiza los componentes */}
      <Header/>
      <main style={styleMain}>
      <ContactList/>
      <Footer/>
      </main>
    </div>
  )
}

export default App;